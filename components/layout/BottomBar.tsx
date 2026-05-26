import Link from "next/link";
import { routes } from "@/lib/site";

export default function BottomBar() {
  return (
    <aside className="bg-brand-blue text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="max-w-2xl text-base font-medium sm:text-lg">
          Apply today and take the first step toward your{" "}
          <span className="text-brand-yellow">dream career</span>
        </p>
        <Link
          href={routes.enquiry}
          className="shrink-0 rounded-md bg-brand-yellow px-6 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-yellow-hover"
        >
          Apply Now
        </Link>
      </div>
    </aside>
  );
}
