"use client";

import { useState, type ReactNode } from "react";

type ContactItem = {
  heading: string;
  content: ReactNode;
};

type ContactAccordionProps = {
  items: ContactItem[];
};

export default function ContactAccordion({ items }: ContactAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-brand-blue/15 rounded-lg border border-brand-blue/15">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.heading}>
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-4 text-left transition-colors hover:bg-brand-blue/5 sm:px-5"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-lg font-semibold text-brand-blue">
                {item.heading}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-5 w-5 shrink-0 text-brand-blue transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="border-t border-brand-blue/10 bg-brand-blue/[0.03] px-4 py-4 text-base leading-relaxed text-foreground/90 sm:px-5 sm:text-lg">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
