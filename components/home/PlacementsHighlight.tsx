import Link from "next/link";
import CountUp from "@/components/shared/CountUp";
import type { SectionText } from "@/lib/queries";
import {
  placementStats as fallbackStats,
  recruiters as fallbackRecruiters,
} from "@/lib/placements-data";
import { routes } from "@/lib/site";

type Stat = { value: string; label: string };
type Recruiter = { name: string; logo: string | null };

export default function PlacementsHighlight({
  stats = fallbackStats,
  recruiters = fallbackRecruiters,
  content,
}: {
  stats?: Stat[];
  recruiters?: Recruiter[];
  content?: SectionText;
}) {
  const eyebrow = content ? content.eyebrow : "Placements & Training";
  const heading = content
    ? content.heading
    : "A dedicated cell that backs every student.";
  const description = content
    ? content.description
    : "Our Training & Placement Cell runs year-round training, aptitude prep and recruitment drives across pharmacy, management and education — connecting students to industry and higher-study routes.";
  return (
    <section
      id="placements"
      className="bg-brand-blue text-white"
      aria-label="Placements and recruiters"
    >
      <div className="container-page grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_1.05fr]">
        <div>
          {eyebrow && (
            <div className="mb-3.5 font-mono text-xs uppercase tracking-[0.18em] text-brand-gold-light">
              {eyebrow}
            </div>
          )}
          {heading && (
            <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-[40px]">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#b9c4d6]">
              {description}
            </p>
          )}
          <div className="mt-8 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-2">
            {stats.map((ps, i) => (
              <div
                key={ps.label}
                className="stagger-item rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/25"
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              >
                <CountUp
                  value={ps.value}
                  className="block font-serif text-xl font-bold leading-tight text-white"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                />
                <div className="mt-1.5 text-[12px] text-[#9fb0cc]">
                  {ps.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-brand-blue-dark p-7 sm:p-8">
          <div className="mb-5 flex items-baseline justify-between">
            <span className="text-[15px] font-bold text-white">
              Recruiting partners
            </span>
            <span className="font-mono text-xs text-[#9fb0cc]">
              pharma &amp; healthcare
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {recruiters.map((r, i) => (
              <li
                key={r.name}
                translate="no"
                className="stagger-item flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3 transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/25"
                style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
              >
                {r.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.logo}
                    alt={r.name}
                    className="max-h-8 max-w-[80%] object-contain opacity-80 brightness-0 invert transition-opacity hover:opacity-100"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-center text-[13px] font-bold text-[#cdd7e6]">
                    {r.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={routes.placements}
            className="mt-6 inline-flex w-full justify-center rounded-xl bg-brand-yellow px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-yellow-hover"
          >
            View placement details →
          </Link>
        </div>
      </div>
    </section>
  );
}
