"use client";

import { FormEvent, useState } from "react";
import { academicYears, getAllProgrammes } from "@/lib/departments";
import {
  formErrorClass,
  formInputClass,
  formLabelClass,
  formSelectClass,
} from "@/lib/form-styles";
import { createBrowserSupabaseClient } from "@/lib/supabase";

const allProgrammes = getAllProgrammes();

function isFilled(value: string) {
  return value.trim().length > 0;
}

export default function ChoupalForm() {
  const [name, setName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [programme, setProgramme] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [showError, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid =
      isFilled(name) &&
      isFilled(enrollmentNumber) &&
      isFilled(programme) &&
      isFilled(year) &&
      isFilled(description);

    if (!valid) {
      setShowError(true);
      setSubmitMessage(null);
      const order: [string, string][] = [
        ["name", name],
        ["enrollment", enrollmentNumber],
        ["programme", programme],
        ["year", year],
        ["description", description],
      ];
      const firstEmpty = order.find(([, value]) => !isFilled(value));
      if (firstEmpty) document.getElementById(firstEmpty[0])?.focus();
      return;
    }

    setShowError(false);
    setSubmitting(true);
    setSubmitMessage(null);

    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setSubmitMessage({
        type: "error",
        text: "Database is not configured. Please contact the administrator.",
      });
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("grievances").insert({
      name: name.trim(),
      enrollment_no: enrollmentNumber.trim(),
      programme,
      year,
      description: description.trim(),
    });

    setSubmitting(false);

    if (error) {
      setSubmitMessage({
        type: "error",
        text: "Submission failed. Please try again later.",
      });
      return;
    }

    setSubmitMessage({
      type: "success",
      text: "Thank you! Your grievance has been submitted.",
    });
    setName("");
    setEnrollmentNumber("");
    setProgramme("");
    setYear("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-lg rounded-2xl bg-brand-blue px-6 py-8 shadow-xl sm:px-8 sm:py-10"
      noValidate
    >
      <h2 className="mb-8 text-center font-serif text-2xl font-bold text-white sm:text-3xl">
        Grievance Form
      </h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className={formLabelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowError(false);
              setSubmitMessage(null);
            }}
            className={formInputClass}
            placeholder="e.g. Aman Sharma"
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="enrollment" className={formLabelClass}>
            Enrollment Number
          </label>
          <input
            id="enrollment"
            name="enrollment"
            type="text"
            autoComplete="off"
            spellCheck={false}
            value={enrollmentNumber}
            onChange={(e) => {
              setEnrollmentNumber(e.target.value);
              setShowError(false);
              setSubmitMessage(null);
            }}
            className={formInputClass}
            placeholder="e.g. ABGI2026001"
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="programme" className={formLabelClass}>
            Programme
          </label>
          <select
            id="programme"
            name="programme"
            value={programme}
            onChange={(e) => {
              setProgramme(e.target.value);
              setShowError(false);
              setSubmitMessage(null);
            }}
            className={formSelectClass}
            disabled={submitting}
          >
            <option value="">Select programme</option>
            {allProgrammes.map((prog) => (
              <option key={prog} value={prog}>
                {prog}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="year" className={formLabelClass}>
            Year
          </label>
          <select
            id="year"
            name="year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setShowError(false);
              setSubmitMessage(null);
            }}
            className={formSelectClass}
            disabled={submitting}
          >
            <option value="">Select year</option>
            {academicYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className={formLabelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setShowError(false);
              setSubmitMessage(null);
            }}
            className={`${formInputClass} min-h-[100px] resize-y`}
            placeholder="Describe your grievance…"
            disabled={submitting}
          />
        </div>
      </div>

      {showError && (
        <p className={`${formErrorClass} mt-6`} role="alert">
          Please fill in all fields before submitting.
        </p>
      )}

      {submitMessage && (
        <p
          className={`mt-6 text-center text-sm font-medium ${
            submitMessage.type === "success"
              ? "text-brand-yellow"
              : "text-red-300"
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
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
