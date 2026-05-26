import FacultyGrid from "@/components/faculty/FacultyGrid";
import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";
import { fetchFaculties } from "@/lib/queries";

export const metadata = {
  title: "Faculty | ABGI",
};

export const revalidate = 0;

export default async function FacultyPage() {
  const members = await fetchFaculties();

  return (
    <>
      <PageHeaderImage title="Faculty @ ABGI" />

      <ContentSection heading="Faculty">
        <FacultyGrid members={members} />
      </ContentSection>
    </>
  );
}
