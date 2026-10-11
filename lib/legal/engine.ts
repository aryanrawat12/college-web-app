import {
  buildAngleBriefs,
  buildExecutiveSummary,
  RESEARCH_DISCLAIMER,
} from "./analysis";
import { COMMENTARY_CORPUS, LANDMARK_CORPUS } from "./corpus";
import { parseLegalQuery } from "./query-parser";
import { rankAuthorities, rankCommentary } from "./ranking";
import { runLiveSearches } from "./search/live";
import { LEGAL_SOURCES } from "./sources";
import type { CaseAuthority, ResearchBrief, ResearchRequestBody } from "./types";

function mergeAuthorities(
  corpus: CaseAuthority[],
  live: CaseAuthority[],
): CaseAuthority[] {
  const map = new Map<string, CaseAuthority>();
  for (const a of [...live, ...corpus]) {
    const key = a.url || a.id;
    if (!map.has(key)) map.set(key, a);
  }
  return [...map.values()];
}

export async function runLegalResearch(
  body: ResearchRequestBody,
): Promise<ResearchBrief> {
  const queryText = (body.query || "").trim();
  if (queryText.length < 8) {
    throw new Error("Please enter a fuller legal query (at least 8 characters).");
  }

  const preferLive = body.preferLive !== false;
  const maxAuthorities = Math.min(Math.max(body.maxAuthorities ?? 10, 3), 20);
  const parsed = parseLegalQuery(queryText);

  const live = await runLiveSearches(parsed, preferLive);
  const merged = mergeAuthorities(LANDMARK_CORPUS, live.liveAuthorities);
  const ranked = rankAuthorities(merged, parsed, maxAuthorities);

  const commentary = rankCommentary(
    [...live.liveCommentary, ...COMMENTARY_CORPUS],
    parsed,
    8,
  );

  const researchGaps: string[] = [];
  if (!parsed.statutes.length) {
    researchGaps.push(
      "No statute clearly detected — add section numbers (e.g. Section 438 BNSS / Article 226) for sharper ranking.",
    );
  }
  if (ranked[0] && ranked[0].relevancyScore < 35) {
    researchGaps.push(
      "Top hit is only moderately aligned — consider adding facts (forum, stage of proceedings, relief sought).",
    );
  }
  if (!live.liveAuthorities.length && preferLive) {
    researchGaps.push(
      "Live judgment crawl returned empty — rely on chambers corpus and open source deep-links; set INDIANKANOON_API_TOKEN for API-grade recall.",
    );
  }
  researchGaps.push(
    "Always run a citator (SCC / IK citedby) for overruling, per incuriam, and legislative override before filing.",
  );

  return {
    query: parsed,
    executiveSummary: buildExecutiveSummary(parsed, ranked),
    issuesFramed: parsed.issues,
    angles: buildAngleBriefs(parsed, ranked),
    rankedAuthorities: ranked,
    commentary,
    sourcesQueried: LEGAL_SOURCES,
    liveSearchNotes: live.notes,
    researchGaps,
    disclaimer: RESEARCH_DISCLAIMER,
    generatedAt: new Date().toISOString(),
  };
}
