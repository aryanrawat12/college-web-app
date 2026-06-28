import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { placementHighlights } from "@/lib/placements-data";
import {
  fetchPlacementRecord,
  fetchPlacementStats,
  fetchRecruiters,
  fetchTestimonials,
} from "@/lib/queries";

export const metadata = {
  title: "Placements",
  description:
    "Training & Placement Cell at ABGI, Bhopal — recruiters, industrial training and career support across the pharmaceutical and healthcare sectors.",
};

export const revalidate = 0;

export default async function PlacementsPage() {
  const [placementStats, placementRecord, recruiters, testimonials] =
    await Promise.all([
      fetchPlacementStats(),
      fetchPlacementRecord(),
      fetchRecruiters(),
      fetchTestimonials(),
    ]);
  return (
    <>
      <PageHeaderImage title="Placements & Career Development" />

      <section className="bg-brand-blue text-white">
        <div className="container-page grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
          {placementStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold text-brand-yellow sm:text-2xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/85">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-10 sm:py-12">
        <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-brand-blue">
          Training &amp; Placement Support
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {placementHighlights.map((point) => (
            <li
              key={point}
              className="flex gap-3 rounded-xl border border-brand-blue/10 bg-white p-4 shadow-sm"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm leading-relaxed text-foreground/80">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page py-10 sm:py-12">
        <h2 className="mb-2 font-serif text-3xl font-bold tracking-tight text-brand-blue">
          Placement Record
        </h2>
        <p className="mb-6 text-sm text-foreground/70">
          {/* ponytail: DUMMY figures — replace with verified year-wise data. */}
          Indicative year-wise placement summary.
        </p>
        <div className="overflow-x-auto rounded-xl border border-brand-blue/10">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-brand-blue text-white">
                <th scope="col" className="px-4 py-3 font-semibold">Academic Year</th>
                <th scope="col" className="px-4 py-3 font-semibold">Students Placed</th>
                <th scope="col" className="px-4 py-3 font-semibold">Highest Package</th>
                <th scope="col" className="px-4 py-3 font-semibold">Total Offers</th>
              </tr>
            </thead>
            <tbody>
              {placementRecord.map((r, i) => (
                <tr key={r.year} className={i % 2 === 1 ? "bg-brand-blue/[0.03]" : "bg-white"}>
                  <th scope="row" className="px-4 py-3 font-semibold text-brand-blue">
                    {r.year}
                  </th>
                  <td className="px-4 py-3 text-foreground/80">{r.placed}</td>
                  <td className="px-4 py-3 text-foreground/80">{r.highest}</td>
                  <td className="px-4 py-3 text-foreground/80">{r.offers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-brand-blue/[0.03]">
        <div className="container-page py-10 sm:py-12">
          <h2 className="mb-2 font-serif text-3xl font-bold tracking-tight text-brand-blue">
            Our Recruiters
          </h2>
          <p className="mb-6 text-sm text-foreground/70">
            {/* TODO: confirm and finalise the recruiter list with the placement cell. */}
            Representative recruiters from the pharmaceutical and healthcare sectors.
          </p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {recruiters.map((r) => (
              <li
                key={r.name}
                className="flex h-20 items-center justify-center rounded-xl border border-brand-blue/15 bg-white px-4"
                translate="no"
              >
                {r.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.logo}
                    alt={r.name}
                    className="max-h-10 max-w-[85%] object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-center text-sm font-bold text-brand-blue">
                    {r.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="container-page py-10 sm:py-12">
          <h2 className="mb-5 font-serif text-3xl font-bold tracking-tight text-brand-blue">
            Student Voices
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name + t.detail}
                className="rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm"
              >
                <blockquote className="text-sm leading-relaxed text-foreground/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4 border-t border-brand-blue/10 pt-3">
                  <span className="block font-semibold text-brand-blue">{t.name}</span>
                  <span className="block text-xs text-foreground/60">{t.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
