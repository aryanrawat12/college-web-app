import SectionInfrastructure from "@/components/department/SectionInfrastructure";
import SectionObjectives from "@/components/department/SectionObjectives";
import SectionOverview from "@/components/department/SectionOverview";
import SectionProgrammes from "@/components/department/SectionProgrammes";
import DepartmentSubheading from "@/components/department/DepartmentSubheading";
import HeroCarousel from "@/components/shared/HeroCarousel";
import TextMarquee from "@/components/shared/TextMarquee";

export const metadata = {
  title: "Teaching Education | ABGI",
};

export default function TeachingEducationPage() {
  return (
    <>
      <HeroCarousel />
      <TextMarquee text="AKHIL BHARTIYA SHIKSHA AVAM PRASHIKSHAN MAHAVIDALAYA, Affiliated to BU BHOPAL, Recognised by NCTE, with permission from SCERT, Higher Education M.P. Govt. & M.P. Board" />

      <SectionOverview>
        <p>
          The Faculty of Education is committed to preparing competent, ethical,
          innovative, and socially responsible educators through quality teacher
          education, research, and professional training. The faculty emphasizes
          pedagogical excellence, experiential learning, and research-driven
          practices to meet the evolving demands of contemporary education systems.
        </p>
        <p>
          With experienced academicians, modern teaching-learning facilities, and
          strong school-based practical exposure, the Faculty nurtures future
          teachers, academic leaders, curriculum developers, and researchers. All
          programmes are aligned with national education policies and professional
          standards prescribed by regulatory bodies such as University Grants
          Commission (UGC) and National Council for Teacher Education (NCTE).
        </p>
        <DepartmentSubheading>Vision</DepartmentSubheading>
        <p>
          To become a centre of excellence in teacher education by developing
          innovative, research-oriented, and socially responsible educators who
          contribute to quality education and national development.
        </p>
        <DepartmentSubheading>Mission</DepartmentSubheading>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>
            To provide high-quality teacher education through modern pedagogical
            and experiential learning approaches.
          </li>
          <li>
            To promote research, innovation, and academic excellence in education.
          </li>
          <li>
            To develop professional teaching skills, leadership qualities, and
            ethical values among future educators.
          </li>
          <li>
            To strengthen collaboration with schools and educational institutions
            for practical training and field exposure.
          </li>
          <li>
            To foster inclusive, value-based, and learner-centric education
            practices.
          </li>
        </ul>
      </SectionOverview>

      <SectionObjectives>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>To develop competent and reflective teaching professionals.</li>
          <li>To integrate theory with practical teaching experience.</li>
          <li>To promote educational research and innovation.</li>
          <li>
            To cultivate leadership, communication, and classroom management
            skills.
          </li>
          <li>
            To encourage inclusive and technology-integrated teaching practices.
          </li>
          <li>
            To prepare students for competitive examinations and higher academic
            pursuits.
          </li>
        </ul>
      </SectionObjectives>

      <SectionProgrammes>
        <p>
          The Faculty offers comprehensive academic programmes designed to ensure
          professional excellence and industry readiness:
        </p>
        <ul className="list-inside list-disc space-y-2 pl-2">
          <li>Diploma in Education (D.El.Ed) — Diploma Program</li>
          <li>Bachelor of Education (B.Ed) — Undergraduate Program</li>
        </ul>
      </SectionProgrammes>

      <SectionInfrastructure>
        <DepartmentSubheading>
          Classrooms &amp; Smart Learning Facilities
        </DepartmentSubheading>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>Smart classrooms with digital boards and multimedia teaching aids</li>
          <li>Audio-visual systems</li>
          <li>Wi-Fi enabled campus</li>
          <li>Micro-teaching and demonstration rooms</li>
          <li>Seminar halls for academic events</li>
          <li>E-learning platforms and digital content support</li>
        </ul>

        <DepartmentSubheading>Library &amp; Learning Resources</DepartmentSubheading>
        <p>
          The Faculty is supported by a well-equipped Central Library with:
        </p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>
            Extensive collection of books, reference materials, and teaching
            manuals
          </li>
          <li>National and international journals</li>
          <li>E-books and digital databases</li>
          <li>Research theses and project repositories</li>
          <li>Curriculum and teaching-learning resource materials</li>
        </ul>
      </SectionInfrastructure>
    </>
  );
}
