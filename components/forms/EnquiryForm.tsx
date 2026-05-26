"use client";

import { FormEvent, useState } from "react";
import DepartmentProgrammeFields from "@/components/forms/DepartmentProgrammeFields";
import {
  formErrorClass,
  formInputClass,
  formLabelClass,
} from "@/lib/form-styles";
import { createBrowserSupabaseClient } from "@/lib/supabase";

function isFilled(value: string) {
  return value.trim().length > 0;
}

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [programme, setProgramme] = useState("");
  const [showError, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  function handleDepartmentChange(value: string) {
    setDepartment(value);
    setProgramme("");
    setShowError(false);
    setSubmitMessage(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid =
      isFilled(name) &&
      isFilled(email) &&
      isFilled(mobile) &&
      isFilled(state) &&
      isFilled(city) &&
      isFilled(department) &&
      isFilled(programme);

    if (!valid) {
      setShowError(true);
      setSubmitMessage(null);
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

    const { error } = await supabase.from("enquiries").insert({
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      state: state.trim(),
      city: city.trim(),
      department,
      programme,
    });

    setSubmitting(false);

    if (error) {
      console.error(error);
      setSubmitMessage({
        type: "error",
        text: "Submission failed. Please try again later.",
      });
      return;
    }

    setSubmitMessage({
      type: "success",
      text: "Thank you! Your application has been submitted.",
    });
    setName("");
    setEmail("");
    setMobile("");
    setState("");
    setCity("");
    setDepartment("");
    setProgramme("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-lg rounded-xl bg-brand-blue px-6 py-8 shadow-xl sm:px-8 sm:py-10"
      noValidate
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
        Application Form
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowError(false);
              setSubmitMessage(null);
            }}
            className={formInputClass}
            placeholder="Enter your full name"
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="email" className={formLabelClass}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setShowError(false);
              setSubmitMessage(null);
            }}
            className={formInputClass}
            placeholder="Enter your email address"
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="mobile" className={formLabelClass}>
            Mobile Number
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              setShowError(false);
              setSubmitMessage(null);
            }}
            className={formInputClass}
            placeholder="Enter your mobile number"
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="state" className={formLabelClass}>
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setShowError(false);
              setSubmitMessage(null);
            }}
            className={formInputClass}
            placeholder="Enter your state"
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="city" className={formLabelClass}>
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShowError(false);
              setSubmitMessage(null);
            }}
            className={formInputClass}
            placeholder="Enter your city"
            disabled={submitting}
          />
        </div>

        <DepartmentProgrammeFields
          department={department}
          programme={programme}
          onDepartmentChange={handleDepartmentChange}
          onProgrammeChange={(value) => {
            setProgramme(value);
            setShowError(false);
            setSubmitMessage(null);
          }}
          departmentLabel="Interested Department"
          programmeLabel="Interested Programme"
        />
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
        >
          {submitMessage.text}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-md bg-brand-yellow py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-yellow-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Submitting…" : "Apply"}
      </button>
    </form>
  );
}
