import ContactAccordion from "@/components/contact/ContactAccordion";
import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchFaqs } from "@/lib/queries";

export const metadata = {
  title: "FAQs",
};

export const revalidate = 0;

export default async function FaqPage() {
  const faqs = await fetchFaqs();
  const items = faqs.map((f) => ({ heading: f.q, content: <p>{f.a}</p> }));

  return (
    <>
      <PageHeaderImage title="Frequently Asked Questions" />
      <ContentSection heading="Your questions, answered">
        <p>
          Common questions about admissions, programmes, fees and campus life at
          Akhil Bharti Group of Institutes. Can&rsquo;t find what you need? Reach
          out via the contact page or our admissions helpline.
        </p>
        <ContactAccordion items={items} />
      </ContentSection>
    </>
  );
}
