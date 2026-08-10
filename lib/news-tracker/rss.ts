import { articleId } from "@/lib/news-tracker/store";
import type { NewsArticle, NewsWatchConfig } from "@/lib/news-tracker/types";
import { createServerSupabaseClient } from "@/lib/supabase";
import {
  announcements as fallbackAnnouncements,
  notices as fallbackNotices,
} from "@/lib/home-data";

function decodeXmlEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripTags(value: string): string {
  return decodeXmlEntities(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function extractTag(block: string, tag: string): string {
  const cdata = block.match(
    new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, "i"),
  );
  if (cdata?.[1]) return decodeXmlEntities(cdata[1].trim());

  const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return plain?.[1] ? decodeXmlEntities(plain[1].trim()) : "";
}

function parseRssItems(xml: string, sourceLabel: string): NewsArticle[] {
  const items: NewsArticle[] = [];
  const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

  for (const block of itemBlocks) {
    const title = stripTags(extractTag(block, "title"));
    const link = stripTags(extractTag(block, "link"));
    const summary = stripTags(
      extractTag(block, "description") || extractTag(block, "content:encoded"),
    );
    const publishedAt =
      stripTags(extractTag(block, "pubDate")) ||
      stripTags(extractTag(block, "published")) ||
      undefined;

    if (!title) continue;

    items.push({
      id: articleId(link || title, title),
      title,
      link: link || "#",
      summary: summary.slice(0, 400) || undefined,
      publishedAt,
      sourceLabel,
    });
  }

  return items;
}

export function googleNewsRssUrl(topic: string): string {
  const query = encodeURIComponent(topic.trim());
  return `https://news.google.com/rss/search?q=${query}&hl=en-IN&gl=IN&ceid=IN:en`;
}

async function fetchRssFeed(
  url: string,
  sourceLabel: string,
): Promise<NewsArticle[]> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ABGI-NewsTracker/1.0 (+https://localhost)",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`RSS fetch failed (${response.status}) for ${url}`);
  }

  const xml = await response.text();
  return parseRssItems(xml, sourceLabel);
}

async function fetchCampusUpdates(topic: string): Promise<NewsArticle[]> {
  const supabase = createServerSupabaseClient();
  const needle = topic.trim().toLowerCase();

  let announcements: { text: string; date?: string | null }[] = [];
  let notices: { text: string; date?: string | null }[] = [];

  if (supabase) {
    const [a, n] = await Promise.all([
      supabase
        .from("announcements")
        .select("description, date, created_at")
        .order("created_at", { ascending: false })
        .limit(40),
      supabase
        .from("notices")
        .select("description, date, created_at")
        .order("created_at", { ascending: false })
        .limit(40),
    ]);

    announcements =
      a.data
        ?.filter((row) => row.description)
        .map((row) => ({
          text: row.description!,
          date: row.date ?? row.created_at,
        })) ?? [];
    notices =
      n.data
        ?.filter((row) => row.description)
        .map((row) => ({
          text: row.description!,
          date: row.date ?? row.created_at,
        })) ?? [];
  }

  if (!announcements.length) {
    announcements = fallbackAnnouncements.map((text) => ({ text }));
  }
  if (!notices.length) {
    notices = fallbackNotices.map((text) => ({ text }));
  }

  const combined = [
    ...announcements.map((item) => ({
      ...item,
      sourceLabel: "Campus announcements",
    })),
    ...notices.map((item) => ({
      ...item,
      sourceLabel: "Campus notice board",
    })),
  ];

  return combined
    .filter((item) =>
      needle ? item.text.toLowerCase().includes(needle) : true,
    )
    .map((item) => ({
      id: articleId(`campus:${item.sourceLabel}`, item.text),
      title: item.text,
      link: "/#latest-updates",
      summary: item.text,
      publishedAt: item.date ?? undefined,
      sourceLabel: item.sourceLabel,
    }));
}

export async function fetchNewsArticles(
  config: NewsWatchConfig,
): Promise<NewsArticle[]> {
  if (config.source === "campus") {
    return fetchCampusUpdates(config.topic);
  }

  if (config.source === "rss") {
    if (!config.rssUrl) {
      throw new Error("RSS URL is required when source is set to rss.");
    }
    return fetchRssFeed(config.rssUrl, "Custom RSS");
  }

  return fetchRssFeed(
    googleNewsRssUrl(config.topic),
    `Google News · ${config.topic}`,
  );
}
