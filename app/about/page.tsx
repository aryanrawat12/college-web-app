import ContentSection from "@/components/shared/ContentSection";
import PageHeaderImage from "@/components/shared/PageHeaderImage";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHeaderImage title="About ABGI" />

      <ContentSection heading="About">
        <p className="font-semibold text-brand-blue">
          A Legacy of Educational Innovation Since 1999
        </p>
        <p>
          At IES University, we believe that education is the most powerful tool
          for societal transformation. Established by the Infotech Education
          Society (IES) in 1999 and transitioning into a full-fledged University
          in 2019, we have spent over two decades redefining the academic
          landscape of Central India.
        </p>
        <p>
          Led by visionary educationists Er. B. S. Yadav (Founder Chancellor)
          and Prof. Dr. Sunita Singh (Founder Pro-Chancellor), IES University is
          a premier multidisciplinary institution dedicated to academic
          excellence, sustainability, and student success.
        </p>
        <p>
          From foundational learning to advanced research, IES University offers
          a comprehensive range of Diploma, Undergraduate, Postgraduate, and
          Doctoral (Ph.D.) programs. Our curriculum is designed to meet the
          demands of the modern workforce across various professional domains:
        </p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>Pharmacy</li>
          <li>Management</li>
          <li>Teaching Education</li>
        </ul>
      </ContentSection>

      <ContentSection heading="Vision" className="bg-brand-blue/[0.03]">
        <p>
          To transform lives through education by becoming a leading hub of
          knowledge, innovation, and values; shaping empowered citizens who drive
          social change, foster sustainability, and lead with integrity in a
          global society.
        </p>
      </ContentSection>

      <ContentSection heading="Mission">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            To deliver quality, multidisciplinary, and experiential education
            that nurtures critical thinking, creativity, and professional
            competence.
          </li>
          <li>
            To cultivate a culture of research, innovation, and entrepreneurship
            that addresses societal challenges and advances sustainable
            development.
          </li>
          <li>
            To provide equal opportunities and inclusive learning environments
            for students from diverse backgrounds, empowering them for lifelong
            success.
          </li>
          <li>
            To strengthen global linkages and collaborations that enhance
            academic excellence and cross-cultural understanding.
          </li>
          <li>
            To integrate ethics, human values, and community service into
            academics, developing socially responsible leaders.
          </li>
        </ol>
      </ContentSection>
    </>
  );
}
