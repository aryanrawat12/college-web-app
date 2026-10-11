import { buildSourceSearchUrl, LEGAL_SOURCES } from "../sources";
import type { CaseAuthority, CommentaryHit, ParsedQuery } from "../types";

const UA =
  "ApexCounselResearchBot/1.0 (+https://localhost; legal-research; respectful-fetch)";

function stripTags(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function safeFetch(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/json,*/*",
        ...(init?.headers || {}),
      },
      next: { revalidate: 0 },
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export interface LiveSearchBundle {
  notes: string[];
  liveAuthorities: CaseAuthority[];
  liveCommentary: CommentaryHit[];
}

function parseIndianKanoonHtml(html: string, query: ParsedQuery): CaseAuthority[] {
  const results: CaseAuthority[] = [];
  const blockRe =
    /<div class='result(?:_title)?'[\s\S]*?<a href="(\/doc\/\d+\/)"[^>]*>([\s\S]*?)<\/a>([\s\S]*?)(?=<div class='result|$)/gi;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = blockRe.exec(html)) && i < 8) {
    const path = match[1];
    const title = stripTags(match[2]).slice(0, 220);
    const snippet = stripTags(match[3]).slice(0, 500);
    if (!title) continue;
    i += 1;
    results.push({
      id: `ik-live-${path.replace(/\D/g, "")}`,
      title,
      shortName: title.split(" vs ")[0]?.slice(0, 80) || title.slice(0, 80),
      citation: "Indian Kanoon (live hit)",
      court: /supreme/i.test(snippet + title)
        ? "Supreme Court of India"
        : /high court/i.test(snippet + title)
          ? "High Court"
          : "Court (see source)",
      courtTier: /supreme/i.test(snippet + title)
        ? "Supreme Court"
        : /high court/i.test(snippet + title)
          ? "High Court"
          : "Tribunal",
      year: Number((snippet.match(/\b(19|20)\d{2}\b/) || [])[0]) || 2000,
      domains: query.domains,
      issues: query.issues.slice(0, 2),
      statutes: query.statutes,
      keywords: query.tokens.slice(0, 12),
      holding: snippet || title,
      ratio: snippet.slice(0, 280) || title,
      paragraphs: [
        {
          paraLabel: "Live snippet",
          text: snippet || "Open the Indian Kanoon document for full paragraphs.",
          whyRelevant: "Returned by live Indian Kanoon search against your query terms.",
        },
      ],
      relatedAngles: ["ratio", "statutory"],
      sourceIds: ["indian-kanoon"],
      url: `https://indiankanoon.org${path}`,
    });
  }

  // Fallback looser parse
  if (!results.length) {
    const loose = [
      ...html.matchAll(/href="(\/doc\/\d+\/)"[^>]*>([^<]{10,180})/gi),
    ].slice(0, 6);
    loose.forEach((m, idx) => {
      const title = stripTags(m[2]);
      results.push({
        id: `ik-loose-${idx}-${m[1].replace(/\D/g, "")}`,
        title,
        shortName: title.slice(0, 80),
        citation: "Indian Kanoon (live hit)",
        court: "Court (see source)",
        courtTier: "Supreme Court",
        year: 2015,
        domains: query.domains,
        issues: query.issues.slice(0, 2),
        statutes: query.statutes,
        keywords: query.tokens.slice(0, 10),
        holding: title,
        ratio: title,
        paragraphs: [
          {
            paraLabel: "Live title hit",
            text: title,
            whyRelevant: "Title-level match from Indian Kanoon HTML search.",
          },
        ],
        relatedAngles: ["ratio"],
        sourceIds: ["indian-kanoon"],
        url: `https://indiankanoon.org${m[1]}`,
      });
    });
  }

  return results;
}

async function searchIndianKanoonApi(
  query: ParsedQuery,
): Promise<CaseAuthority[]> {
  const token = process.env.INDIANKANOON_API_TOKEN;
  if (!token) return [];

  const formInput = [
    query.normalized,
    query.courtPreference === "Supreme Court" ? "doctypes: supremecourt" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const url = `https://api.indiankanoon.org/search/?formInput=${encodeURIComponent(formInput)}&pagenum=0`;
  const res = await safeFetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as {
    docs?: Array<{
      tid?: number;
      title?: string;
      headline?: string;
      docsource?: string;
      publishdate?: string;
    }>;
  };

  return (data.docs || []).slice(0, 8).map((doc, idx) => {
    const title = stripTags(doc.title || doc.headline || `Document ${doc.tid}`);
    const year = Number((doc.publishdate || "").slice(0, 4)) || 2000;
    return {
      id: `ik-api-${doc.tid ?? idx}`,
      title,
      shortName: title.slice(0, 80),
      citation: `IK tid ${doc.tid ?? "n/a"}`,
      court: doc.docsource || "Indian Kanoon",
      courtTier: /supreme/i.test(doc.docsource || "")
        ? "Supreme Court"
        : /high court/i.test(doc.docsource || "")
          ? "High Court"
          : "Tribunal",
      year,
      domains: query.domains,
      issues: query.issues.slice(0, 2),
      statutes: query.statutes,
      keywords: query.tokens.slice(0, 12),
      holding: stripTags(doc.headline || title).slice(0, 500),
      ratio: stripTags(doc.headline || title).slice(0, 280),
      paragraphs: [
        {
          paraLabel: "API headline",
          text: stripTags(doc.headline || title).slice(0, 600),
          whyRelevant: "Fetched via Indian Kanoon official API token.",
        },
      ],
      relatedAngles: ["ratio", "statutory"] as const,
      sourceIds: ["indian-kanoon"],
      url: doc.tid
        ? `https://indiankanoon.org/doc/${doc.tid}/`
        : "https://indiankanoon.org",
    } satisfies CaseAuthority;
  });
}

async function searchIndianKanoonHtml(query: ParsedQuery) {
  const url = buildSourceSearchUrl(
    LEGAL_SOURCES.find((s) => s.id === "indian-kanoon")!,
    query.normalized,
  );
  const res = await safeFetch(url);
  if (!res.ok) throw new Error(`Indian Kanoon HTTP ${res.status}`);
  const html = await res.text();
  return parseIndianKanoonHtml(html, query);
}

function commentaryFromHtml(
  sourceId: string,
  sourceName: string,
  html: string,
  query: ParsedQuery,
  baseUrl: string,
): CommentaryHit[] {
  const links = [
    ...html.matchAll(/<a[^>]+href=["'](https?:\/\/[^"']+|\/[^"']+)["'][^>]*>([^<]{16,160})<\/a>/gi),
  ].slice(0, 40);

  const scored = links
    .map((m, idx) => {
      const title = stripTags(m[2]);
      const href = m[1].startsWith("http") ? m[1] : new URL(m[1], baseUrl).toString();
      const hay = title.toLowerCase();
      const hit = query.tokens.filter((t) => hay.includes(t)).length;
      return { title, href, hit, idx };
    })
    .filter((x) => x.hit > 0)
    .sort((a, b) => b.hit - a.hit)
    .slice(0, 3);

  return scored.map((s) => ({
    id: `live-${sourceId}-${s.idx}`,
    title: s.title,
    sourceId,
    sourceName,
    url: s.href,
    snippet: `Live crawl snippet from ${sourceName} matching query tokens.`,
    domains: query.domains,
    keywords: query.tokens.slice(0, 8),
  }));
}

export async function runLiveSearches(
  query: ParsedQuery,
  preferLive: boolean,
): Promise<LiveSearchBundle> {
  const notes: string[] = [];
  const liveAuthorities: CaseAuthority[] = [];
  const liveCommentary: CommentaryHit[] = [];

  if (!preferLive) {
    notes.push(
      "Live web crawl skipped (preferLive=false). Chambers corpus + source deep-links still provided.",
    );
    return { notes, liveAuthorities, liveCommentary };
  }

  // Indian Kanoon API then HTML
  try {
    const apiHits = await searchIndianKanoonApi(query);
    if (apiHits.length) {
      liveAuthorities.push(...apiHits);
      notes.push(`Indian Kanoon API returned ${apiHits.length} document hits.`);
    } else {
      const htmlHits = await searchIndianKanoonHtml(query);
      liveAuthorities.push(...htmlHits);
      notes.push(
        htmlHits.length
          ? `Indian Kanoon HTML search returned ${htmlHits.length} hits.`
          : "Indian Kanoon HTML search returned no parseable hits (layout may have changed or blocked).",
      );
    }
  } catch (err) {
    notes.push(
      `Indian Kanoon live search unavailable: ${err instanceof Error ? err.message : "unknown error"}. Using chambers corpus.`,
    );
  }

  const commentarySources = LEGAL_SOURCES.filter((s) =>
    ["livelaw", "ipleaders", "cam", "scc", "barandbench"].includes(s.id),
  );

  await Promise.all(
    commentarySources.map(async (source) => {
      try {
        const url = buildSourceSearchUrl(source, query.normalized);
        const res = await safeFetch(url);
        if (!res.ok) {
          notes.push(`${source.name}: HTTP ${res.status} — deep-link retained.`);
          return;
        }
        const html = await res.text();
        const hits = commentaryFromHtml(
          source.id,
          source.name,
          html,
          query,
          source.baseUrl,
        );
        liveCommentary.push(...hits);
        notes.push(
          hits.length
            ? `${source.name}: extracted ${hits.length} live commentary link(s).`
            : `${source.name}: reachable; no token-overlapping anchors extracted.`,
        );
      } catch (err) {
        notes.push(
          `${source.name}: fetch failed (${err instanceof Error ? err.message : "error"}). Use manual search URL.`,
        );
      }
    }),
  );

  // Always record court / firm deep links as research trail
  notes.push(
    `Deep-linked portals prepared for SCI, eCourts/HCs, SCC, CAM, Khaitan, AZB, Trilegal, NDA.`,
  );

  return { notes, liveAuthorities, liveCommentary };
}
