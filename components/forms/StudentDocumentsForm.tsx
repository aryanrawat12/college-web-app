"use client";

import { FormEvent, useState } from "react";
import FormField, { Honeypot } from "@/components/forms/FormField";
import { getAllProgrammes } from "@/lib/departments";
import { uploadableDocuments, type DocColumn } from "@/lib/documents-data";
import {
  formErrorClass,
  formInputClass,
  formLabelClass,
  formSelectClass,
} from "@/lib/form-styles";
import { checkUpload, uploadLimits, uploadPrivateFile } from "@/lib/public-upload";
import { createBrowserSupabaseClient } from "@/lib/supabase";

// Admission document upload. Each file goes to private S3 storage first
// (one at a time, with progress), then one student_documents row stores
// the keys. Admin views/exports from the Submissions panel.

const EMPTY = { name: "", enrollment_no: "", course: "", mobile: "", email: "" };
type Values = typeof EMPTY;

export default function StudentDocumentsForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [files, setFiles] = useState<Partial<Record<DocColumn, File>>>({});
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const submitting = progress !== null;

  function set(name: keyof Values, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    setError(null);
  }

  function pick(column: DocColumn, file: File | undefined) {
    setError(null);
    const problem = file ? checkUpload(file, "document") : null;
    if (problem) setError(problem);
    setFiles((f) => {
      const next = { ...f };
      if (file && !problem) next[column] = file;
      else delete next[column];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const required: (keyof Values)[] = ["name", "course", "mobile", "email"];
    const firstEmpty = required.find((k) => !values[k].trim());
    if (firstEmpty) {
      setError("Please fill in your name, course, mobile number and email.");
      document.getElementById(`doc-${firstEmpty}`)?.focus();
      return;
    }
    if (!/^\d{10}$/.test(values.mobile.replace(/[\s-]/g, ""))) {
      setError("Mobile number must be 10 digits.");
      document.getElementById("doc-mobile")?.focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      setError("Please enter a valid email address.");
      document.getElementById("doc-email")?.focus();
      return;
    }
    const missing = uploadableDocuments.find((d) => d.required && !files[d.column]);
    if (missing) {
      setError(`Please upload your ${missing.name}.`);
      document.getElementById(missing.column)?.focus();
      return;
    }

    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setError("Database is not configured. Please contact the administrator.");
      return;
    }

    setError(null);
    const chosen = uploadableDocuments.filter((d) => files[d.column]);
    const keys: Partial<Record<DocColumn, string>> = {};
    try {
      for (const [i, doc] of chosen.entries()) {
        setProgress(`Uploading ${i + 1} of ${chosen.length}: ${doc.name}…`);
        keys[doc.column] = await uploadPrivateFile(files[doc.column]!, "document", honeypot);
      }
      setProgress("Saving…");
      const { error: dbError } = await supabase.from("student_documents").insert({
        name: values.name.trim(),
        enrollment_no: values.enrollment_no.trim().toUpperCase() || null,
        course: values.course,
        mobile: values.mobile.replace(/[\s-]/g, ""),
        email: values.email.trim(),
        ...(keys as Record<DocColumn, string>),
      });
      if (dbError) throw new Error("Submission failed. Please try again later.");
      setDone(true);
      setValues(EMPTY);
      setFiles({});
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed.");
    } finally {
      setProgress(null);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-brand-blue px-6 py-10 text-center shadow-xl sm:px-10">
        <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
          Documents submitted
        </h2>
        <p className="mt-3 text-[#dbe2ec]">
          Thank you! Your documents have been received by the admissions office.
          Please bring the originals for verification at the time of admission.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl bg-brand-blue px-6 py-8 shadow-xl sm:px-10 sm:py-10"
      noValidate
    >
      <h2 className="text-center font-serif text-2xl font-bold text-white sm:text-3xl">
        Upload Your Documents
      </h2>
      <p className="mb-8 mt-2 text-center text-sm text-[#dbe2ec]">
        PDF, JPG or PNG, up to {uploadLimits.document.maxMb} MB each. Fields
        marked * are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="doc-name"
          label="Student Name *"
          value={values.name}
          onChange={(v) => set("name", v)}
          autoComplete="name"
          disabled={submitting}
        />
        <div>
          <label htmlFor="doc-course" className={formLabelClass}>
            Course *
          </label>
          <select
            id="doc-course"
            value={values.course}
            onChange={(e) => set("course", e.target.value)}
            className={formSelectClass}
            disabled={submitting}
          >
            <option value="">Select course</option>
            {getAllProgrammes().map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <FormField
          id="doc-mobile"
          label="Contact Number *"
          value={values.mobile}
          onChange={(v) => set("mobile", v)}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="10-digit mobile number"
          disabled={submitting}
        />
        <FormField
          id="doc-email"
          label="Email Address *"
          value={values.email}
          onChange={(v) => set("email", v)}
          type="email"
          autoComplete="email"
          spellCheck={false}
          disabled={submitting}
        />
        <FormField
          id="doc-enrollment_no"
          label="Enrollment No. (if allotted)"
          value={values.enrollment_no}
          onChange={(v) => set("enrollment_no", v)}
          spellCheck={false}
          disabled={submitting}
        />
      </div>

      <div className="mt-8 grid gap-x-5 gap-y-4 sm:grid-cols-2">
        {uploadableDocuments.map((doc) => (
          <div key={doc.column}>
            <label htmlFor={doc.column} className={formLabelClass}>
              {doc.name}
              {doc.required ? " *" : " (if applicable)"}
            </label>
            <input
              id={doc.column}
              type="file"
              accept={uploadLimits.document.accept}
              onChange={(e) => pick(doc.column, e.target.files?.[0])}
              className={`${formInputClass} py-2 file:mr-3 file:rounded file:border-0 file:bg-brand-blue file:px-3 file:py-1 file:text-white`}
              disabled={submitting}
            />
          </div>
        ))}
      </div>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      {error && (
        <p className={`${formErrorClass} mt-6`} role="alert">
          {error}
        </p>
      )}
      {progress && (
        <p className="mt-6 text-center text-sm font-medium text-white" role="status" aria-live="polite">
          {progress}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-lg bg-brand-yellow py-3 text-sm font-bold text-white transition-colors hover:bg-brand-yellow-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Please wait…" : "Submit Documents"}
      </button>
    </form>
  );
}
