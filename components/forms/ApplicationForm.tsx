"use client";

import { FormEvent, useState } from "react";
import DepartmentProgrammeFields from "@/components/forms/DepartmentProgrammeFields";
import {
  formErrorClass,
  formInputClass,
  formLabelClass,
} from "@/lib/form-styles";
import { createBrowserSupabaseClient } from "@/lib/supabase";

// ponytail: full application form. Submits to a Supabase `applications` table
// when configured; with no DB it falls back to a demo success so the feature
// works during the dummy-data phase. Document upload is best-effort.

function isFilled(v: string) {
  return v.trim().length > 0;
}

export default function ApplicationForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    state: "",
    city: "",
    qualification: "",
    percentage: "",
    department: "",
    programme: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [showError, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const set = (key: keyof typeof values) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setShowError(false);
    setSubmitMessage(null);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const required: (keyof typeof values)[] = [
      "name",
      "email",
      "mobile",
      "dob",
      "state",
      "city",
      "qualification",
      "department",
      "programme",
    ];
    const firstEmpty = required.find((k) => !isFilled(values[k]));
    if (firstEmpty) {
      setShowError(true);
      document.getElementById(firstEmpty)?.focus();
      return;
    }

    setShowError(false);
    setSubmitting(true);
    setSubmitMessage(null);

    const supabase = createBrowserSupabaseClient();

    // No DB configured → demo success (dummy-data phase).
    if (!supabase) {
      setSubmitMessage({
        type: "success",
        text: "Thank you! Your application has been received. Our admissions team will contact you shortly.",
      });
      setSubmitting(false);
      return;
    }

    // Best-effort document upload; non-blocking on failure.
    let documentPath: string | null = null;
    if (file) {
      const path = `${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage
        .from("applications")
        .upload(path, file);
      if (!upErr) documentPath = path;
    }

    const payload = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      mobile: values.mobile.trim(),
      document_path: documentPath,
    };
    // ponytail: `applications` table isn't in the generated DB types yet — cast
    // until the client creates the table and types are regenerated.
    const { error } = await supabase
      .from("applications")
      .insert(payload as never);

    setSubmitting(false);

    if (error) {
      console.error(error);
      setSubmitMessage({
        type: "error",
        text: "Submission failed. Please try again later or contact admissions.",
      });
      return;
    }

    setSubmitMessage({
      type: "success",
      text: "Thank you! Your application has been submitted.",
    });
    setValues({
      name: "",
      email: "",
      mobile: "",
      dob: "",
      state: "",
      city: "",
      qualification: "",
      percentage: "",
      department: "",
      programme: "",
      message: "",
    });
    setFile(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl rounded-2xl bg-brand-blue px-6 py-8 shadow-xl sm:px-8 sm:py-10"
      noValidate
    >
      <h2 className="mb-8 text-center font-serif text-2xl font-bold text-white sm:text-3xl">
        Online Application
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="name" label="Full Name" value={values.name} onChange={set("name")} placeholder="e.g. Aman Sharma" disabled={submitting} />
        <Field id="email" label="Email Address" type="email" value={values.email} onChange={set("email")} placeholder="e.g. you@example.com" disabled={submitting} />
        <Field id="mobile" label="Mobile Number" type="tel" value={values.mobile} onChange={set("mobile")} placeholder="e.g. 98765 43210" disabled={submitting} />
        <Field id="dob" label="Date of Birth" type="date" value={values.dob} onChange={set("dob")} disabled={submitting} />
        <Field id="state" label="State" value={values.state} onChange={set("state")} placeholder="e.g. Madhya Pradesh" disabled={submitting} />
        <Field id="city" label="City" value={values.city} onChange={set("city")} placeholder="e.g. Bhopal" disabled={submitting} />
        <Field id="qualification" label="Last Qualification" value={values.qualification} onChange={set("qualification")} placeholder="e.g. 10+2 (PCB)" disabled={submitting} />
        <Field id="percentage" label="Percentage / CGPA (optional)" value={values.percentage} onChange={set("percentage")} placeholder="e.g. 78%" disabled={submitting} />
      </div>

      <div className="mt-5">
        <DepartmentProgrammeFields
          department={values.department}
          programme={values.programme}
          onDepartmentChange={(v) => {
            setValues((prev) => ({ ...prev, department: v, programme: "" }));
            setShowError(false);
            setSubmitMessage(null);
          }}
          onProgrammeChange={set("programme")}
          departmentLabel="Department"
          programmeLabel="Programme"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="document" className={formLabelClass}>
          Upload Document (marksheet / ID) — optional
        </label>
        <input
          id="document"
          name="document"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          disabled={submitting}
          className="w-full rounded-md border border-white/20 bg-white px-3 py-2.5 text-sm text-brand-blue file:mr-3 file:rounded file:border-0 file:bg-brand-yellow file:px-3 file:py-1.5 file:font-semibold file:text-white"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={formLabelClass}>
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          disabled={submitting}
          className={formInputClass}
          placeholder="Anything you'd like us to know"
        />
      </div>

      {showError && (
        <p className={`${formErrorClass} mt-6`} role="alert">
          Please fill in all required fields before submitting.
        </p>
      )}

      {submitMessage && (
        <p
          className={`mt-6 text-center text-sm font-medium ${
            submitMessage.type === "success" ? "text-brand-yellow" : "text-red-300"
          }`}
          role="status"
          aria-live="polite"
        >
          {submitMessage.text}
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

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className={formLabelClass}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={formInputClass}
      />
    </div>
  );
}
