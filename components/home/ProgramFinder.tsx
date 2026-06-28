"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  levelOptions,
  programs as fallbackPrograms,
  streamOptions,
  type LevelCategory,
  type Program,
} from "@/lib/programs";
import { routes } from "@/lib/site";

const chipBase =
  "rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors cursor-pointer";

export default function ProgramFinder({
  programs = fallbackPrograms,
}: {
  programs?: Program[];
}) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<LevelCategory | "all">("all");
  const [stream, setStream] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programs.filter((p) => {
      if (level !== "all" && p.level !== level) return false;
      if (stream !== "All" && p.school !== stream) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.school.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [query, level, stream, programs]);

  const clear = () => {
    setQuery("");
    setLevel("all");
    setStream("All");
  };

  return (
    <section id="finder" className="bg-background">
      <div className="container-page py-16 sm:py-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
              Program Finder
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
              Find the right programme
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted">
              Filter by level and stream, or search. Every result shows
              duration, intake, fees and approvals up front.
            </p>
          </div>
          <div className="rounded-xl border border-border-warm bg-surface px-4 py-2.5 font-mono text-[13px] text-faint">
            {results.length} of {programs.length} programmes
          </div>
        </div>

        {/* Filter bar */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-border-warm bg-surface p-4 shadow-[0_6px_22px_rgba(14,20,30,.05)]">
          <label className="flex min-w-[240px] flex-1 items-center gap-2.5 rounded-xl border border-border-warm-2 bg-tint px-3.5 py-3">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-faint">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programmes — e.g. B.Pharm, MBA, B.Ed…"
              className="w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-faint"
              aria-label="Search programmes"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-faint">
              Level
            </span>
            {levelOptions.map((lv) => {
              const on = level === lv.value;
              return (
                <button
                  key={lv.value}
                  type="button"
                  onClick={() => setLevel(lv.value)}
                  className={`${chipBase} ${
                    on
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-border-warm bg-surface text-[#34404f] hover:border-brand-blue"
                  }`}
                >
                  {lv.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-faint">
              Stream
            </span>
            {streamOptions.map((s) => {
              const on = stream === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStream(s)}
                  className={`${chipBase} ${
                    on
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-border-warm bg-surface text-[#34404f] hover:border-brand-blue"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <article
                key={p.name}
                className="flex flex-col overflow-hidden rounded-2xl border border-border-warm-2 bg-surface transition-shadow hover:shadow-[0_12px_30px_rgba(14,20,30,.1)]"
              >
                <div className="relative aspect-[16/9] bg-cream-2">
                  {/* ponytail: lorem placeholder image; swap for a real photo later */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={`${p.name} (placeholder)`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-cream-2/95 px-2.5 py-1 text-[11px] font-bold text-brand-blue shadow-sm">
                    {p.school}
                  </span>
                  <span className="absolute right-3 top-3 rounded-md bg-brand-blue px-2 py-1 font-mono text-[11px] font-bold text-white">
                    {p.level}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-3.5 font-serif text-lg font-semibold leading-tight text-brand-blue">
                  {p.name}
                </h3>
                <dl className="mb-4 grid grid-cols-2 gap-x-3.5 gap-y-3">
                  <Field label="Duration" value={p.duration} />
                  <Field label="Intake" value={p.seats} />
                  <Field label="Fees / year" value={p.fee} />
                  <Field label="Approvals" value={p.approval} accent />
                </dl>
                <p className="mb-4 rounded-lg bg-tint px-3 py-2.5 text-[12.5px] leading-snug text-[#6f6a5d]">
                  <strong className="text-[#34404f]">Eligibility:</strong>{" "}
                  {p.eligibility}
                </p>
                <div className="mt-auto flex gap-2.5">
                  <Link
                    href={routes.enquiry}
                    className="flex-1 rounded-lg bg-brand-yellow px-3 py-2.5 text-center text-[13.5px] font-bold text-white transition-colors hover:bg-brand-yellow-hover"
                  >
                    Apply / Enquire
                  </Link>
                  <Link
                    href={`/programmes/${p.slug}`}
                    className="rounded-lg border border-border-warm px-3.5 py-2.5 text-[13.5px] font-semibold text-brand-blue transition-colors hover:border-brand-blue"
                  >
                    Details
                  </Link>
                </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#d9d1c2] bg-surface p-12 text-center">
            <div className="mb-2 font-serif text-xl text-brand-blue">
              No programmes match those filters
            </div>
            <p className="mb-4 text-faint">
              Try a different stream or clear your search.
            </p>
            <button
              type="button"
              onClick={clear}
              className="rounded-lg bg-brand-blue px-5 py-2.5 font-bold text-white"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-[#9a9384]">
        {label}
      </dt>
      <dd
        className={`mt-0.5 text-[13px] font-semibold ${accent ? "text-brand-yellow" : "text-[#34404f]"}`}
      >
        {value}
      </dd>
    </div>
  );
}
