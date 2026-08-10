import { NextResponse } from "next/server";
import { runNewsCheck } from "@/lib/news-tracker/check";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET || process.env.NEWS_TRACKER_SECRET;
  if (!secret) {
    // Local/dev convenience: allow when no secret is configured.
    return process.env.NODE_ENV !== "production";
  }

  const header = request.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;

  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const seedOnly = url.searchParams.get("seed") === "1";
  const result = await runNewsCheck({ seedOnly });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let seedOnly = false;
  try {
    const body = (await request.json()) as { seedOnly?: boolean };
    seedOnly = Boolean(body.seedOnly);
  } catch {
    seedOnly = false;
  }

  const result = await runNewsCheck({ seedOnly });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
