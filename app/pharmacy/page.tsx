import SectionInfrastructure from "@/components/department/SectionInfrastructure";
import SectionObjectives from "@/components/department/SectionObjectives";
import SectionOverview from "@/components/department/SectionOverview";
import SectionProgrammes from "@/components/department/SectionProgrammes";
import DepartmentSubheading from "@/components/department/DepartmentSubheading";
import HeroCarousel from "@/components/shared/HeroCarousel";
import TextMarquee from "@/components/shared/TextMarquee";

export const metadata = {
  title: "Pharmacy | ABGI",
};

export default function PharmacyPage() {
  return (
    <>
      <HeroCarousel />
      <TextMarquee text="AKHIL BHARTI COLLEGE OF PHARMACY, Approved by AICTE & PCI, Affiliated to RGPV BHOPAL" />

      <SectionOverview>
        <p>
          The Faculty of Pharmacy is dedicated to nurturing competent pharmacy
          professionals through excellence in pharmaceutical education, research,
          and healthcare services. The Faculty focuses on developing skilled
          pharmacists, researchers, clinical practitioners, and entrepreneurs who
          contribute meaningfully to the pharmaceutical industry and patient care
          systems.
        </p>
        <p>
          With state-of-the-art infrastructure, experienced faculty members,
          research-driven pedagogy, and industry-aligned curriculum, the Faculty
          ensures holistic professional development, ethical pharmaceutical
          practice, and global competency.
        </p>
        <p>
          The academic environment integrates classroom learning, laboratory
          experimentation, hospital exposure, research projects, industrial
          training, and community outreach to prepare students for dynamic roles
          in healthcare and pharmaceutical sectors.
        </p>
        <DepartmentSubheading>Vision</DepartmentSubheading>
        <p>
          To emerge as a Centre of Excellence in pharmaceutical education,
          research, and healthcare innovation by producing globally competent,
          ethically responsible, and socially committed pharmacy professionals.
        </p>
        <DepartmentSubheading>Mission</DepartmentSubheading>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            To provide high-quality pharmaceutical education through modern
            teaching-learning methodologies and practical training.
          </li>
          <li>
            To promote advanced research in pharmaceutical sciences, drug
            development, and clinical pharmacy.
          </li>
          <li>
            To develop professional skills, entrepreneurship, and innovation
            among students.
          </li>
          <li>
            To establish strong collaborations with pharmaceutical industries,
            hospitals, and research organizations.
          </li>
          <li>
            To promote ethical values and social responsibility in pharmaceutical
            practice.
          </li>
        </ul>
      </SectionOverview>

      <SectionObjectives>
        <p>The Faculty of Pharmacy aims to:</p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            Provide strong theoretical and practical foundations in pharmaceutical
            sciences.
          </li>
          <li>
            Develop competency in drug formulation, analysis, and therapeutic
            management.
          </li>
          <li>Encourage research, innovation, and scientific inquiry.</li>
          <li>Enhance employability skills and professional ethics.</li>
          <li>
            Promote entrepreneurship in pharmaceutical and healthcare sectors.
          </li>
          <li>
            Facilitate industry exposure and real-world pharmaceutical training.
          </li>
          <li>
            Encourage participation in academic, research, and professional forums.
          </li>
        </ul>
      </SectionObjectives>

      <SectionProgrammes heading="Progreamme Offered">
        <p>
          The Faculty offers comprehensive academic programmes designed to ensure
          professional excellence and industry readiness:
        </p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>Diploma in Pharmacy (D.Pharm) — Diploma Programme</li>
          <li>Bachelor of Pharmacy (B.Pharm) — Undergraduate Programme</li>
          <li>
            Master of Pharmacy (M.Pharm in Pharmaceutics) — Postgraduate Programme
          </li>
        </ul>
      </SectionProgrammes>

      <SectionInfrastructure>
        <DepartmentSubheading>
          Classrooms &amp; Smart Learning Facilities
        </DepartmentSubheading>
        <p>The Faculty provides modern classrooms equipped with:</p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>Smart boards and digital teaching aids</li>
          <li>LCD projectors and audio-visual systems</li>
          <li>High-speed internet connectivity</li>
          <li>Interactive learning platforms</li>
          <li>Seminar and conference halls</li>
        </ul>
        <p>
          These facilities promote collaborative learning and technology-enabled
          education.
        </p>

        <DepartmentSubheading>Library &amp; Learning Resources</DepartmentSubheading>
        <p>The Faculty is supported by a well-established library providing:</p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>Extensive collection of pharmaceutical textbooks</li>
          <li>National and international journals</li>
          <li>Research publications and thesis repository</li>
          <li>Digital library with e-books and e-journals</li>
          <li>Access to scientific databases and research portals</li>
        </ul>
        <p>
          The library fosters research, academic excellence, and competitive exam
          preparation.
        </p>
      </SectionInfrastructure>
    </>
  );
}
