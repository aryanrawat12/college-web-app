import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "Mandatory Disclosures",
  description:
    "Public self-disclosure and mandatory documents for ABGI, Bhopal, as required by NCTE and other statutory bodies.",
};

// Key officials. Names/contacts are placeholders — client to fill with real data.
const officials = [
  { sno: 1, designation: "Director / Principal" },
  { sno: 2, designation: "Registrar" },
  { sno: 3, designation: "Dean — Academics" },
  { sno: 4, designation: "Dean — Student Affairs" },
  { sno: 5, designation: "Public Information Officer" },
];

// NCTE / statutory mandatory-disclosure documents to be published.
const documents = [
  "Affiliation Letter (Affiliating University)",
  "NCTE Recognition Order",
  "AICTE Approval Letter",
  "PCI Approval Letter",
  "Faculty List with Qualifications",
  "Fee Structure",
  "Student List (programme-wise)",
  "Land & Building Certificate",
  "Audited Statement of Accounts",
];

export default function MandatoryDisclosuresPage() {
  return (
    <>
      <PageHeaderImage title="Mandatory Disclosures" />

      <ContentSection heading="Public Self-Disclosure">
        <p>
          In compliance with NCTE and other statutory requirements, the following
          documents and information are published as part of the institution&rsquo;s
          mandatory public self-disclosure.
        </p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          {documents.map((doc) => (
            <li key={doc}>
              {doc}{" "}
              <span className="text-sm text-foreground/50">
                {/* TODO: replace with link to the uploaded document */}
                (to be uploaded)
              </span>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection heading="Key Officials">
        <p className="text-sm text-foreground/60">
          {/* TODO: client to provide official names, emails and contact numbers. */}
          Contact details will be updated shortly.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full max-w-3xl border-collapse text-left text-sm sm:text-base">
            <caption className="sr-only">Key officials of the institution</caption>
            <thead>
              <tr className="border-b-2 border-brand-blue bg-brand-blue/5">
                <th scope="col" className="px-4 py-3 font-semibold text-brand-blue">
                  S.No
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-brand-blue">
                  Designation
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-brand-blue">
                  Name &amp; Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {officials.map((row) => (
                <tr
                  key={row.sno}
                  className="border-b border-brand-blue/10 even:bg-brand-blue/[0.02]"
                >
                  <td
                    className="px-4 py-3"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {row.sno}
                  </td>
                  <td className="px-4 py-3">{row.designation}</td>
                  <td className="px-4 py-3 text-foreground/50">To be updated</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>
    </>
  );
}
