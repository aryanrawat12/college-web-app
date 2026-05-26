import ContactAccordion from "@/components/contact/ContactAccordion";
import ContactMap from "@/components/contact/ContactMap";
import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "Contact Us | ABGI",
};

const contactItems = [
  {
    heading: "Admin",
    content: <p>Contact no. — 6345-4534-23</p>,
  },
  {
    heading: "Admission",
    content: (
      <div className="space-y-1">
        <p>Contact no. — 6345-4534-23, 8426-5843-84</p>
        <p>
          Email —{" "}
          <a
            href="mailto:admissions@ABGI.com"
            className="text-brand-blue underline-offset-2 hover:text-brand-yellow hover:underline"
          >
            admissions@ABGI.com
          </a>
        </p>
      </div>
    ),
  },
  {
    heading: "Academic Division",
    content: <p>Contact no. — 6345-6598-23</p>,
  },
  {
    heading: "Accounts Division",
    content: <p>Contact no. — 3623-4534-23</p>,
  },
  {
    heading: "Address",
    content: (
      <p>
        ABGI, Ratibad, Main Rd, Bhopal, Madhya Pradesh (462044)
      </p>
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
