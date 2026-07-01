"use client";

import Link from "next/link";
import { useState } from "react";
import type { Program } from "@/lib/programs";
import { routes } from "@/lib/site";

// A paged pile of programme rows. Each row shows up to 2 cards side by side;
// "Next" flips the whole row. e.g. 3 programmes → page 1 (2 cards), page 2
// (1 card). Each card carries its own decorative stacked backs (within its own
// slot), so an empty slot stays empty — no card bleeds through from behind.
const PER_ROW = 2;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function ProgrammeDeck({ programs }: { programs: Program[] }) {
  const rows = chunk(programs, PER_ROW);
  const m = rows.length;
  const [order, setOrder] = useState(() => rows.map((_, i) => i));
  const top = order[0];

  const flip = () => setOrder((o) => [...o.slice(1), o[0]]);
  const bringForward = (idx: number) =>
    setOrder((o) => [idx, ...o.filter((i) => i !== idx)]);

  return (
    <div>
      {/* Top row — re-keyed so the entrance animation replays on each flip */}
      <div
        key={top}
        className="card-in grid grid-cols-1 items-start gap-6 pb-6 sm:grid-cols-2"
      >
        {rows[top].map((p) => (
          <Card key={p.slug} p={p} />
        ))}
      </div>

      {m > 1 && (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={flip}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Next
            <span aria-hidden>↻</span>
          </button>
          <div className="flex gap-1.5" role="tablist" aria-label="Programme rows">
            {rows.map((_, rIdx) => (
              <button
                key={rIdx}
                type="button"
                aria-label={`Row ${rIdx + 1}`}
                aria-selected={rIdx === top}
                onClick={() => bringForward(rIdx)}
                className={`h-2 rounded-full transition-all ${
                  rIdx === top
                    ? "w-6 bg-brand-blue"
                    : "w-2 bg-border-warm-2 hover:bg-faint"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[12px] text-faint">
            {top + 1} / {m}
          </span>
        </div>
      )}
    </div>
  );
}

function Card({ p }: { p: Program }) {
  return (
    <div className="relative">
      {/* Decorative stacked backs (confined to this card's slot) */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-2xl border border-border-warm-2 bg-cream-2 shadow-[0_10px_24px_rgba(14,20,30,.08)]"
        style={{ transform: "translateY(11px) scale(0.985)" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-20 rounded-2xl border border-border-warm-2 bg-cream-2/70"
        style={{ transform: "translateY(22px) scale(0.97)" }}
      />

      <article className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl border border-border-warm-2 shadow-[0_12px_34px_rgba(14,20,30,.12)]">
        {/* ponytail: lorem placeholder image; swap for a real photo later */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={`${p.name} (placeholder)`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/55 to-black/10" />
        <span className="absolute right-3 top-3 rounded-md bg-brand-blue px-2 py-1 font-mono text-[11px] font-bold text-white">
          {p.level}
        </span>

        <div className="relative flex flex-col p-5">
          <h3 className="mb-3.5 font-serif text-lg font-semibold leading-tight text-white">
            {p.name}
          </h3>
          <dl className="grid grid-cols-2 gap-x-3.5 gap-y-3">
            <Field label="Duration" value={p.duration} />
            <Field label="Intake" value={p.seats} />
          </dl>

          {/* Approvals + eligibility — revealed on card hover only */}
          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-out group-hover:mt-4 group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <div className="overflow-hidden">
              <dl className="mb-3">
                <Field label="Approvals" value={p.approval} accent />
              </dl>
              <p className="rounded-lg bg-white/10 px-3 py-2.5 text-[12.5px] leading-snug text-white/85 backdrop-blur-sm">
                <strong className="text-white">Eligibility:</strong>{" "}
                {p.eligibility}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2.5">
            <Link
              href={routes.enquiry}
              className="flex-1 rounded-lg bg-brand-yellow px-3 py-2.5 text-center text-[13.5px] font-bold text-white transition-colors hover:bg-brand-yellow-hover"
            >
              Apply / Enquire
            </Link>
            <Link
              href={`/programmes/${p.slug}`}
              className="rounded-lg border border-white/40 px-3.5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Details
            </Link>
          </div>
        </div>
      </article>
    </div>
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
      <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-white/60">
        {label}
      </dt>
      <dd
        className={`mt-0.5 text-[13px] font-semibold ${accent ? "text-brand-gold-light" : "text-white"}`}
      >
        {value}
      </dd>
    </div>
  );
}
