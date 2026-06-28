import Link from "next/link";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchAccreditations } from "@/lib/queries";
import { routes } from "@/lib/site";

export const revalidate = 0;

export const metadata = {
  title: "Approvals & Accreditation",
  description:
    "Approvals and accreditations of ABGI, Bhopal — AICTE, PCI, RGPV affiliation and NCTE recognition.",
};

const notes: Record<string, string> = {
  AICTE: "Technical and pharmacy programmes approved by AICTE.",
  PCI: "Pharmacy programmes approved by the Pharmacy Council of India.",
  RGPV: "Degree programmes affiliated to RGPV, Bhopal.",
  NCTE: "Teacher education programmes recognised by NCTE.",
};

export default async function ApprovalsPage() {
  const accreditations = await fetchAccreditations();
  return (
    <>
      <PageHeaderImage title="Approvals & Accreditation" />

      <section className="container-page py-10 sm:py-12">
        <p className="max-w-3xl text-base leading-relaxed text-foreground/85 sm:text-lg">
          Akhil Bharti Group of Institutes runs programmes approved and recognised by
          the relevant statutory bodies. Official approval letters and recognition
          orders are available on request and on the{" "}
          <Link
            href={routes.mandatoryDisclosures}
            className="font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-yellow"
          >
            Mandatory Disclosures
          </Link>{" "}
          page.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {accreditations.map((a) => (
            <div
              key={a.abbr}
              className="rounded-xl border border-brand-blue/10 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className="rounded-md bg-brand-blue px-3 py-1 text-sm font-bold text-white"
                  translate="no"
                >
                  {a.abbr}
                </span>
                <h2 className="text-base font-semibold text-brand-blue">{a.name}</h2>
              </div>
              <p className="mt-3 text-sm text-foreground/80">
                {notes[a.abbr] ?? "Recognised by the respective statutory body."}
              </p>
              {/* ponytail: regNo + certificate are DUMMY placeholders */}
              <dl className="mt-3 text-sm">
                <dt className="font-semibold text-brand-blue">Reference No.</dt>
                <dd className="text-foreground/70" translate="no">
                  {a.regNo}
                </dd>
              </dl>
              <a
                href={a.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue underline-offset-2 hover:text-brand-yellow hover:underline"
              >
                View certificate (PDF) →
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
