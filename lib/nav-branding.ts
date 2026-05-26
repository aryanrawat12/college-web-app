import { routes } from "@/lib/site";

export type NavBrandingLines = [string, string, string];

const homeBranding: NavBrandingLines = [
  "AKHIL BHARTI",
  "GROUP OF INSTITUTES",
  "BHOPAL",
];

const pharmacyBranding: NavBrandingLines = [
  "AKHIL BHARTIYA SHIKSHA AVAM",
  "PRASHIKSHAN MAHAVIDYALAYA",
  "BHOPAL",
];

const managementBranding: NavBrandingLines = [
  "AKHIL BHARTI",
  "COLLEGE OF MANAGEMENT",
  "BHOPAL",
];

export function getNavBranding(pathname: string): NavBrandingLines {
  if (pathname === routes.pharmacy) {
    return pharmacyBranding;
  }
  if (
    pathname === routes.management ||
    pathname === routes.teachingEducation
  ) {
    return managementBranding;
  }
  return homeBranding;
}
