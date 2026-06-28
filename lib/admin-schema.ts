// Config that drives the generic admin CRUD. Each entry maps a DB table to its
// editable fields. `single` tables are one-row settings (id = 1).

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "image"
  | "images"
  | "url";

export type Field = {
  name: string;
  label: string;
  type?: FieldType; // default "text"
};

export type TableConfig = {
  table: string;
  label: string;
  group: "Content" | "People" | "Academics" | "Placements" | "Site" | "Submissions";
  single?: boolean; // single-row (id=1) settings table
  readOnly?: boolean; // submissions — view only
  orderBy?: { column: string; ascending: boolean };
  listFields: string[]; // columns shown in the list view
  fields: Field[];
};

export const adminTables: TableConfig[] = [
  // ── Site ──
  {
    table: "site_settings",
    label: "Site Settings",
    group: "Site",
    single: true,
    listFields: [],
    fields: [
      { name: "helpline", label: "Helpline" },
      { name: "whatsapp", label: "WhatsApp (digits, intl)" },
      { name: "email1", label: "Email 1" },
      { name: "email2", label: "Email 2" },
      { name: "email3", label: "Email 3" },
      { name: "address", label: "Address" },
      { name: "maps_url", label: "Google Maps URL", type: "url" },
      { name: "maps_query", label: "Maps Marker Query" },
      { name: "linkedin_url", label: "LinkedIn URL", type: "url" },
      { name: "instagram_url", label: "Instagram URL", type: "url" },
      { name: "youtube_url", label: "YouTube URL", type: "url" },
      { name: "prospectus_url", label: "Prospectus URL", type: "url" },
      { name: "hero_title", label: "Hero Title" },
      { name: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
    ],
  },
  {
    table: "stats",
    label: "Hero Stats",
    group: "Site",
    orderBy: { column: "sort", ascending: true },
    listFields: ["value", "label"],
    fields: [
      { name: "value", label: "Value" },
      { name: "label", label: "Label" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "accreditations",
    label: "Accreditations",
    group: "Site",
    orderBy: { column: "sort", ascending: true },
    listFields: ["abbr", "name"],
    fields: [
      { name: "abbr", label: "Abbreviation" },
      { name: "name", label: "Full Name" },
      { name: "logo_url", label: "Logo", type: "image" },
      { name: "reg_no", label: "Reference No." },
      { name: "certificate_url", label: "Certificate (PDF/URL)", type: "url" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  // ── Academics ──
  {
    table: "programmes",
    label: "Programmes",
    group: "Academics",
    orderBy: { column: "sort", ascending: true },
    listFields: ["name", "school", "level_label"],
    fields: [
      { name: "slug", label: "Slug (unique)" },
      { name: "name", label: "Name" },
      { name: "school", label: "School (Pharmacy/Management/Education)" },
      { name: "level", label: "Level (Diploma/UG/PG)" },
      { name: "level_label", label: "Level Label" },
      { name: "duration", label: "Duration" },
      { name: "intake", label: "Intake" },
      { name: "fees", label: "Fees" },
      { name: "eligibility", label: "Eligibility", type: "textarea" },
      { name: "careers", label: "Careers", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "mode", label: "Mode" },
      { name: "approval", label: "Approval" },
      { name: "image_url", label: "Image", type: "image" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "faculties",
    label: "Faculty",
    group: "People",
    orderBy: { column: "sort", ascending: true },
    listFields: ["name", "designation"],
    fields: [
      { name: "name", label: "Name" },
      { name: "designation", label: "Designation" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "photo_url", label: "Photo", type: "image" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  // ── People ──
  {
    table: "leadership",
    label: "Leadership Message",
    group: "People",
    single: true,
    listFields: [],
    fields: [
      { name: "name", label: "Name" },
      { name: "role", label: "Role" },
      { name: "message", label: "Message", type: "textarea" },
      { name: "image_url", label: "Photo", type: "image" },
    ],
  },
  {
    table: "testimonials",
    label: "Testimonials",
    group: "People",
    orderBy: { column: "sort", ascending: true },
    listFields: ["name", "detail"],
    fields: [
      { name: "name", label: "Name" },
      { name: "detail", label: "Detail (programme/batch)" },
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "photo_url", label: "Photo", type: "image" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "alumni",
    label: "Alumni",
    group: "People",
    orderBy: { column: "sort", ascending: true },
    listFields: ["name", "company", "role"],
    fields: [
      { name: "name", label: "Name" },
      { name: "batch", label: "Batch" },
      { name: "programme", label: "Programme" },
      { name: "role", label: "Role" },
      { name: "company", label: "Company" },
      { name: "photo_url", label: "Photo", type: "image" },
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  // ── Placements ──
  {
    table: "placement_stats",
    label: "Placement Stats",
    group: "Placements",
    orderBy: { column: "sort", ascending: true },
    listFields: ["value", "label"],
    fields: [
      { name: "value", label: "Value" },
      { name: "label", label: "Label" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "placement_record",
    label: "Placement Record",
    group: "Placements",
    orderBy: { column: "sort", ascending: true },
    listFields: ["year", "placed", "highest"],
    fields: [
      { name: "year", label: "Academic Year" },
      { name: "placed", label: "Students Placed" },
      { name: "highest", label: "Highest Package" },
      { name: "offers", label: "Total Offers", type: "number" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "recruiters",
    label: "Recruiters",
    group: "Placements",
    orderBy: { column: "sort", ascending: true },
    listFields: ["name"],
    fields: [
      { name: "name", label: "Name" },
      { name: "logo_url", label: "Logo", type: "image" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  // ── Content ──
  {
    table: "announcements",
    label: "Announcements",
    group: "Content",
    orderBy: { column: "sort", ascending: true },
    listFields: ["description"],
    fields: [
      { name: "description", label: "Text", type: "textarea" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "notices",
    label: "Notices",
    group: "Content",
    orderBy: { column: "sort", ascending: true },
    listFields: ["description"],
    fields: [
      { name: "description", label: "Text", type: "textarea" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "events",
    label: "Events",
    group: "Content",
    orderBy: { column: "created_at", ascending: false },
    listFields: ["event_name"],
    fields: [
      { name: "event_name", label: "Event Name" },
      { name: "event_description", label: "Description", type: "textarea" },
      { name: "images", label: "Images (add as many as you like)", type: "images" },
    ],
  },
  {
    table: "faqs",
    label: "FAQs",
    group: "Content",
    orderBy: { column: "sort", ascending: true },
    listFields: ["question"],
    fields: [
      { name: "question", label: "Question" },
      { name: "answer", label: "Answer", type: "textarea" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  // ── Submissions (read-only) ──
  {
    table: "enquiries",
    label: "Enquiries",
    group: "Submissions",
    readOnly: true,
    orderBy: { column: "created_at", ascending: false },
    listFields: ["name", "mobile", "programme", "created_at"],
    fields: [],
  },
  {
    table: "applications",
    label: "Applications",
    group: "Submissions",
    readOnly: true,
    orderBy: { column: "created_at", ascending: false },
    listFields: ["name", "mobile", "programme", "created_at"],
    fields: [],
  },
  {
    table: "grievances",
    label: "Grievances",
    group: "Submissions",
    readOnly: true,
    orderBy: { column: "created_at", ascending: false },
    listFields: ["name", "enrollment_no", "created_at"],
    fields: [],
  },
];
