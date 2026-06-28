// Per-department course detail. Eligibility/duration/intake taken from the client's
// reference pharmacy sites where applicable; "TODO" marks figures the client must confirm.
// Editing this file changes the Courses Detail tables on each department page.

export type CourseRow = {
  programme: string;
  level: string;
  eligibility: string;
  duration: string;
  intake: string;
  careers: string;
  // ponytail: placeholder copy + lorem image until client supplies real ones.
  description: string;
  fees: string;
  mode: string;
  image: string; // topical lorem placeholder (loremflickr); swap for real photo later
};

export type DepartmentContent = {
  accreditation: string[];
  courses: CourseRow[];
};

export const departmentContent: Record<
  "pharmacy" | "management" | "education",
  DepartmentContent
> = {
  pharmacy: {
    accreditation: ["AICTE", "PCI", "RGPV Bhopal"],
    courses: [
      {
        programme: "Diploma in Pharmacy (D.Pharm)",
        level: "Diploma",
        eligibility: "10+2 with Physics, Chemistry & Biology/Maths (merit basis)",
        duration: "2 Years",
        intake: "60 Seats",
        careers: "Community/hospital pharmacist, pharmacy assistant",
        description:
          "A foundation diploma covering pharmaceutics, pharmacology and dispensing practice, with hands-on lab and hospital training that qualifies graduates to register and practice as pharmacists.",
        fees: "₹85,000 / year",
        mode: "Full-time, on-campus",
        image: "https://loremflickr.com/800/520/pharmacy,pharmacist?lock=11",
      },
      {
        programme: "Bachelor of Pharmacy (B.Pharm)",
        level: "Undergraduate",
        eligibility: "10+2 with Physics, Chemistry & Biology/Maths",
        duration: "4 Years",
        intake: "100 Seats",
        careers: "Industry, regulatory affairs, clinical research, R&D",
        description:
          "A four-year degree spanning medicinal chemistry, pharmaceutical analysis, pharmacology and industrial pharmacy, combining classroom theory with extensive laboratory and industry exposure.",
        fees: "₹95,000 / year",
        mode: "Full-time, on-campus",
        image: "https://loremflickr.com/800/520/laboratory,science?lock=12",
      },
      {
        programme: "Master of Pharmacy (M.Pharm — Pharmaceutics)",
        level: "Postgraduate",
        eligibility: "B.Pharm with valid GPAT/qualifying score",
        duration: "2 Years",
        intake: "18 Seats",
        careers: "Research scientist, academia, formulation development",
        description:
          "An advanced specialisation in formulation development and drug delivery, built around a research dissertation, advanced labs and seminars that prepare graduates for R&D and academic careers.",
        fees: "₹1,10,000 / year",
        mode: "Full-time, on-campus",
        image: "https://loremflickr.com/800/520/laboratory,research?lock=13",
      },
    ],
  },
  management: {
    accreditation: ["AICTE", "RGPV Bhopal"],
    courses: [
      {
        programme: "Master of Business Administration (MBA)",
        level: "Postgraduate",
        eligibility: "Bachelor's degree in any discipline (min. marks as per norms)",
        duration: "2 Years",
        intake: "120 Seats",
        careers: "Marketing, finance, HR, operations, entrepreneurship",
        description:
          "A two-year management degree with specialisations across marketing, finance, HR and operations, blending case studies, live projects and internships to build industry-ready managers and entrepreneurs.",
        fees: "₹90,000 / year",
        mode: "Full-time, on-campus",
        image: "https://loremflickr.com/800/520/business,office?lock=14",
      },
    ],
  },
  education: {
    accreditation: ["NCTE", "Affiliating University"],
    courses: [
      {
        programme: "Diploma in Elementary Education (D.El.Ed)",
        level: "Diploma",
        eligibility: "10+2 (min. marks as per NCTE/state norms)",
        duration: "2 Years",
        intake: "50 Seats",
        careers: "Primary/elementary school teacher",
        description:
          "A practice-oriented diploma in child pedagogy, classroom management and foundational subjects, with supervised school internships that prepare candidates to teach at the primary level.",
        fees: "₹45,000 / year",
        mode: "Full-time, on-campus",
        image: "https://loremflickr.com/800/520/classroom,teaching?lock=15",
      },
      {
        programme: "Bachelor of Education (B.Ed)",
        level: "Undergraduate (Professional)",
        eligibility: "Bachelor's/Master's degree (min. marks as per NCTE norms)",
        duration: "2 Years",
        intake: "100 Seats",
        careers: "Secondary/senior-secondary school teacher",
        description:
          "A professional teacher-training degree covering educational psychology, curriculum design and subject methodology, with extended teaching practice that equips graduates for secondary-school classrooms.",
        fees: "₹55,000 / year",
        mode: "Full-time, on-campus",
        image: "https://loremflickr.com/800/520/school,classroom?lock=16",
      },
    ],
  },
};
