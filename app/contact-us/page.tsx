import ContactAccordion from "@/components/contact/ContactAccordion";
import ContactMap from "@/components/contact/ContactMap";
import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchContactInfo } from "@/lib/queries";

export const metadata = {
  title: "Contact Us",
};

export const revalidate = 0;

const linkClass =
  "text-brand-blue underline-offset-2 hover:text-brand-yellow hover:underline";

// Contact details come from admin Site Settings (helpline, emails, address,
// map), so edits there show up here too.
export default async function ContactUsPage() {
  const { helpline, emails, address, mapsQuery } = await fetchContactInfo();
  const phone = helpline ? (
    <p>
      Contact no. —{" "}
      <a href={`tel:${helpline.replace(/\s/g, "")}`} className={linkClass}>
        {helpline}
      </a>
    </p>
  ) : null;

  const contactItems = [
    { heading: "Admin", content: phone },
    {
      heading: "Admission",
      content: (
        <div className="space-y-1">
          {phone}
          {emails.length > 0 && (
            <>
              <p>Email —</p>
              <ul className="space-y-0.5">
                {emails.map((email) => (
                  <li key={email}>
                    <a href={`mailto:${email}`} className={linkClass}>
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ),
    },
    { heading: "Academic Division", content: phone },
    { heading: "Accounts Division", content: phone },
    { heading: "Address", content: address ? <p>{address}</p> : null },
  ].filter((item) => item.content);

  return (
    <>
      <PageHeaderImage title="Contact Us" />

      <ContentSection heading="Contacts">
        <ContactAccordion items={contactItems} />
      </ContentSection>

      <ContactMap query={mapsQuery} />
    </>
  );
}
