// Placement content. Recruiter names from the client's reference sites (pharma sector).
// ponytail: numeric figures below are DUMMY placeholders — replace with verified
// data before publishing (client to confirm recruiters, placement %, packages).

// Logos sourced from Wikipedia → /public/recruiters. Anglo-French Drugs has no
// bundled logo (text fallback).
export const recruiters: { name: string; logo: string | null }[] = [
  { name: "Cipla", logo: "/recruiters/cipla.png" },
  { name: "Sun Pharma", logo: "/recruiters/sun-pharma.png" },
  { name: "Aurobindo Pharma", logo: "/recruiters/aurobindo.png" },
  { name: "Biocon", logo: "/recruiters/biocon.png" },
  { name: "Dr. Reddy's", logo: "/recruiters/dr-reddys.png" },
  { name: "Divi's Laboratories", logo: "/recruiters/divis.png" },
  { name: "Anglo-French Drugs", logo: null },
  { name: "Mankind Pharma", logo: "/recruiters/mankind.png" },
];

// DUMMY headline stats — replace with verified figures.
export const placementStats = [
  { value: "85%", label: "Students Placed (2024–25)" },
  { value: "120+", label: "Recruiting Partners" },
  { value: "₹6.5 LPA", label: "Highest Package" },
  { value: "₹3.2 LPA", label: "Average Package" },
];

// DUMMY year-wise placement record — replace with verified figures.
export const placementRecord = [
  { year: "2024–25", placed: "85%", highest: "₹6.5 LPA", offers: 142 },
  { year: "2023–24", placed: "82%", highest: "₹6.0 LPA", offers: 128 },
  { year: "2022–23", placed: "78%", highest: "₹5.4 LPA", offers: 115 },
  { year: "2021–22", placed: "74%", highest: "₹4.8 LPA", offers: 98 },
];

export const placementHighlights = [
  "Pre-placement training: aptitude, communication and interview skills.",
  "Campus and off-campus recruitment drives with pharma and healthcare employers.",
  "Industrial training and internships integrated into the curriculum.",
  "Career counselling and guidance for higher studies (GPAT, NIPER, MBA, B.Ed routes).",
];
