import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchAlumni } from "@/lib/queries";

export const metadata = {
  title: "Alumni",
};

export const revalidate = 0;

export default async function AlumniPage() {
  const alumni = await fetchAlumni();
  return (
    <>
      <PageHeaderImage title="Our Alumni" />

      <section className="container-page py-10 sm:py-12">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-yellow">
          Alumni Network
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          Where our graduates are today
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          From pharma labs to classrooms and boardrooms, ABGI alumni carry the
          campus forward. Here are a few of the people who started here.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {alumni.map((a) => (
            <article
              key={a.name}
              className="flex flex-col rounded-2xl border border-border-warm-2 bg-surface p-6"
            >
              <div className="flex items-center gap-4">
                {/* ponytail: lorem avatar; swap for real photo later */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.photo}
                  alt={a.name}
                  className="h-16 w-16 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-serif text-lg font-bold text-brand-blue">
                    {a.name}
                  </div>
                  <div className="text-xs text-faint">
                    {a.programme} · Batch of {a.batch}
                  </div>
                </div>
              </div>
              <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-muted">
                &ldquo;{a.quote}&rdquo;
              </blockquote>
              <div className="mt-4 rounded-lg bg-cream-2 px-3 py-2.5">
                <div className="text-[13.5px] font-bold text-brand-blue">
                  {a.role}
                </div>
                <div className="text-xs text-faint">{a.company}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
