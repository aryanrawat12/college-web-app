import type { FacultyMember } from "@/components/faculty/FacultyGrid";
import type { CampusEvent } from "@/lib/events";
import { facultyMembers as fallbackFaculty } from "@/lib/faculty-data";
import { campusEvents as fallbackCampusEvents } from "@/lib/events-data";
import {
  announcements as fallbackAnnouncements,
  eventImages as fallbackEventImages,
  notices as fallbackNotices,
  accreditations as fallbackAccreditations,
  heroStats as fallbackStats,
  leadershipSnippet as fallbackLeadership,
} from "@/lib/home-data";
import {
  programs as fallbackPrograms,
  type Program,
} from "@/lib/programs";
import {
  placementStats as fallbackPlacementStats,
  placementRecord as fallbackPlacementRecord,
  recruiters as fallbackRecruiters,
} from "@/lib/placements-data";
import { testimonials as fallbackTestimonials } from "@/lib/testimonials-data";
import { alumni as fallbackAlumni } from "@/lib/alumni-data";
import { faqs as fallbackFaqs } from "@/lib/faq-data";
import { createServerSupabaseClient } from "@/lib/supabase";

const DEFAULT_FACULTY_PHOTO = "/faculty/faculty.jpg";
const DEFAULT_EVENT_IMAGES = [
  "/events/event-1.jpg",
  "/events/event-2.jpg",
  "/events/event-3.jpg",
];

// Maps a programme's school label to its department page.
const SCHOOL_HREF: Record<string, string> = {
  Pharmacy: "/pharmacy",
  Management: "/management",
  Education: "/teaching-education",
};

function eventRowToCampusEvent(row: {
  id: number;
  event_name: string | null;
  event_description: string | null;
  image_1_url: string | null;
  image_2_url: string | null;
  image_3_url: string | null;
  images?: string[] | null;
}): CampusEvent {
  const arr = row.images?.length
    ? row.images
    : [row.image_1_url, row.image_2_url, row.image_3_url];
  const images = arr.filter((url): url is string => Boolean(url));
  return {
    id: row.id,
    title: row.event_name ?? "Event",
    description: row.event_description ?? "",
    images: images.length > 0 ? images : DEFAULT_EVENT_IMAGES,
  };
}

export async function fetchAnnouncements(): Promise<string[]> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackAnnouncements;
  const { data, error } = await supabase
    .from("announcements")
    .select("description")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackAnnouncements;
  const items = data
    .map((row) => row.description)
    .filter((t): t is string => Boolean(t?.trim()));
  return items.length > 0 ? items : fallbackAnnouncements;
}

export async function fetchNotices(): Promise<string[]> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackNotices;
  const { data, error } = await supabase
    .from("notices")
    .select("description")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackNotices;
  const items = data
    .map((row) => row.description)
    .filter((t): t is string => Boolean(t?.trim()));
  return items.length > 0 ? items : fallbackNotices;
}

export async function fetchFaculties(): Promise<FacultyMember[]> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackFaculty;
  const { data, error } = await supabase
    .from("faculties")
    .select("id, photo_url, name, designation, bio")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackFaculty;
  const members = data
    .filter((row) => row.name)
    .map((row) => ({
      id: row.id,
      photoUrl: row.photo_url || DEFAULT_FACULTY_PHOTO,
      name: row.name,
      designation: row.designation ?? "",
      bio: row.bio ?? "",
    }));
  return members.length > 0 ? members : fallbackFaculty;
}

export async function fetchEvents(): Promise<CampusEvent[]> {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return fallbackCampusEvents.map((event, index) => ({
      id: index + 1,
      title: event.title,
      description: event.description,
      images: DEFAULT_EVENT_IMAGES,
    }));
  }
  const { data, error } = await supabase
    .from("events")
    .select(
      "id, event_name, event_description, image_1_url, image_2_url, image_3_url, images",
    )
    .order("created_at", { ascending: false });
  if (error || !data?.length) {
    return fallbackCampusEvents.map((event, index) => ({
      id: index + 1,
      title: event.title,
      description: event.description,
      images: DEFAULT_EVENT_IMAGES,
    }));
  }
  return data.map(eventRowToCampusEvent);
}

export async function fetchEventMarqueeImages(): Promise<string[]> {
  const events = await fetchEvents();
  const images = events.flatMap((event) => event.images);
  return images.length > 0 ? images : fallbackEventImages;
}

export async function fetchProgrammes(): Promise<Program[]> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackPrograms;
  const { data, error } = await supabase
    .from("programmes")
    .select("*")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackPrograms;
  return data.map((r) => ({
    name: r.name,
    slug: r.slug,
    school: r.school,
    level: (r.level as Program["level"]) ?? "UG",
    levelLabel: r.level_label,
    duration: r.duration ?? "",
    seats: r.intake ?? "—",
    fee: r.fees ?? "On request",
    approval: r.approval ?? "",
    eligibility: r.eligibility ?? "",
    href: SCHOOL_HREF[r.school] ?? "/",
    image: r.image_url ?? "",
    description: r.description ?? "",
    mode: r.mode ?? "",
    careers: r.careers ?? "",
  }));
}

export type Accreditation = {
  abbr: string;
  name: string;
  logo: string | null;
  regNo?: string;
  certificate?: string;
};

export async function fetchAccreditations(): Promise<Accreditation[]> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackAccreditations as Accreditation[];
  const { data, error } = await supabase
    .from("accreditations")
    .select("*")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackAccreditations as Accreditation[];
  return data.map((r) => ({
    abbr: r.abbr,
    name: r.name,
    logo: r.logo_url,
    regNo: r.reg_no ?? undefined,
    certificate: r.certificate_url ?? undefined,
  }));
}

export async function fetchPlacementStats() {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackPlacementStats;
  const { data, error } = await supabase
    .from("placement_stats")
    .select("value, label")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackPlacementStats;
  return data;
}

export async function fetchPlacementRecord() {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackPlacementRecord;
  const { data, error } = await supabase
    .from("placement_record")
    .select("year, placed, highest, offers")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackPlacementRecord;
  return data.map((r) => ({
    year: r.year,
    placed: r.placed ?? "",
    highest: r.highest ?? "",
    offers: r.offers ?? 0,
  }));
}

export type Recruiter = { name: string; logo: string | null };

export async function fetchRecruiters(): Promise<Recruiter[]> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackRecruiters;
  const { data, error } = await supabase
    .from("recruiters")
    .select("name, logo_url")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackRecruiters;
  return data.map((r) => ({ name: r.name, logo: r.logo_url }));
}

export async function fetchTestimonials() {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackTestimonials;
  const { data, error } = await supabase
    .from("testimonials")
    .select("name, detail, quote, photo_url")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackTestimonials;
  return data.map((r) => ({
    name: r.name,
    detail: r.detail ?? "",
    quote: r.quote,
    photo: r.photo_url ?? "",
  }));
}

export async function fetchAlumni() {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackAlumni;
  const { data, error } = await supabase
    .from("alumni")
    .select("name, batch, programme, role, company, photo_url, quote")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackAlumni;
  return data.map((r) => ({
    name: r.name,
    batch: r.batch ?? "",
    programme: r.programme ?? "",
    role: r.role ?? "",
    company: r.company ?? "",
    photo: r.photo_url ?? "",
    quote: r.quote ?? "",
  }));
}

export async function fetchFaqs() {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackFaqs;
  const { data, error } = await supabase
    .from("faqs")
    .select("question, answer")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackFaqs;
  return data.map((r) => ({ q: r.question, a: r.answer }));
}

export async function fetchStats() {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackStats;
  const { data, error } = await supabase
    .from("stats")
    .select("value, label")
    .order("sort", { ascending: true });
  if (error || !data?.length) return fallbackStats;
  return data;
}

export async function fetchLeadership() {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackLeadership;
  const { data, error } = await supabase
    .from("leadership")
    .select("name, role, message, image_url")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return fallbackLeadership;
  return {
    name: data.name ?? fallbackLeadership.name,
    role: data.role ?? fallbackLeadership.role,
    message: data.message ?? fallbackLeadership.message,
    image: data.image_url ?? fallbackLeadership.image,
  };
}

export type PaymentLink = {
  institute: string;
  description: string;
  url: string;
};

const FALLBACK_PAYMENT_LINKS: PaymentLink[] = [
  {
    institute: "Institute of Pharmacy",
    description: "Pay D.Pharm, B.Pharm & M.Pharm fees securely online.",
    url: "#",
  },
  {
    institute: "Institute of Management",
    description: "Pay MBA programme fees securely online.",
    url: "#",
  },
  {
    institute: "Institute of Education",
    description: "Pay D.El.Ed & B.Ed fees securely online.",
    url: "#",
  },
];

export async function fetchPaymentLinks(): Promise<PaymentLink[]> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return FALLBACK_PAYMENT_LINKS;
  const { data, error } = await supabase
    .from("payment_links")
    .select("institute, description, url")
    .order("sort", { ascending: true });
  if (error || !data?.length) return FALLBACK_PAYMENT_LINKS;
  return data.map((r) => ({
    institute: r.institute,
    description: r.description ?? "",
    url: r.url,
  }));
}

export type SiteSettings = {
  helpline: string;
  whatsapp: string;
  emails: string[];
  address: string;
  mapsUrl: string;
  mapsQuery: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  prospectusUrl: string;
  heroTitle: string;
  heroSubtitle: string;
};

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return null;
  return {
    helpline: data.helpline ?? "",
    whatsapp: data.whatsapp ?? "",
    emails: [data.email1, data.email2, data.email3].filter(
      (e): e is string => Boolean(e),
    ),
    address: data.address ?? "",
    mapsUrl: data.maps_url ?? "",
    mapsQuery: data.maps_query ?? "",
    linkedinUrl: data.linkedin_url ?? "",
    instagramUrl: data.instagram_url ?? "",
    youtubeUrl: data.youtube_url ?? "",
    prospectusUrl: data.prospectus_url ?? "",
    heroTitle: data.hero_title ?? "",
    heroSubtitle: data.hero_subtitle ?? "",
  };
}
