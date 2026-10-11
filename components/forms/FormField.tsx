import type { InputHTMLAttributes } from "react";
import { formInputClass, formLabelClass } from "@/lib/form-styles";

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "id">;

// Labelled text input / textarea in the blue form-card style.
export default function FormField({
  id,
  label,
  value,
  onChange,
  multiline,
  ...rest
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={formLabelClass}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={formInputClass}
          placeholder={rest.placeholder}
          disabled={rest.disabled}
        />
      ) : (
        <input
          id={id}
          name={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={formInputClass}
          {...rest}
        />
      )}
    </div>
  );
}

// Hidden field bots tend to fill; submissions with it set are rejected.
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
