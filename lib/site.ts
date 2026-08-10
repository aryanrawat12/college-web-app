export const siteConfig = {
  name: "ABGI",
  logo: "/logos/abgi-logo.png",
  loginUrl:
    process.env.NEXT_PUBLIC_LOGIN_URL ?? "https://example.com/login",
  paymentUrl:
    process.env.NEXT_PUBLIC_PAYMENT_URL ?? "https://example.com/payment",
  linkedinCompanyUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/company/gitlab-com/",
} as const;

export const routes = {
  home: "/",
  contactUs: "/contact-us",
  enquiry: "/enquiry",
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
  newsTracker: "/news-tracker",
} as const;
