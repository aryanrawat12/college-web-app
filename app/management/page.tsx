import CourseDetailTable from "@/components/department/CourseDetailTable";
import DepartmentCTA from "@/components/department/DepartmentCTA";
import SectionInfrastructure from "@/components/department/SectionInfrastructure";
import SectionObjectives from "@/components/department/SectionObjectives";
import SectionOverview from "@/components/department/SectionOverview";
import SectionProgrammes from "@/components/department/SectionProgrammes";
import DepartmentSubheading from "@/components/department/DepartmentSubheading";
import HeroCarousel from "@/components/shared/HeroCarousel";
import TextMarquee from "@/components/shared/TextMarquee";

export const metadata = {
  title: "Management",
};

export default function ManagementPage() {
  return (
    <>
      <HeroCarousel />
      <TextMarquee text="AKHIL BHARTI COLLEGE OF MANAGEMENT, Approved by AICTE & DTE, Affiliated to BU BHOPAL" />

      <SectionOverview>
        <p>
          The Faculty of Commerce and Management is committed to developing
          competent professionals, ethical leaders, and innovative entrepreneurs
          through quality education, research-oriented learning, and industry
          integration.
        </p>
        <p>The Faculty comprises two core departments:</p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            <strong>Department of Commerce</strong> — Focused on accounting,
            finance, taxation, auditing, banking, economics, and corporate
            governance.
          </li>
          <li>
            <strong>Department of Management</strong> — Dedicated to developing
            managerial competence, leadership skills, strategic thinking, and
            entrepreneurial capabilities.
          </li>
        </ul>
        <p>
          With experienced faculty members, modern teaching methodologies, and
          industry-aligned curriculum, the Faculty prepares students to meet the
          challenges of dynamic national and global business environments. Emphasis
          is placed on experiential learning through case studies, internships,
          live projects, research activities, and corporate interaction.
        </p>
      </SectionOverview>

      <SectionObjectives>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            To provide comprehensive education in commerce and management
            disciplines.
          </li>
          <li>
            To develop analytical, financial, and strategic decision-making skills.
          </li>
          <li>To nurture leadership qualities and entrepreneurial mindset.</li>
          <li>To integrate academic knowledge with industry exposure.</li>
          <li>To promote research, innovation, and consultancy activities.</li>
          <li>To inculcate professional ethics and social responsibility.</li>
        </ul>
      </SectionObjectives>

      <SectionProgrammes>
        <p>
          The Faculty offers comprehensive academic programmes designed to ensure
          professional excellence and industry readiness:
        </p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>Master of Business Administration (MBA)</li>
        </ul>
      </SectionProgrammes>

      <CourseDetailTable dept="management" />

      <SectionInfrastructure>
        <DepartmentSubheading>
          Classrooms &amp; Smart Learning Facilities
        </DepartmentSubheading>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>Smart classrooms with audio-visual teaching aids</li>
          <li>Wi-Fi enabled campus</li>
          <li>Seminar halls and conference rooms</li>
          <li>Group discussion and presentation rooms</li>
          <li>Digital learning resources and case-study platforms</li>
        </ul>

        <DepartmentSubheading>Laboratories &amp; Academic Facilities</DepartmentSubheading>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>Business Simulation Laboratory</li>
          <li>Computer &amp; Business Analytics Lab</li>
          <li>Entrepreneurship &amp; Innovation Lab</li>
          <li>Communication &amp; Personality Development Lab</li>
          <li>Research &amp; Data Analysis Support Facilities</li>
        </ul>
        <p>
          These facilities ensure hands-on learning, practical exposure, and
          research-oriented academic engagement.
        </p>
      </SectionInfrastructure>

      <DepartmentCTA programmeName="our MBA programme" />
    </>
  );
}
