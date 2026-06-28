import Link from "next/link";
import { routes, siteConfig } from "@/lib/site";

export default function DepartmentCTA({ programmeName }: { programmeName: string }) {
  return (
    <section className="bg-brand-blue text-white">
      <div className="container-page flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-base font-medium sm:text-lg">
          Interested in {programmeName}? Talk to our admissions team.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={routes.enquiry}
            className="rounded-md bg-brand-yellow px-5 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Enquire Now
          </Link>
          <Link
            href={routes.faculty}
            className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View Faculty
          </Link>
          <a
            href={siteConfig.prospectusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Download Prospectus
          </a>
        </div>
      </div>
    </section>
  );
}
