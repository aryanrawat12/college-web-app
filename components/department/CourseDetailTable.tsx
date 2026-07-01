import { departmentContent } from "@/lib/department-content";

type Props = { dept: keyof typeof departmentContent };

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-warm-2 bg-cream-2 px-3 py-2.5">
      <div className="font-mono text-[10.5px] font-bold uppercase tracking-wide text-brand-yellow">
        {label}
      </div>
      <div
        className="mt-0.5 text-[13.5px] font-medium text-foreground"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </div>
    </div>
  );
}

export default function CourseDetailTable({ dept }: Props) {
  const { accreditation, courses } = departmentContent[dept];

  return (
    <section className="container-page py-10 sm:py-12">
      <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-brand-blue">
        Courses Detail
      </h2>

      <ul className="mb-6 flex flex-wrap gap-2" aria-label="Approvals">
        {accreditation.map((a) => (
          <li
            key={a}
            className="rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white"
            translate="no"
          >
            {a}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-6">
        {courses.map((c) => (
          <article
            key={c.programme}
            className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border-warm-2 bg-surface md:grid-cols-[300px_1fr]"
          >
            <div className="relative aspect-[16/10] bg-cream-2 md:aspect-auto">
              {/* ponytail: lorem placeholder image; swap for a real photo later */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={`${c.programme} (placeholder)`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-5 sm:p-6">
              <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-brand-yellow">
                {c.level}
              </div>
              <h3 className="mt-1 font-serif text-xl font-bold text-brand-blue">
                {c.programme}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                {c.description}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                <Detail label="Duration" value={c.duration} />
                <Detail label="Intake" value={c.intake} />
                <Detail label="Mode" value={c.mode} />
              </div>
              <div className="mt-4 space-y-1.5 text-[13.5px] text-foreground/80">
                <p>
                  <span className="font-semibold text-brand-blue">
                    Eligibility:{" "}
                  </span>
                  {c.eligibility}
                </p>
                <p>
                  <span className="font-semibold text-brand-blue">
                    Career outcomes:{" "}
                  </span>
                  {c.careers}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
