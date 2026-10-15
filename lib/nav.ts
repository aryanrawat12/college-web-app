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
    { label: "Policies", href: routes.policies },
  ],
};

export const academicsMenu: NavGroup = {
  label: "Academics",
  items: [
    { label: "All Programmes", href: routes.programmes },
    { label: "Pharmacy", href: routes.pharmacy },
    { label: "Management (MBA)", href: routes.management },
    { label: "Teaching Education (B.Ed & D.El.Ed)", href: routes.teachingEducation },
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

export const studentsMenu: NavGroup = {
  label: "Students",
  items: [
    { label: "Documents (Checklist & Upload)", href: routes.documentsRequired },
    { label: "ID Card Details Form", href: routes.idCard },
    { label: "Anti-Ragging Cell", href: routes.antiRagging },
  ],
};

// Top-level items with no dropdown.
export const careersLink: NavLink = { label: "Careers", href: routes.careers };
export const facultyLink: NavLink = { label: "Faculty", href: routes.faculty };
export const placementsLink: NavLink = { label: "Placements", href: routes.placements };
export const contactLink: NavLink = { label: "Contact", href: routes.contactUs };

// ── Header menu (admin-editable via the `nav_links` table) ──
// The header renders an ordered list of entries: either a direct link or a
// dropdown group. The constants above are the static fallback.

export type NavEntry =
  | { kind: "link"; link: NavLink }
  | { kind: "group"; group: NavGroup };

export const fallbackNav: NavEntry[] = [
  { kind: "group", group: aboutMenu },
  { kind: "group", group: academicsMenu },
  { kind: "link", link: facultyLink },
  { kind: "group", group: admissionsMenu },
  { kind: "group", group: studentsMenu }, // Student Corner page, not the header
  { kind: "link", link: careersLink },
  { kind: "link", link: placementsLink },
  { kind: "group", group: mediaMenu },
  { kind: "link", link: contactLink },
];

// The "Students" dropdown isn't shown in the header: its links are the cards on
// the Student Corner page (/students), reached from the top bar.
export const studentCornerMenu = "Students";

const isStudentCorner = (e: NavEntry) =>
  e.kind === "group" && e.group.label.toLowerCase() === studentCornerMenu.toLowerCase();

/** Entries for the header / mobile menu (everything except Student Corner). */
export const headerNav = (menu: NavEntry[]) => menu.filter((e) => !isStudentCorner(e));

/** Links for the Student Corner page. */
export const studentCornerLinks = (menu: NavEntry[]): NavLink[] => {
  const group = menu.find(isStudentCorner);
  return group?.kind === "group" ? group.group.items : studentsMenu.items;
};

export type NavRow = { menu: string | null; label: string; href: string };

/**
 * Turn sorted `nav_links` rows into header entries. Rows with a `menu` are
 * grouped into that dropdown (placed where its first item appears); rows with
 * no `menu` are top-level links. Absolute http(s) URLs open in a new tab.
 */
export function buildNav(rows: NavRow[]): NavEntry[] {
  const entries: NavEntry[] = [];
  const groups = new Map<string, NavGroup>();
  for (const r of rows) {
    const link: NavLink = {
      label: r.label,
      href: r.href,
      external: /^https?:\/\//i.test(r.href),
    };
    const menu = r.menu?.trim();
    if (!menu) {
      entries.push({ kind: "link", link });
      continue;
    }
    let group = groups.get(menu);
    if (!group) {
      group = { label: menu, items: [] };
      groups.set(menu, group);
      entries.push({ kind: "group", group });
    }
    group.items.push(link);
  }
  return entries;
}
