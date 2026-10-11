// Documents students must submit at admission (MP admissions + scholarship
// portals). Drives the /documents-required checklist and the upload form.
// `column` = the student_documents column the uploaded file's key goes in.

export type DocumentItem = {
  name: string;
  note?: string;
  column?: DocColumn; // absent → not a file (e.g. email, contact number)
  required?: boolean;
};

export type DocumentGroup = {
  heading: string;
  items: DocumentItem[];
};

export type DocColumn =
  | "doc_10th"
  | "doc_12th"
  | "doc_tc"
  | "doc_migration"
  | "doc_gap"
  | "doc_income"
  | "doc_domicile"
  | "doc_caste"
  | "doc_aadhaar"
  | "doc_samagra"
  | "doc_mp_taas"
  | "doc_otr"
  | "doc_photo";

export const documentGroups: DocumentGroup[] = [
  {
    heading: "Academic records",
    items: [
      { name: "10th Marksheet", column: "doc_10th", required: true },
      { name: "12th Marksheet", column: "doc_12th", required: true },
      { name: "Transfer Certificate (TC)", column: "doc_tc", required: true },
      {
        name: "Migration Certificate",
        note: "Only if required. If your board issues migration online, submit an affidavit instead.",
        column: "doc_migration",
      },
      {
        name: "Gap Certificate",
        note: "Only if there is a gap in your studies (affidavit).",
        column: "doc_gap",
      },
    ],
  },
  {
    heading: "Certificates",
    items: [
      { name: "Income Certificate", column: "doc_income", required: true },
      { name: "Domicile Certificate", column: "doc_domicile", required: true },
      { name: "Caste Certificate", note: "If applicable.", column: "doc_caste" },
    ],
  },
  {
    heading: "Government IDs & portals",
    items: [
      { name: "Aadhaar Card", column: "doc_aadhaar", required: true },
      { name: "Samagra ID", column: "doc_samagra", required: true },
      {
        name: "MP TAAS Registration",
        note: "Tribal Affairs scholarship portal — if applicable.",
        column: "doc_mp_taas",
      },
      {
        name: "OTR (One Time Registration)",
        note: "MP scholarship portal registration — if applicable.",
        column: "doc_otr",
      },
    ],
  },
  {
    heading: "Contact & photo",
    items: [
      { name: "Email Address" },
      { name: "Contact Number" },
      { name: "Passport-size Photograph", column: "doc_photo", required: true },
    ],
  },
];

export const uploadableDocuments = documentGroups
  .flatMap((g) => g.items)
  .filter((d): d is DocumentItem & { column: DocColumn } => Boolean(d.column));
