import Link from "next/link";
import StudentDocumentsForm from "@/components/forms/StudentDocumentsForm";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { documentGroups } from "@/lib/documents-data";
import { routes } from "@/lib/site";

export const metadata = {
  title: "Documents Required",
  description: "Checklist and online upload of documents required for admission at ABGI, Bhopal.",
};

export default function DocumentsRequiredPage() {
  return (
    <>
      <PageHeaderImage title="Documents Required" />
      <section className="container-page py-10 sm:py-12">
        <p className="max-w-3xl text-base leading-relaxed text-foreground/85 sm:text-lg">
          Upload scanned copies of these documents using the form below, and
          bring the originals with two self-attested photocopies at the time of
          admission. Contact the admissions office if you are unsure about any
          item.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {documentGroups.map((group) => (
            <div
              key={group.heading}
              className="rounded-2xl border border-border-warm-2 bg-surface p-6"
            >
              <h2 className="mb-4 font-serif text-xl font-bold text-brand-blue">
                {group.heading}
              </h2>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.name} className="flex gap-3">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      <span className="font-semibold text-foreground">{item.name}</span>
                      {item.note && (
                        <span className="block text-sm text-muted">{item.note}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div id="upload" className="mx-auto mt-12 max-w-4xl scroll-mt-32">
          <StudentDocumentsForm />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href={routes.apply}
            className="rounded-xl bg-brand-yellow px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-yellow-hover"
          >
            Apply Online
          </Link>
          <Link
            href={routes.contactUs}
            className="rounded-xl border border-brand-blue px-6 py-3 text-sm font-bold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
          >
            Contact Admissions
          </Link>
        </div>
      </section>
    </>
  );
}
