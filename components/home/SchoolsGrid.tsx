import Image from "next/image";
import Link from "next/link";
import { navSchools } from "@/lib/home-data";

export default function SchoolsGrid() {
  return (
    <section
      id="schools"
      className="border-t border-border-warm-2 bg-cream-2"
      aria-label="Our institutes"
    >
      <div className="container-page py-16 sm:py-20">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
          Our Institutes
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          Three institutes, each with its own home
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Every stream has a dedicated page with its own accreditation,
          eligibility, fees and placement story — no generic funnel.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {navSchools.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border-warm-2 bg-surface transition-all hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(14,20,30,.14)]"
            >
              <div className="relative h-44 overflow-hidden bg-cream-2">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/70 via-brand-blue-dark/10 to-transparent" />
                <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 font-mono text-base font-bold text-brand-blue shadow-sm">
                  {s.initials}
                </div>
                <span className="absolute bottom-3 left-4 rounded-md bg-brand-yellow px-2.5 py-1 text-[11px] font-bold text-white">
                  {s.accred}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-bold text-brand-blue">
                  {s.name}
                </h3>
                <div className="mt-0.5 text-[13px] text-faint">{s.short}</div>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">
                  {s.desc}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border-warm-2 pt-3.5">
                  <span className="text-[13px] font-semibold text-brand-blue">
                    {s.programs}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-brand-yellow transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
