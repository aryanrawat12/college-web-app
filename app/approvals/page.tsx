import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "Approvals | ABGI",
};

const approvalItems = [
  "AICTE Approval Letter",
  "Pharmacy Council of India",
  "UGC Approval",
];

export default function ApprovalsPage() {
  return (
    <>
      <PageHeaderImage title="Approvals" />

      <ContentSection heading="Approvals">
        <ul className="list-inside list-disc space-y-2 pl-2">
          {approvalItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ContentSection>
    </>
  );
}
