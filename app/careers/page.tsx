import Link from "next/link";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchJobs } from "@/lib/queries";
import { routes, siteConfig } from "@/lib/site";

export const metadata = {
  title: "Careers",
  description: "Current job openings at Akhil Bharti Group of Institutes, Bhopal.",
};

export const revalidate = 0;

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function CareersPage() {
  const jobs = await fetchJobs();

  return (
    <>
      <PageHeaderImage title="Careers at ABGI" />
      <section className="container-page py-10 sm:py-12">
        <p className="max-w-3xl text-base leading-relaxed text-foreground/85 sm:text-lg">
          Join our team of educators and staff across Pharmacy, Management and
          Teacher Education. Explore current openings below and apply online.
        </p>

        {jobs.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-border-warm-2 bg-surface p-8 text-center">
            <h2 className="font-serif text-xl font-bold text-brand-blue">
              No openings right now
            </h2>
            <p className="mt-2 text-muted">
              Please check back later, or write to us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-blue hover:underline">
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        ) : (
          <ul className="mt-8 grid gap-6 lg:grid-cols-2">
            {jobs.map((job) => {
              const meta = [
                job.department,
                job.location,
                job.employmentType,
              ].filter(Boolean);
              return (
                <li
                  key={job.id}
                  className="flex flex-col rounded-2xl border border-border-warm-2 bg-surface p-6"
                >
                  <h2 className="font-serif text-xl font-bold text-brand-blue">{job.title}</h2>
                  {meta.length > 0 && (
                    <p className="mt-1 text-sm font-medium text-muted">{meta.join(" · ")}</p>
                  )}
                  <dl className="mt-4 space-y-1.5 text-sm">
                    {job.qualification && (
                      <div>
                        <dt className="inline font-semibold text-foreground">Qualification: </dt>
                        <dd className="inline text-foreground/80">{job.qualification}</dd>
                      </div>
                    )}
                    {job.experience && (
                      <div>
                        <dt className="inline font-semibold text-foreground">Experience: </dt>
                        <dd className="inline text-foreground/80">{job.experience}</dd>
                      </div>
                    )}
                    {job.lastDate && (
                      <div>
                        <dt className="inline font-semibold text-foreground">Last date to apply: </dt>
                        <dd className="inline text-foreground/80">{formatDate(job.lastDate)}</dd>
                      </div>
                    )}
                  </dl>
                  {job.description && (
                    <p className="mt-4 whitespace-pre-line text-[14.5px] leading-relaxed text-foreground/85">
                      {job.description}
                    </p>
                  )}
                  <div className="mt-auto pt-6">
                    <Link
                      href={`${routes.careersApply}?job=${job.id}`}
                      className="inline-flex rounded-xl bg-brand-yellow px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-yellow-hover"
                    >
                      Apply Now
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
