"use client";

import { FormEvent, useState } from "react";
import FormField, { Honeypot } from "@/components/forms/FormField";
import { getAllProgrammes } from "@/lib/departments";
import {
  formErrorClass,
  formInputClass,
  formLabelClass,
  formSelectClass,
} from "@/lib/form-styles";
import { checkUpload, uploadLimits, uploadPrivateFile } from "@/lib/public-upload";
import { createBrowserSupabaseClient } from "@/lib/supabase";

// Student ID-card details. Admin exports submissions to Excel for printing;
// fields mirror the printed card (front: photo, enrolment, batch, name,
// course, DOB, contact; back: parents' names, local address).

const EMPTY = {
  name: "",
  enrollment_no: "",
  course: "",
  batch: "",
  dob: "",
  contact: "",
  father_name: "",
  mother_name: "",
  local_address: "",
};
type Values = typeof EMPTY;

const ORDER: (keyof Values)[] = [
  "name",
  "enrollment_no",
  "course",
  "batch",
  "dob",
  "contact",
  "father_name",
  "mother_name",
  "local_address",
];

export default function IdCardForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function set(name: keyof Values, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    setError(null);
  }

  function choosePhoto(file: File | null) {
    if (preview) URL.revokeObjectURL(preview);
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  function onPhoto(file: File | undefined) {
    setError(null);
    const problem = file ? checkUpload(file, "id-photo") : null;
    if (problem) setError(problem);
    choosePhoto(file && !problem ? file : null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const firstEmpty = ORDER.find((k) => !values[k].trim());
    if (firstEmpty) {
      setError("Please fill in all fields.");
      document.getElementById(firstEmpty)?.focus();
      return;
    }
    if (!/^\d{10}$/.test(values.contact.replace(/[\s-]/g, ""))) {
      setError("Contact number must be 10 digits.");
      document.getElementById("contact")?.focus();
      return;
    }
    if (!photo) {
      setError("Please upload your passport-size photo.");
      document.getElementById("photo")?.focus();
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
      const photo_key = await uploadPrivateFile(photo, "id-photo", honeypot);
      const trimmed = Object.fromEntries(
        Object.entries(values).map(([k, v]) => [k, v.trim()]),
      ) as Values;
      const { error: dbError } = await supabase.from("id_card_submissions").insert({
        ...trimmed,
        enrollment_no: trimmed.enrollment_no.toUpperCase(),
        contact: trimmed.contact.replace(/[\s-]/g, ""),
        photo_key,
      });
      if (dbError) throw new Error("Submission failed. Please try again later.");
      setDone(true);
      setValues(EMPTY);
      choosePhoto(null);
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
          Details submitted
        </h2>
        <p className="mt-3 text-[#dbe2ec]">
          Thank you! Your ID card details have been received. The college office
          will contact you once your card is ready.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-6 rounded-lg bg-brand-yellow px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-yellow-hover"
        >
          Submit another
        </button>
      </div>
    );
  }

  const field = (name: keyof Values, label: string, extra = {}) => (
    <FormField
      id={name}
      label={label}
      value={values[name]}
      onChange={(v) => set(name, v)}
      disabled={submitting}
      {...extra}
    />
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto w-full max-w-2xl rounded-2xl bg-brand-blue px-6 py-8 shadow-xl sm:px-10 sm:py-10"
      noValidate
    >
      <h2 className="text-center font-serif text-2xl font-bold text-white sm:text-3xl">
        Student ID Card Details
      </h2>
      <p className="mb-8 mt-2 text-center text-sm text-[#dbe2ec]">
        Fill in your details exactly as they should appear on your ID card.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          {field("name", "Full Name", { autoComplete: "name", placeholder: "e.g. Aasha Malviya" })}
        </div>
        {field("enrollment_no", "Enrollment No.", { placeholder: "e.g. 0558PY241001", spellCheck: false })}
        {field("batch", "Batch", { placeholder: "e.g. 2024-28" })}
        <div>
          <label htmlFor="course" className={formLabelClass}>
            Course
          </label>
          <select
            id="course"
            name="course"
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
        {field("dob", "Date of Birth", { type: "date", max: new Date().toISOString().slice(0, 10) })}
        {field("contact", "Contact No.", {
          type: "tel",
          inputMode: "numeric",
          autoComplete: "tel-national",
          placeholder: "10-digit mobile number",
        })}
        <div className="hidden sm:block" />
        {field("father_name", "Father's Name")}
        {field("mother_name", "Mother's Name")}
        <div className="sm:col-span-2">
          {field("local_address", "Local Address", {
            multiline: true,
            placeholder: "House no., street, village/city, district, PIN",
          })}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="photo" className={formLabelClass}>
            Passport-size Photo (JPG/PNG, max {uploadLimits["id-photo"].maxMb} MB)
          </label>
          <div className="flex items-center gap-4">
            <div className="flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/30 bg-white/10 text-xs text-white/60">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Selected photo" className="h-full w-full object-cover" />
              ) : (
                "No photo"
              )}
            </div>
            <input
              id="photo"
              name="photo"
              type="file"
              accept={uploadLimits["id-photo"].accept}
              onChange={(e) => onPhoto(e.target.files?.[0])}
              className={`${formInputClass} file:mr-3 file:rounded file:border-0 file:bg-brand-blue file:px-3 file:py-1 file:text-white`}
              disabled={submitting}
            />
          </div>
          <p className="mt-1.5 text-xs text-white/70">
            Recent photo, plain background, face clearly visible.
          </p>
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
        {submitting ? "Submitting…" : "Submit Details"}
      </button>
    </form>
  );
}
