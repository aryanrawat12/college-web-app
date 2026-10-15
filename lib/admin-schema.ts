import { themes } from "@/lib/themes";

// Config that drives the generic admin CRUD. Each entry maps a DB table to its
// editable fields. `single` tables are one-row settings (id = 1).

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "image"
  | "images"
  | "file" // PDF upload (public URL)
  | "date"
  | "url"
  | "select"; // pick one of `options`

export type Field = {
  name: string;
  label: string;
  type?: FieldType; // default "text"
  options?: readonly { value: string; label: string }[]; // for "select"
};

export type TableConfig = {
  table: string;
  label: string;
  group:
    | "Content"
    | "People"
    | "Academics"
    | "Placements"
    | "Site"
    | "Anti-Ragging"
    | "Submissions";
  single?: boolean; // single-row (id=1) settings table
  readOnly?: boolean; // submissions — view only
  orderBy?: { column: string; ascending: boolean };
  listFields: string[]; // columns shown in the list view
  fields: Field[];
  // Columns that hold private S3 keys (resumes, ID photos) — shown as "Open"
  // links in the list and as signed URLs in the export.
  fileKeyFields?: string[];
  // Adds an "Export to Excel" (CSV) button; columns in this order.
  exportColumns?: { name: string; label: string }[];
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
      { name: "theme", label: "Site Theme (colours)", type: "select", options: themes },
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
      { name: "facebook_url", label: "Facebook URL", type: "url" },
      { name: "prospectus_url", label: "Prospectus URL", type: "url" },
      { name: "hero_title", label: "Hero Title (used when Section Headings → hero heading is empty)" },
      { name: "hero_subtitle", label: "Hero Subtitle (used when Section Headings → hero description is empty)", type: "textarea" },
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
  {
    table: "payment_links",
    label: "Payment Links",
    group: "Site",
    orderBy: { column: "sort", ascending: true },
    listFields: ["institute", "url"],
    fields: [
      { name: "institute", label: "Institute" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "url", label: "Payment URL", type: "url" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "nav_links",
    label: "Header Menu",
    group: "Site",
    orderBy: { column: "sort", ascending: true },
    listFields: ["menu", "label", "href", "sort"],
    fields: [
      { name: "menu", label: "Dropdown (e.g. About; blank = top-level link; \"Students\" = Student Corner page cards)" },
      { name: "label", label: "Link Text" },
      { name: "href", label: "Link (/page or https://…)" },
      { name: "sort", label: "Order (lower = further left / higher up)", type: "number" },
    ],
  },
  {
    table: "home_sections",
    label: "Homepage Section Order",
    group: "Site",
    orderBy: { column: "sort", ascending: true },
    listFields: ["label", "sort"],
    fields: [
      { name: "label", label: "Section (admin name only)" },
      { name: "sort", label: "Order (lower = higher up)", type: "number" },
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
    table: "section_content",
    label: "Section Headings & Text",
    group: "Content",
    orderBy: { column: "sort", ascending: true },
    listFields: ["key", "heading"],
    fields: [
      { name: "eyebrow", label: "Eyebrow (small label above heading)" },
      { name: "heading", label: "Heading" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "cta_primary", label: "Primary Button (hero only)" },
      { name: "cta_secondary", label: "Secondary Button (hero only)" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "facilities",
    label: "Campus Facilities",
    group: "Content",
    orderBy: { column: "sort", ascending: true },
    listFields: ["title"],
    fields: [
      { name: "title", label: "Title" },
      { name: "body", label: "Description", type: "textarea" },
      { name: "image_url", label: "Background Image", type: "image" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "why_choose_us",
    label: "Why ABGI (Highlights)",
    group: "Content",
    orderBy: { column: "sort", ascending: true },
    listFields: ["title"],
    fields: [
      { name: "title", label: "Title" },
      { name: "body", label: "Description", type: "textarea" },
      { name: "image_url", label: "Background Image", type: "image" },
      { name: "sort", label: "Sort", type: "number" },
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
  {
    table: "policies",
    label: "Policies (PDF)",
    group: "Content",
    orderBy: { column: "sort", ascending: true },
    listFields: ["title", "category"],
    fields: [
      { name: "title", label: "Title" },
      { name: "category", label: "Category (e.g. Academic, Anti-Ragging, HR)" },
      { name: "description", label: "Short Description", type: "textarea" },
      { name: "pdf_url", label: "Policy PDF", type: "file" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  // ── Anti-Ragging (/anti-ragging) ──
  {
    table: "anti_ragging_settings",
    label: "Page Text & PDF",
    group: "Anti-Ragging",
    single: true,
    listFields: [],
    fields: [
      { name: "pdf_url", label: "Anti-Ragging PDF (download button at the end of the page)", type: "file" },
      { name: "pdf_label", label: "Download Button Text" },
      { name: "intro", label: "Introduction (blank line between paragraphs)", type: "textarea" },
      { name: "helpline_phone", label: "National Helpline Number" },
      { name: "helpline_email", label: "National Helpline Email" },
      { name: "college_contact", label: "College Anti-Ragging Cell Contact (phone/email)" },
      { name: "what_is_ragging", label: "What Constitutes Ragging (one point per line)", type: "textarea" },
      { name: "punishments", label: "Punishments (one point per line)", type: "textarea" },
      { name: "undertaking", label: "Undertaking / Affidavit Note", type: "textarea" },
      { name: "appointment_order", label: "Committee Appointment Order No." },
      { name: "appointment_date", label: "Date of Appointment" },
    ],
  },
  {
    table: "anti_ragging_members",
    label: "Committee Members",
    group: "Anti-Ragging",
    orderBy: { column: "sort", ascending: true },
    listFields: ["name", "role", "department", "mobile"],
    fields: [
      { name: "name", label: "Name" },
      { name: "role", label: "Role (e.g. Chairperson, Member, Squad Head)" },
      { name: "department", label: "Department / Associated With" },
      { name: "mobile", label: "Mobile Number" },
      { name: "email", label: "Email" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "anti_ragging_documents",
    label: "Documents (by year)",
    group: "Anti-Ragging",
    orderBy: { column: "sort", ascending: true },
    listFields: ["year", "title"],
    fields: [
      { name: "title", label: "Title (e.g. Committee Order 2026-27)" },
      { name: "year", label: "Year (e.g. 2026)" },
      { name: "pdf_url", label: "PDF", type: "file" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  {
    table: "jobs",
    label: "Careers — Job Openings",
    group: "Content",
    orderBy: { column: "sort", ascending: true },
    listFields: ["title", "department", "last_date"],
    fields: [
      { name: "title", label: "Job Title" },
      { name: "department", label: "Department / Institute" },
      { name: "location", label: "Location" },
      { name: "employment_type", label: "Type (Full-time / Part-time / Contract)" },
      { name: "qualification", label: "Qualification Required" },
      { name: "experience", label: "Experience Required" },
      { name: "description", label: "Job Description", type: "textarea" },
      { name: "last_date", label: "Last Date to Apply (hidden after this date)", type: "date" },
      { name: "sort", label: "Sort", type: "number" },
    ],
  },
  // ── Submissions (read-only) ──
  {
    table: "job_applications",
    label: "Job Applications",
    group: "Submissions",
    readOnly: true,
    orderBy: { column: "created_at", ascending: false },
    listFields: ["name", "job_title", "mobile", "resume_key", "created_at"],
    fields: [],
    fileKeyFields: ["resume_key"],
    exportColumns: [
      { name: "job_title", label: "Applied For" },
      { name: "name", label: "Name" },
      { name: "email", label: "Email" },
      { name: "mobile", label: "Mobile" },
      { name: "qualification", label: "Qualification" },
      { name: "experience", label: "Experience" },
      { name: "message", label: "Message" },
      { name: "resume_key", label: "Resume (link valid 7 days)" },
      { name: "created_at", label: "Submitted On" },
    ],
  },
  {
    table: "id_card_submissions",
    label: "ID Card Details",
    group: "Submissions",
    readOnly: true,
    orderBy: { column: "created_at", ascending: false },
    listFields: ["enrollment_no", "name", "course", "batch", "photo_key", "created_at"],
    fields: [],
    fileKeyFields: ["photo_key"],
    // Same order as the printed card (front, then back).
    exportColumns: [
      { name: "enrollment_no", label: "Enroll. No." },
      { name: "batch", label: "Batch" },
      { name: "name", label: "Name" },
      { name: "course", label: "Course" },
      { name: "dob", label: "Date of Birth" },
      { name: "blood_group", label: "Blood Group" },
      { name: "contact", label: "Contact No." },
      { name: "father_name", label: "Father's Name" },
      { name: "mother_name", label: "Mother's Name" },
      { name: "parent_spouse_contact", label: "Parent / Spouse Contact No." },
      { name: "local_address", label: "Local Address" },
      { name: "photo_key", label: "Photo (link valid 7 days)" },
      { name: "created_at", label: "Submitted On" },
    ],
  },
  {
    table: "student_documents",
    label: "Student Documents",
    group: "Submissions",
    readOnly: true,
    orderBy: { column: "created_at", ascending: false },
    listFields: ["name", "course", "mobile", "doc_photo", "doc_10th", "doc_12th", "doc_aadhaar", "created_at"],
    fields: [],
    fileKeyFields: [
      "doc_10th",
      "doc_12th",
      "doc_tc",
      "doc_migration",
      "doc_gap",
      "doc_income",
      "doc_domicile",
      "doc_caste",
      "doc_aadhaar",
      "doc_samagra",
      "doc_mp_taas",
      "doc_otr",
      "doc_photo",
    ],
    // Document links in the export are valid for 7 days.
    exportColumns: [
      { name: "name", label: "Name" },
      { name: "enrollment_no", label: "Enroll. No." },
      { name: "course", label: "Course" },
      { name: "mobile", label: "Contact No." },
      { name: "email", label: "Email" },
      { name: "doc_10th", label: "10th Marksheet" },
      { name: "doc_12th", label: "12th Marksheet" },
      { name: "doc_tc", label: "TC" },
      { name: "doc_migration", label: "Migration" },
      { name: "doc_gap", label: "Gap Certificate" },
      { name: "doc_income", label: "Income" },
      { name: "doc_domicile", label: "Domicile" },
      { name: "doc_caste", label: "Caste" },
      { name: "doc_aadhaar", label: "Aadhaar" },
      { name: "doc_samagra", label: "Samagra" },
      { name: "doc_mp_taas", label: "MP TAAS" },
      { name: "doc_otr", label: "OTR" },
      { name: "doc_photo", label: "Photo" },
      { name: "created_at", label: "Submitted On" },
    ],
  },
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
