"use client";

import { FormEvent, useState } from "react";
import FormField, { Honeypot } from "@/components/forms/FormField";
import {
  formErrorClass,
  formInputClass,
  formLabelClass,
  formSelectClass,
} from "@/lib/form-styles";
import { checkUpload, uploadLimits, uploadPrivateFile } from "@/lib/public-upload";
import { createBrowserSupabaseClient } from "@/lib/supabase";

type JobOption = { id: number; title: string };

const EMPTY = {
  name: "",
  email: "",
  mobile: "",
  qualification: "",
  experience: "",
  message: "",
};
type Values = typeof EMPTY;

export default function JobApplicationForm({
  jobs,
  initialJobId,
}: {
  jobs: JobOption[];
  initialJobId?: number;
}) {
  const [jobId, setJobId] = useState(
    initialJobId && jobs.some((j) => j.id === initialJobId) ? String(initialJobId) : "",
  );
  const [values, setValues] = useState<Values>(EMPTY);
  const [resume, setResume] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function set(name: keyof Values, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const required: [string, string][] = [
      ["job", jobId],
      ["name", values.name],
      ["email", values.email],
      ["mobile", values.mobile],
      ["qualification", values.qualification],
    ];
    const firstEmpty = required.find(([, v]) => !v.trim());
    if (firstEmpty) {
      setError("Please fill in all required fields.");
      document.getElementById(firstEmpty[0])?.focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      setError("Please enter a valid email address.");
      document.getElementById("email")?.focus();
      return;
    }
    if (!/^\d{10}$/.test(values.mobile.replace(/[\s-]/g, ""))) {
      setError("Mobile number must be 10 digits.");
      document.getElementById("mobile")?.focus();
      return;
    }
    if (!resume) {
      setError("Please attach your resume (PDF).");
      document.getElementById("resume")?.focus();
      return;
    }

    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setError("Database is not configured. Please contact the administrator.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const resume_key = await uploadPrivateFile(resume, "resume", honeypot);
      const job = jobs.find((j) => String(j.id) === jobId);
      const { error: dbError } = await supabase.from("job_applications").insert({
        job_id: job?.id ?? null,
        job_title: job?.title ?? null,
        name: values.name.trim(),
        email: values.email.trim(),
        mobile: values.mobile.replace(/[\s-]/g, ""),
        qualification: values.qualification.trim(),
        experience: values.experience.trim() || null,
        message: values.message.trim() || null,
        resume_key,
      });
      if (dbError) throw new Error("Submission failed. Please try again later.");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-brand-blue px-6 py-10 text-center shadow-xl sm:px-10">
        <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
          Application received
        </h2>
        <p className="mt-3 text-[#dbe2ec]">
          Thank you for applying. Our team will review your application and
          contact shortlisted candidates.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto w-full max-w-2xl rounded-2xl bg-brand-blue px-6 py-8 shadow-xl sm:px-10 sm:py-10"
      noValidate
    >
      <h2 className="mb-8 text-center font-serif text-2xl font-bold text-white sm:text-3xl">
        Job Application
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="job" className={formLabelClass}>
            Applying For
          </label>
          <select
            id="job"
            name="job"
            value={jobId}
            onChange={(e) => {
              setJobId(e.target.value);
              setError(null);
            }}
            className={formSelectClass}
            disabled={submitting}
          >
            <option value="">Select position</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <FormField
            id="name"
            label="Full Name"
            value={values.name}
            onChange={(v) => set("name", v)}
            autoComplete="name"
            disabled={submitting}
          />
        </div>
        <FormField
          id="email"
          label="Email Address"
          value={values.email}
          onChange={(v) => set("email", v)}
          type="email"
          autoComplete="email"
          spellCheck={false}
          disabled={submitting}
        />
        <FormField
          id="mobile"
          label="Mobile Number"
          value={values.mobile}
          onChange={(v) => set("mobile", v)}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="10-digit mobile number"
          disabled={submitting}
        />
        <FormField
          id="qualification"
          label="Highest Qualification"
          value={values.qualification}
          onChange={(v) => set("qualification", v)}
          placeholder="e.g. M.Pharm (Pharmaceutics)"
          disabled={submitting}
        />
        <FormField
          id="experience"
          label="Experience (optional)"
          value={values.experience}
          onChange={(v) => set("experience", v)}
          placeholder="e.g. 3 years teaching"
          disabled={submitting}
        />
        <div className="sm:col-span-2">
          <FormField
            id="message"
            label="Message (optional)"
            value={values.message}
            onChange={(v) => set("message", v)}
            multiline
            disabled={submitting}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="resume" className={formLabelClass}>
            Resume (PDF, max {uploadLimits.resume.maxMb} MB)
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept={uploadLimits.resume.accept}
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              const problem = file ? checkUpload(file, "resume") : null;
              setError(problem);
              setResume(problem ? null : file);
            }}
            className={`${formInputClass} file:mr-3 file:rounded file:border-0 file:bg-brand-blue file:px-3 file:py-1 file:text-white`}
            disabled={submitting}
          />
        </div>
      </div>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      {error && (
        <p className={`${formErrorClass} mt-6`} role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-lg bg-brand-yellow py-3 text-sm font-bold text-white transition-colors hover:bg-brand-yellow-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
