import { routes, siteConfig } from "@/lib/site";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  items: NavLink[];
};

// Top-level menu groups (dropdowns). Direct links are listed separately below.
export const aboutMenu: NavGroup = {
  label: "About",
  items: [
    { label: "About Us", href: routes.about },
    { label: "Leadership", href: routes.leadership },
    { label: "Approvals & Accreditation", href: routes.approvals },
    { label: "Alumni", href: routes.alumni },
    { label: "FAQs", href: routes.faq },
    { label: "Mandatory Disclosures", href: routes.mandatoryDisclosures },
  ],
};

export const academicsMenu: NavGroup = {
  label: "Academics",
  items: [
    { label: "All Programmes", href: routes.programmes },
    { label: "Pharmacy", href: routes.pharmacy },
    { label: "Management (MBA)", href: routes.management },
    { label: "Teaching Education (B.Ed & D.El.Ed)", href: routes.teachingEducation },
    { label: "Faculty", href: routes.faculty },
  ],
};

export const admissionsMenu: NavGroup = {
  label: "Admissions",
  items: [
    { label: "How to Apply", href: routes.admissions },
    { label: "Apply Online", href: routes.apply },
    { label: "Enquire Now", href: routes.enquiry },
    { label: "Download Prospectus", href: siteConfig.prospectusUrl, external: true },
  ],
};

export const mediaMenu: NavGroup = {
  label: "Media",
  items: [
    { label: "Campus Events", href: routes.campusLife },
    { label: "Gallery", href: routes.gallery },
    { label: "Notices & Announcements", href: routes.notices },
    { label: "Choupal (Grievance)", href: routes.choupal },
  ],
};

// Top-level items with no dropdown.
export const placementsLink: NavLink = { label: "Placements", href: routes.placements };
export const contactLink: NavLink = { label: "Contact", href: routes.contactUs };

export const menuGroups: NavGroup[] = [aboutMenu, academicsMenu, admissionsMenu, mediaMenu];
