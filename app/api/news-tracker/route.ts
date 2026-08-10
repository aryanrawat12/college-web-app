import { NextResponse } from "next/server";
import { getState, updateConfig } from "@/lib/news-tracker/store";
import type { NewsSource } from "@/lib/news-tracker/types";
import { isEmailConfigured } from "@/lib/news-tracker/email";

export const dynamic = "force-dynamic";

const SOURCES: NewsSource[] = ["google-news", "rss", "campus"];

export async function GET() {
  const state = await getState();
  return NextResponse.json({
    config: state.config,
    lastCheckedAt: state.lastCheckedAt,
    lastError: state.lastError,
    history: state.history,
    seenCount: state.seenIds.length,
    emailConfigured: isEmailConfigured(),
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    topic?: string;
    notifyEmail?: string;
    source?: NewsSource;
    rssUrl?: string;
    enabled?: boolean;
  };

  if (body.source && !SOURCES.includes(body.source)) {
    return NextResponse.json(
      { error: "source must be google-news, rss, or campus" },
      { status: 400 },
    );
  }

  if (body.notifyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.notifyEmail)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (body.source === "rss" && !(body.rssUrl || "").trim()) {
    return NextResponse.json(
      { error: "rssUrl is required when source is rss" },
      { status: 400 },
    );
  }

  const state = await updateConfig({
    topic: body.topic,
    notifyEmail: body.notifyEmail,
    source: body.source,
    rssUrl: body.rssUrl,
    enabled: body.enabled,
  });

  return NextResponse.json({
    config: state.config,
    emailConfigured: isEmailConfigured(),
  });
}
