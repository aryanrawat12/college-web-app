import { departmentContent } from "./department-content";

// Flat programme list for the homepage Program Finder, derived from the
// per-department course data so there's a single source of truth. No
// fabricated figures: unknown intake shows "—" and fees are "On request".

export type LevelCategory = "Diploma" | "UG" | "PG";

export type Program = {
  name: string;
  slug: string;
  school: string; // display label / stream filter
  level: LevelCategory;
  levelLabel: string;
  duration: string;
  seats: string;
  fee: string;
  approval: string;
  eligibility: string;
  href: string;
  image: string;
  description: string;
  mode: string;
  careers: string;
};

const schoolMeta: Record<
  keyof typeof departmentContent,
  { label: string; href: string }
> = {
  pharmacy: { label: "Pharmacy", href: "/pharmacy" },
  management: { label: "Management", href: "/management" },
  education: { label: "Education", href: "/teaching-education" },
};

function levelCategory(level: string): LevelCategory {
  if (level.startsWith("Diploma")) return "Diploma";
  if (level.startsWith("Post")) return "PG";
  return "UG";
}

// Slug from the abbreviation in parentheses if present, else the full name.
function slugify(name: string): string {
  const abbr = name.match(/\(([^)]+)\)/)?.[1] ?? name;
  return abbr
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const programs: Program[] = (
  Object.entries(departmentContent) as [
    keyof typeof departmentContent,
    (typeof departmentContent)[keyof typeof departmentContent],
  ][]
).flatMap(([key, content]) =>
  content.courses.map((course) => ({
    name: course.programme,
    slug: slugify(course.programme),
    school: schoolMeta[key].label,
    level: levelCategory(course.level),
    levelLabel:
      levelCategory(course.level) === "UG"
        ? "UG"
        : levelCategory(course.level) === "PG"
          ? "PG"
          : "Diploma",
    duration: course.duration,
    seats: course.intake === "TODO" ? "—" : course.intake,
    fee: course.fees,
    approval: content.accreditation.join(" · "),
    eligibility: course.eligibility,
    href: schoolMeta[key].href,
    image: course.image,
    description: course.description,
    mode: course.mode,
    careers: course.careers,
  })),
);
