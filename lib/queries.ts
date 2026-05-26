import type { FacultyMember } from "@/components/faculty/FacultyGrid";
import type { CampusEvent } from "@/lib/events";
import { facultyMembers as fallbackFaculty } from "@/lib/faculty-data";
import { campusEvents as fallbackCampusEvents } from "@/lib/events-data";
import {
  announcements as fallbackAnnouncements,
  eventImages as fallbackEventImages,
  notices as fallbackNotices,
} from "@/lib/home-data";
import { createServerSupabaseClient } from "@/lib/supabase";

const DEFAULT_FACULTY_PHOTO = "/faculty/faculty.jpg";
const DEFAULT_EVENT_IMAGES = [
  "/events/event-1.jpg",
  "/events/event-2.jpg",
  "/events/event-3.jpg",
];

function eventRowToCampusEvent(row: {
  id: number;
  event_name: string | null;
  event_description: string | null;
  image_1_url: string | null;
  image_2_url: string | null;
  image_3_url: string | null;
}): CampusEvent {
  const images = [row.image_1_url, row.image_2_url, row.image_3_url].filter(
    (url): url is string => Boolean(url),
  );
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
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return fallbackAnnouncements;
  }

  const items = data
    .map((row) => row.description)
    .filter((text): text is string => Boolean(text?.trim()));

  return items.length > 0 ? items : fallbackAnnouncements;
}

export async function fetchNotices(): Promise<string[]> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackNotices;

  const { data, error } = await supabase
    .from("notices")
    .select("description")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return fallbackNotices;
  }

  const items = data
    .map((row) => row.description)
    .filter((text): text is string => Boolean(text?.trim()));

  return items.length > 0 ? items : fallbackNotices;
}

export async function fetchFaculties(): Promise<FacultyMember[]> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return fallbackFaculty;

  const { data, error } = await supabase
    .from("faculties")
    .select("id, photo_url, name, designation, bio")
    .order("id", { ascending: true });

  if (error || !data?.length) {
    return fallbackFaculty;
  }

  const members = data
    .filter((row) => row.name)
    .map((row) => ({
      id: row.id,
      photoUrl: row.photo_url || DEFAULT_FACULTY_PHOTO,
      name: row.name!,
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
      "id, event_name, event_description, image_1_url, image_2_url, image_3_url",
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
