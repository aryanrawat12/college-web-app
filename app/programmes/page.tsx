import Link from "next/link";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchProgrammes } from "@/lib/queries";

export const metadata = {
  title: "Programmes",
};

export const revalidate = 0;

export default async function ProgrammesPage() {
  const programs = await fetchProgrammes();
  return (
    <>
      <PageHeaderImage title="Programmes" />
      <section className="container-page py-10 sm:py-12">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          All programmes
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Six programmes across Pharmacy, Management and Education. Pick one for
          full details, or use the Program Finder on the home page to filter.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Link
              key={p.slug}
              href={`/programmes/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border-warm-2 bg-surface transition-shadow hover:shadow-[0_12px_30px_rgba(14,20,30,.1)]"
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
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-md bg-cream-2 px-2.5 py-1 text-[11px] font-bold text-brand-blue">
                    {p.school}
                  </span>
                  <span className="rounded-md bg-brand-blue px-2 py-1 font-mono text-[11px] font-bold text-white">
                    {p.levelLabel}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold leading-tight text-brand-blue">
                  {p.name}
                </h3>
                <p className="mt-2 text-[13.5px] text-faint">
                  {p.duration} · {p.seats}
                </p>
                <span className="mt-auto pt-4 text-[13.5px] font-bold text-brand-yellow transition-transform group-hover:translate-x-0.5">
                  View details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
