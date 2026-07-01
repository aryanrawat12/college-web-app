"use client";

import { useMemo, useState } from "react";
import ProgrammeDeck from "@/components/home/ProgrammeDeck";
import type { SectionText } from "@/lib/queries";
import { programs as fallbackPrograms, type Program } from "@/lib/programs";

// Institutes = the three schools, in display order.
const INSTITUTES = ["Pharmacy", "Management", "Education"] as const;
const instituteLabel: Record<string, string> = {
  Pharmacy: "Institute of Pharmacy",
  Management: "Institute of Management",
  Education: "Institute of Education",
};

export default function ProgramFinder({
  programs = fallbackPrograms,
  content,
}: {
  programs?: Program[];
  content?: SectionText;
}) {
  const eyebrow = content ? content.eyebrow : "Program Finder";
  const heading = content ? content.heading : "Explore programmes by institute";
  const description = content
    ? content.description
    : "Pick an institute on the right — its programmes load with duration, intake and approvals up front.";
  const [active, setActive] = useState<string>(INSTITUTES[0]);

  const grouped = useMemo(() => {
    const m: Record<string, Program[]> = {};
    for (const p of programs) (m[p.school] ??= []).push(p);
    return m;
  }, [programs]);

  const list = grouped[active] ?? [];

  return (
    <section id="finder" className="bg-background">
      <div className="container-page py-16 sm:py-20">
        <div className="mb-8">
          {eyebrow && (
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
              {eyebrow}
            </div>
          )}
          {heading && (
            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-3 max-w-xl text-base text-muted">{description}</p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_264px]">
          {/* Programme pile — rows of up to 2 cards; "Next" flips the whole
              row. Keyed by institute so the deck resets on institute change. */}
          <div key={active} className="card-in">
            <ProgrammeDeck programs={list} />
          </div>

          {/* Institute selector — right side, sticky on desktop */}
          <aside className="order-first lg:order-none lg:sticky lg:top-28 h-max">
            <div className="rounded-2xl border border-border-warm bg-surface p-2 shadow-[0_6px_22px_rgba(14,20,30,.05)]">
              {INSTITUTES.map((inst) => {
                const on = inst === active;
                const count = grouped[inst]?.length ?? 0;
                return (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setActive(inst)}
                    aria-pressed={on}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-colors ${
                      on
                        ? "bg-brand-blue text-white"
                        : "text-brand-blue hover:bg-cream-2"
                    }`}
                  >
                    <span>
                      <span className="block font-serif text-[15px] font-bold leading-tight">
                        {instituteLabel[inst]}
                      </span>
                      <span
                        className={`block text-[12px] ${on ? "text-white/70" : "text-faint"}`}
                      >
                        {count} {count === 1 ? "programme" : "programmes"}
                      </span>
                    </span>
                    <span
                      className={`text-lg transition-transform ${on ? "translate-x-0.5" : "-translate-x-1 opacity-40"}`}
                      aria-hidden
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
