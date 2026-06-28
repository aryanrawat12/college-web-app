import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchProgrammes } from "@/lib/queries";
import { routes } from "@/lib/site";

export const revalidate = 0;

export async function generateStaticParams() {
  const programs = await fetchProgrammes();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programs = await fetchProgrammes();
  const program = programs.find((p) => p.slug === slug);
  return { title: program ? program.name : "Programme" };
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-warm-2 bg-cream-2 px-4 py-3">
      <div className="font-mono text-[10.5px] font-bold uppercase tracking-wide text-brand-yellow">
        {label}
      </div>
      <div
        className="mt-0.5 text-[14px] font-semibold text-foreground"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </div>
    </div>
  );
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programs = await fetchProgrammes();
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  return (
    <>
      <PageHeaderImage title={program.name} />

      <section className="container-page grid grid-cols-1 gap-10 py-10 sm:py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-cream-2 px-2.5 py-1 text-[11px] font-bold text-brand-blue">
              {program.school}
            </span>
            <span className="rounded-md bg-brand-blue px-2 py-1 font-mono text-[11px] font-bold text-white">
              {program.levelLabel}
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue">
            Programme overview
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            {program.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Detail label="Duration" value={program.duration} />
            <Detail label="Intake" value={program.seats} />
            <Detail label="Fees" value={program.fee} />
            <Detail label="Mode" value={program.mode} />
            <Detail label="Approvals" value={program.approval} />
          </div>

          <div className="mt-6 space-y-3 text-[15px] text-foreground/85">
            <p>
              <span className="font-semibold text-brand-blue">Eligibility: </span>
              {program.eligibility}
            </p>
            <p>
              <span className="font-semibold text-brand-blue">
                Career outcomes:{" "}
              </span>
              {program.careers}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={routes.apply}
              className="rounded-xl bg-brand-yellow px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-brand-yellow-hover"
            >
              Apply now
            </Link>
            <Link
              href={program.href}
              className="rounded-xl border border-brand-blue px-6 py-3 text-[15px] font-bold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
            >
              View department
            </Link>
          </div>
        </div>

        <div className="relative h-64 overflow-hidden rounded-2xl border border-border-warm-2 bg-cream-2 lg:h-full">
          {/* ponytail: lorem placeholder image; swap for a real photo later */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={program.image}
            alt={`${program.name} (placeholder)`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
