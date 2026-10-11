import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type {
  NewsTrackerState,
  NewsWatchConfig,
  NotifiedArticle,
} from "@/lib/news-tracker/types";
import type { NewsTrackerStatePayload } from "@/lib/database.types";
import { createServerSupabaseClient } from "@/lib/supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "news-tracker.json");
const MAX_HISTORY = 50;
const MAX_SEEN = 500;

function defaultConfig(): NewsWatchConfig {
  return {
    topic: process.env.NEWS_TRACKER_TOPIC?.trim() || "education India",
    notifyEmail:
      process.env.NEWS_TRACKER_EMAIL?.trim() || "alerts@example.com",
    source:
      (process.env.NEWS_TRACKER_SOURCE as NewsWatchConfig["source"]) ||
      "google-news",
    rssUrl: process.env.NEWS_TRACKER_RSS_URL?.trim() || undefined,
    enabled: process.env.NEWS_TRACKER_ENABLED !== "false",
    updatedAt: new Date().toISOString(),
  };
}

function defaultState(): NewsTrackerState {
  return {
    config: defaultConfig(),
    seenIds: [],
    history: [],
    lastCheckedAt: null,
    lastError: null,
  };
}

function normalizeState(parsed: Partial<NewsTrackerState>): NewsTrackerState {
  return {
    ...defaultState(),
    ...parsed,
    config: { ...defaultConfig(), ...parsed.config },
    seenIds: Array.isArray(parsed.seenIds) ? parsed.seenIds : [],
    history: Array.isArray(parsed.history) ? parsed.history : [],
  };
}

export function articleId(link: string, title: string): string {
  return createHash("sha256")
    .update(`${link.trim()}|${title.trim().toLowerCase()}`)
    .digest("hex")
    .slice(0, 24);
}

async function readFileState(): Promise<NewsTrackerState | null> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    return normalizeState(JSON.parse(raw) as Partial<NewsTrackerState>);
  } catch {
    return null;
  }
}

async function writeFileState(state: NewsTrackerState): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(state, null, 2), "utf8");
}

async function readSupabaseState(): Promise<NewsTrackerState | null> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("news_tracker_state")
    .select("payload")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data?.payload) return null;
  return normalizeState(data.payload as NewsTrackerStatePayload);
}

async function writeSupabaseState(state: NewsTrackerState): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return false;

  const payload: NewsTrackerStatePayload = state;
  const { error } = await supabase.from("news_tracker_state").upsert({
    id: 1,
    payload,
    updated_at: new Date().toISOString(),
  });

  return !error;
}

function trimState(state: NewsTrackerState): NewsTrackerState {
  return {
    ...state,
    seenIds: state.seenIds.slice(-MAX_SEEN),
    history: state.history.slice(0, MAX_HISTORY),
  };
}

export async function getState(): Promise<NewsTrackerState> {
  const fromSupabase = await readSupabaseState();
  if (fromSupabase) return fromSupabase;

  const fromFile = await readFileState();
  if (fromFile) return fromFile;

  const state = defaultState();
  await saveState(state);
  return state;
}

export async function saveState(state: NewsTrackerState): Promise<void> {
  const trimmed = trimState(state);
  const wroteRemote = await writeSupabaseState(trimmed);
  if (!wroteRemote) {
    await writeFileState(trimmed);
  }
}

export async function updateConfig(
  patch: Partial<
    Pick<
      NewsWatchConfig,
      "topic" | "notifyEmail" | "source" | "rssUrl" | "enabled"
    >
  >,
): Promise<NewsTrackerState> {
  const state = await getState();
  state.config = {
    ...state.config,
    ...patch,
    topic: (patch.topic ?? state.config.topic).trim(),
    notifyEmail: (patch.notifyEmail ?? state.config.notifyEmail).trim(),
    rssUrl:
      patch.rssUrl !== undefined
        ? patch.rssUrl.trim() || undefined
        : state.config.rssUrl,
    updatedAt: new Date().toISOString(),
  };
  await saveState(state);
  return state;
}

export async function markChecked(params: {
  checkedAt: string;
  newItems: NotifiedArticle[];
  error?: string | null;
}): Promise<NewsTrackerState> {
  const state = await getState();
  const newIds = params.newItems.map((item) => item.id);
  state.seenIds = [...state.seenIds, ...newIds];
  state.history = [...params.newItems, ...state.history].slice(0, MAX_HISTORY);
  state.lastCheckedAt = params.checkedAt;
  state.lastError = params.error ?? null;
  await saveState(state);
  return state;
}

export async function rememberSeen(
  ids: string[],
  checkedAt: string,
): Promise<void> {
  const state = await getState();
  const merged = new Set([...state.seenIds, ...ids]);
  state.seenIds = [...merged].slice(-MAX_SEEN);
  state.lastCheckedAt = checkedAt;
  state.lastError = null;
  await saveState(state);
}
