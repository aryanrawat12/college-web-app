import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "Privacy Policy",
};

// ponytail: DUMMY boilerplate policy — have it reviewed/replaced before launch.
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeaderImage title="Privacy Policy" />
      <ContentSection heading="Privacy Policy">
        <p>
          Akhil Bharti Group of Institutes (&ldquo;ABGI&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) respects your privacy. This policy explains what
          information we collect through this website and how we use it.
        </p>
        <h3 className="font-serif text-xl font-bold text-brand-blue">
          Information we collect
        </h3>
        <p>
          When you submit an enquiry, application or grievance form, we collect
          the details you provide — such as your name, email, phone number, city,
          state and programme of interest — solely to respond to your request.
        </p>
        <h3 className="font-serif text-xl font-bold text-brand-blue">
          How we use it
        </h3>
        <p>
          We use your information to process admissions enquiries, share
          programme and admission information, and improve our services. We do not
          sell your personal data to third parties.
        </p>
        <h3 className="font-serif text-xl font-bold text-brand-blue">
          Cookies &amp; analytics
        </h3>
        <p>
          This site may use cookies and basic analytics to understand usage and
          improve the experience. You can disable cookies in your browser
          settings.
        </p>
        <h3 className="font-serif text-xl font-bold text-brand-blue">Contact</h3>
        <p>
          For any privacy-related queries, contact us via the details on our
          Contact page.
        </p>
        <p className="text-sm text-faint">
          This is a placeholder policy and should be reviewed by the institute
          before publication.
        </p>
      </ContentSection>
    </>
  );
}
