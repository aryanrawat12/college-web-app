import ContactAccordion from "@/components/contact/ContactAccordion";
import ContactMap from "@/components/contact/ContactMap";
import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "Contact Us",
};

const contactItems = [
  {
    heading: "Admin",
    content: <p>Contact no. — 9425079644</p>,
  },
  {
    heading: "Admission",
    content: (
      <div className="space-y-1">
        <p>Contact no. — 9425079644</p>
        <p>Email —</p>
        <ul className="space-y-0.5">
          {[
            "abcollegebpl@gmail.com",
            "abcollegebplpharmacy@gmail.com",
            "info@abcollegebpl.com",
          ].map((email) => (
            <li key={email}>
              <a
                href={`mailto:${email}`}
                className="text-brand-blue underline-offset-2 hover:text-brand-yellow hover:underline"
              >
                {email}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    heading: "Academic Division",
    content: <p>Contact no. — 9425079644</p>,
  },
  {
    heading: "Accounts Division",
    content: <p>Contact no. — 9425079644</p>,
  },
  {
    heading: "Address",
    content: (
      <p>Village-Kharpa, Ratibad, Bhopal 462044 (M.P.)</p>
    ),
  },
];

export default function ContactUsPage() {
  return (
    <>
      <PageHeaderImage title="Contact Us" />

      <ContentSection heading="Contacts">
        <ContactAccordion items={contactItems} />
      </ContentSection>

      <ContactMap />
    </>
  );
}
