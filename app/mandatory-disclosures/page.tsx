import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "Mandatory Disclosures | ABGI",
};

const disclosureRows = [
  {
    sno: 1,
    designation: "Director",
    name: "Dr. Rajesh Verma",
    email: "director@abgi.edu.in",
    contact: "+91 98765 43210",
  },
  {
    sno: 2,
    designation: "Registrar",
    name: "Mrs. Priya Sharma",
    email: "registrar@abgi.edu.in",
    contact: "+91 98765 43211",
  },
  {
    sno: 3,
    designation: "Dean - Academics",
    name: "Prof. Amit Kumar",
    email: "dean.academics@abgi.edu.in",
    contact: "+91 98765 43212",
  },
  {
    sno: 4,
    designation: "Dean - Student Affairs",
    name: "Dr. Neha Singh",
    email: "dean.students@abgi.edu.in",
    contact: "+91 98765 43213",
  },
  {
    sno: 5,
    designation: "Public Information Officer",
    name: "Mr. Sanjay Mehta",
    email: "pio@abgi.edu.in",
    contact: "+91 98765 43214",
  },
];

export default function MandatoryDisclosuresPage() {
  return (
    <>
      <PageHeaderImage title="Mandatory Disclosures" />

      <ContentSection heading="Mandatory Disclosures">
        <div className="overflow-x-auto">
          <table className="mx-auto w-full max-w-4xl border-collapse text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b-2 border-brand-blue bg-brand-blue/5">
                <th className="px-4 py-3 font-semibold text-brand-blue">
                  S.No
                </th>
                <th className="px-4 py-3 font-semibold text-brand-blue">
                  Designation
                </th>
                <th className="px-4 py-3 font-semibold text-brand-blue">
                  Name
                </th>
                <th className="px-4 py-3 font-semibold text-brand-blue">
                  Email
                </th>
                <th className="px-4 py-3 font-semibold text-brand-blue">
                  Contact No.
                </th>
              </tr>
            </thead>
            <tbody>
              {disclosureRows.map((row) => (
                <tr
                  key={row.sno}
                  className="border-b border-brand-blue/10 even:bg-brand-blue/[0.02]"
                >
                  <td className="px-4 py-3">{row.sno}</td>
                  <td className="px-4 py-3">{row.designation}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${row.email}`}
                      className="text-brand-blue underline-offset-2 hover:text-brand-yellow hover:underline"
                    >
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>
    </>
  );
}
