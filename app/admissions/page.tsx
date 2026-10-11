import EnquiryForm from "@/components/forms/EnquiryForm";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { programmesByDepartment } from "@/lib/departments";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Admissions",
  description:
    "Admissions 2026–27 at ABGI, Bhopal — how to apply, eligibility, fees, scholarships and important dates for Pharmacy, Management and Teacher Education programmes.",
};

const steps = [
  {
    title: "Enquire / Register",
    body: "Submit the enquiry form below or call our admissions helpline. Our counsellor will reach out to you.",
  },
  {
    title: "Counselling & Eligibility Check",
    body: "Discuss programme options and confirm eligibility based on your qualifying examination.",
  },
  {
    title: "Document Verification",
    body: "Submit mark sheets, ID proof and category certificates (if applicable) for verification.",
  },
  {
    title: "Admission & Fee Payment",
    body: "Confirm your seat by completing admission formalities and fee payment.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHeaderImage title="Admissions 2026–27" />

      <section className="container-page py-10 sm:py-12">
        <h2 className="mb-5 font-serif text-3xl font-bold tracking-tight text-brand-blue">How to Apply</h2>
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-brand-blue/10 bg-white p-5 shadow-sm"
            >
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow font-bold text-brand-blue"
                style={{ fontVariantNumeric: "tabular-nums" }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold text-brand-blue">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-foreground/80">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-brand-blue/[0.03]">
        <div className="container-page grid grid-cols-1 gap-8 py-10 sm:py-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-brand-blue">
              Programmes &amp; Eligibility
            </h2>
            <ul className="space-y-4">
              {Object.entries(programmesByDepartment).map(([dept, programmes]) => (
                <li key={dept}>
                  <h3 className="font-semibold text-brand-blue">{dept}</h3>
                  <ul className="mt-1 list-inside list-disc pl-2 text-sm text-foreground/80">
                    {programmes.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-foreground/70">
              Detailed eligibility and intake for each programme are listed on the
              respective department pages.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-brand-blue">
              Fees, Scholarships &amp; Dates
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="rounded-lg border border-brand-blue/10 bg-white p-4">
                <dt className="font-semibold text-brand-blue">Fee Structure</dt>
                <dd className="text-foreground/80">
                  Programme-wise fee details are available from the admissions office.
                  {/* TODO: publish official fee structure / link to fee PDF */}
                </dd>
              </div>
              <div className="rounded-lg border border-brand-blue/10 bg-white p-4">
                <dt className="font-semibold text-brand-blue">Scholarships</dt>
                <dd className="text-foreground/80">
                  Government post-matric and merit scholarships available for eligible
                  students. Our team will guide you through the process.
                </dd>
              </div>
              <div className="rounded-lg border border-brand-blue/10 bg-white p-4">
                <dt className="font-semibold text-brand-blue">Important Dates</dt>
                <dd className="text-foreground/80">
                  Admissions open for the 2026–27 session.
                  {/* TODO: add counselling / last-date schedule */}
                </dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={siteConfig.prospectusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-brand-blue px-5 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                Download Prospectus
              </a>
              <a
                href={`tel:${siteConfig.helpline.replace(/\s/g, "")}`}
                className="rounded-md border border-brand-blue px-5 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                Call {siteConfig.helpline}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="enquire"
        className="container-page flex items-center justify-center py-10 sm:py-12"
      >
        <EnquiryForm />
      </section>
    </>
  );
}
