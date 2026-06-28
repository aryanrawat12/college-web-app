import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "Terms of Use",
};

// ponytail: DUMMY boilerplate terms — have them reviewed/replaced before launch.
export default function TermsPage() {
  return (
    <>
      <PageHeaderImage title="Terms of Use" />
      <ContentSection heading="Terms of Use">
        <p>
          By accessing and using this website, you agree to the following terms.
          If you do not agree, please do not use the site.
        </p>
        <h3 className="font-serif text-xl font-bold text-brand-blue">
          Use of content
        </h3>
        <p>
          All content on this site — text, images, logos and programme
          information — is owned by or licensed to Akhil Bharti Group of
          Institutes and is provided for informational purposes only. Reproduction
          without permission is not allowed.
        </p>
        <h3 className="font-serif text-xl font-bold text-brand-blue">Accuracy</h3>
        <p>
          We aim to keep programme, fee and admission information accurate and
          current, but details are subject to change as per statutory and
          university norms. Please confirm with the admissions office before
          acting on any information.
        </p>
        <h3 className="font-serif text-xl font-bold text-brand-blue">
          External links
        </h3>
        <p>
          This site may link to external portals (payment, student login). We are
          not responsible for the content or practices of third-party sites.
        </p>
        <p className="text-sm text-faint">
          These are placeholder terms and should be reviewed by the institute
          before publication.
        </p>
      </ContentSection>
    </>
  );
}
