export const welcomeMarqueeText =
  "WELCOME TO AKHIL BHARTI GROUP OF INSTITUTES, Approved by AICTE, Affiliated to RGPV BHOPAL";

// Short headlines for the top utility-bar ticker.
export const tickerNotices = [
  "Admissions Open 2026–27 · Last date to apply: 31 August 2026",
  "Admissions open 2026–27 — D.Pharm · B.Pharm · M.Pharm · MBA · B.Ed · D.El.Ed",
  "Approved by AICTE & PCI · Affiliated to RGPV Bhopal",
  "Counselling helpline open Mon–Sat, 10 AM – 5 PM",
];

export const announcements = [
  "Admissions open for D.Pharm, B.Pharm, and M.Pharm programmes for the 2026–27 academic session.",
  "Orientation week for new students begins on 15 July — report to your department office.",
  "Guest lecture on pharmaceutical regulatory affairs scheduled this Friday in Seminar Hall A.",
  "Sports trials for inter-college cricket and volleyball teams will be held next Monday.",
  "Library extended hours during examination season: open until 9 PM on weekdays.",
];

export const notices = [
  "Examination timetable for odd semester published on the student notice board.",
  "Fee payment deadline for enrolled students is 30 June without late fine.",
  "Industrial training forms for B.Pharm final year must be submitted by 10 July.",
  "Holiday notice: institute closed on 15 August for Independence Day celebrations.",
  "Scholarship application forms available at the accounts office until 25 June.",
];

export const eventImages = [
  "/events/event-1.jpg",
  "/events/event-2.jpg",
  "/events/event-3.jpg",
];

// Approvals & accreditations. `logo` points to the official emblem in
// /public/accreditations (sourced from Wikipedia). DTE-MP has no bundled logo.
// ponytail: `regNo`/`certificate` are DUMMY placeholders — replace with the
// real approval/recognition numbers and official PDF links.
export const accreditations = [
  {
    abbr: "AICTE",
    name: "All India Council for Technical Education",
    logo: "/accreditations/aicte.jpg",
    regNo: "F.No. 06/01/MP/2010/XXXX",
    certificate: "/docs/aicte-approval.pdf",
  },
  {
    abbr: "PCI",
    name: "Pharmacy Council of India",
    logo: "/accreditations/pci.png",
    regNo: "PCI Reg. No. 50-XXXX/2011",
    certificate: "/docs/pci-approval.pdf",
  },
  {
    abbr: "RGPV",
    name: "Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal",
    logo: "/accreditations/rgpv.png",
    regNo: "Affiliation Order No. RGPV/XXXX",
    certificate: "/docs/rgpv-affiliation.pdf",
  },
  {
    abbr: "NCTE",
    name: "National Council for Teacher Education",
    logo: "/accreditations/ncte.svg",
    regNo: "NCTE/WRC/XXXX/2012",
    certificate: "/docs/ncte-recognition.pdf",
  },
  {
    abbr: "DTE-MP",
    name: "Directorate of Technical Education, Madhya Pradesh",
    logo: null,
    regNo: "DTE-MP/XXXX",
    certificate: "/docs/dte-mp.pdf",
  },
];

// Headline stats. ponytail: `Estd.` year and student strength are DUMMY —
// confirm with client before publishing.
export const heroStats = [
  { value: "2010", label: "Established" },
  { value: "2,500+", label: "Students" },
  { value: "6", label: "Programmes" },
  { value: "15+", label: "Years of Excellence" },
];

export const whyChooseUs = [
  {
    title: "Experienced Faculty",
    body: "Qualified, research-active teachers mentoring students across pharmacy, management and education.",
  },
  {
    title: "Modern Labs & Smart Classrooms",
    body: "Well-equipped laboratories, digital classrooms and a reference library for hands-on learning.",
  },
  {
    title: "Industry & Hospital Training",
    body: "Industrial training, hospital exposure and field practice aligned to each programme.",
  },
  {
    title: "Placement Support",
    body: "Training & placement cell supporting students with skilling, drives and career guidance.",
  },
  {
    title: "Recognised & Affiliated",
    body: "Programmes approved by AICTE & PCI and affiliated to RGPV, Bhopal.",
  },
  {
    title: "Scholarships",
    body: "Government and merit scholarship guidance for eligible students.",
  },
];

export const facilities = [
  { title: "Central Library", body: "Books, journals, e-resources and a quiet reading hall." },
  { title: "Laboratories", body: "Subject-specific labs with modern instruments and equipment." },
  { title: "Digital Classrooms", body: "Smart boards, projectors and audio-visual learning aids." },
  { title: "Sports & Recreation", body: "Indoor and outdoor sports facilities for student wellbeing." },
  { title: "Hostel", body: "Separate, secure residential facilities for outstation students." },
  { title: "Cafeteria", body: "Hygienic canteen serving affordable meals on campus." },
];

// Short message for the homepage leadership block.
// ponytail: DUMMY name — replace with the actual Chairman/Principal name, message, photo.
export const leadershipSnippet = {
  name: "Dr. Rakesh Sharma",
  role: "Chairman, Akhil Bharti Group of Institutes",
  message:
    "At ABGI we are committed to nurturing competent, ethical professionals through quality education, modern infrastructure and strong industry connect. Our endeavour is to help every student build a career and a character that serves society.",
  image: "/leaders/chairman.jpg",
};

// The three institutes/departments, shown in the nav mega-menu and the homepage
// "Our Institutes" grid. Colours map to the brand palette (navy + warm gold).
export const navSchools = [
  {
    initials: "PH",
    name: "Institute of Pharmacy",
    short: "Akhil Bharti College of Pharmacy",
    desc: "Pharmaceutical education with modern labs, hospital training and a path to industry, research and practice.",
    programs: "D.Pharm · B.Pharm · M.Pharm",
    accred: "PCI Approved",
    image: "/dept/pharmacy-dept.jpg",
    href: "/pharmacy",
  },
  {
    initials: "MG",
    name: "Institute of Management",
    short: "Akhil Bharti Institute of Management",
    desc: "Industry-aligned MBA with case studies, live projects and placement support across finance, marketing and HR.",
    programs: "MBA",
    accred: "AICTE Approved",
    image: "/dept/management-dept.jpg",
    href: "/management",
  },
  {
    initials: "ED",
    name: "Institute of Education",
    short: "Akhil Bharti College of Education",
    desc: "Teacher training built on pedagogy and supervised practice, preparing confident educators for every classroom.",
    programs: "D.El.Ed · B.Ed",
    accred: "NCTE Recognised",
    image: "/dept/education-dept.jpg",
    href: "/teaching-education",
  },
] as const;

export const departmentCourses = [
  {
    title: "Pharmacy",
    programmes: "D. Pharm, B. Pharm, M. Pharm (Pharmaceutics)",
    image: "/dept/pharmacy-dept.jpg",
    href: "/pharmacy",
  },
  {
    title: "Management",
    programmes: "MBA",
    image: "/dept/management-dept.jpg",
    href: "/management",
  },
  {
    title: "Teaching Education",
    programmes: "D.El.Ed and B.Ed",
    image: "/dept/education-dept.jpg",
    href: "/teaching-education",
  },
] as const;
