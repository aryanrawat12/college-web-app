export type Department = "Pharmacy" | "Management" | "Education";

export const departments: Department[] = [
  "Pharmacy",
  "Management",
  "Education",
];

export const programmesByDepartment: Record<Department, string[]> = {
  Pharmacy: [
    "Diploma in Pharmacy (D.Pharm)",
    "Bachelor of Pharmacy (B.Pharm)",
    "Master of Pharmacy (M.Pharm in Pharmaceutics)",
  ],
  Management: ["Master of Business Administration (MBA)"],
  Education: [
    "Diploma in Education (D.El.Ed)",
    "Bachelor of Education (B.Ed)",
  ],
};

export function isDepartment(value: string): value is Department {
  return departments.includes(value as Department);
}

export function getAllProgrammes(): string[] {
  return Object.values(programmesByDepartment).flat();
}

export const academicYears = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
] as const;
