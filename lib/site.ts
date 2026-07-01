// Portal/admin login → the built-in /admin panel (override via env for an external ERP).
const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL ?? "/admin";

export const siteConfig = {
  name: "ABGI",
  fullName: "Akhil Bharti Group of Institutes",
  city: "Bhopal",
  logo: "/logos/abgi-logo.png",
  helpline: process.env.NEXT_PUBLIC_HELPLINE ?? "+91 94250 79644",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "919425079644", // digits only, intl format
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@abcollegebpl.com", // primary
  emails: [
    "abcollegebpl@gmail.com",
    "abcollegebplpharmacy@gmail.com",
    "info@abcollegebpl.com",
  ],
  loginUrl,
  studentLoginUrl: process.env.NEXT_PUBLIC_STUDENT_LOGIN_URL ?? loginUrl,
  facultyLoginUrl: process.env.NEXT_PUBLIC_FACULTY_LOGIN_URL ?? loginUrl,
  paymentUrl:
    process.env.NEXT_PUBLIC_PAYMENT_URL ?? "https://example.com/payment",
  prospectusUrl: process.env.NEXT_PUBLIC_PROSPECTUS_URL ?? "/docs/prospectus.pdf", // ponytail: dummy PDF, swap for real prospectus
  mapsUrl: "https://maps.app.goo.gl/wBSwuDkyxQnJ3ntCA",
  mapsCoords: "23.1719044,77.2885169", // Akhil Bharti College, Bhopal
  mapsQuery: "Akhil Bharti College, Bhopal", // named marker for map embeds
  linkedinCompanyUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/akhil-bharti-college-of-pharmacy-bhopal-37b937208",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
    "https://www.instagram.com/akhilbharticollege",
  youtubeUrl:
    process.env.NEXT_PUBLIC_YOUTUBE_URL ??
    "https://youtube.com/@akhilbharticollegebhopal7700",
} as const;

export const routes = {
  home: "/",
  contactUs: "/contact-us",
  enquiry: "/enquiry",
  admissions: "/admissions",
  placements: "/placements",
  gallery: "/gallery",
  about: "/about",
  leadership: "/leadership",
  approvals: "/approvals",
  mandatoryDisclosures: "/mandatory-disclosures",
  pharmacy: "/pharmacy",
  management: "/management",
  teachingEducation: "/teaching-education",
  faculty: "/faculty",
  campusLife: "/campus-events",
  choupal: "/choupal",
  apply: "/apply",
  faq: "/faq",
  alumni: "/alumni",
  notices: "/notices",
  privacy: "/privacy-policy",
  terms: "/terms",
  programmes: "/programmes",
  payment: "/payment",
} as const;
