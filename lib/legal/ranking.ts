import type {
  CaseAuthority,
  CommentaryHit,
  ParsedQuery,
  RankedAuthority,
  RelevantParagraph,
} from "./types";

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function overlapScore(needles: string[], haystack: string[]): number {
  if (!needles.length) return 0;
  const set = new Set(haystack.map((h) => h.toLowerCase()));
  let hits = 0;
  for (const n of needles) {
    const nl = n.toLowerCase();
    if ([...set].some((h) => h.includes(nl) || nl.includes(h))) hits += 1;
  }
  return hits / needles.length;
}

function textHaystack(authority: CaseAuthority): string {
  return [
    authority.title,
    authority.shortName,
    authority.holding,
    authority.ratio,
    ...authority.issues,
    ...authority.keywords,
    ...authority.statutes,
    ...authority.paragraphs.map((p) => `${p.text} ${p.whyRelevant}`),
  ]
    .join(" ")
    .toLowerCase();
}

function tokenHits(tokens: string[], text: string): number {
  if (!tokens.length) return 0;
  let hits = 0;
  for (const t of tokens) {
    if (text.includes(t)) hits += 1;
  }
  return hits / tokens.length;
}

function pickParagraphs(
  authority: CaseAuthority,
  query: ParsedQuery,
): RelevantParagraph[] {
  const scored = authority.paragraphs.map((p) => {
    const blob = `${p.text} ${p.whyRelevant}`.toLowerCase();
    const score =
      tokenHits(query.tokens, blob) * 0.7 +
      overlapScore(query.issues, [p.whyRelevant, p.text]) * 0.3;
    return { p, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.filter((s) => s.score > 0 || scored.length <= 2).map((s) => s.p);
}

export function scoreAuthority(
  authority: CaseAuthority,
  query: ParsedQuery,
): RankedAuthority {
  const hay = textHaystack(authority);
  const issueMatch = overlapScore(query.issues, [
    ...authority.issues,
    authority.holding,
    authority.ratio,
  ]);
  const keywordMatch = Math.max(
    tokenHits(query.tokens, hay),
    overlapScore(query.phrases, authority.keywords),
  );
  const statuteMatch = overlapScore(query.statutes, authority.statutes);
  const domainMatch = overlapScore(query.domains, authority.domains);

  const courtWeight =
    authority.courtTier === "Supreme Court"
      ? 1
      : authority.courtTier === "High Court"
        ? 0.72
        : authority.courtTier === "Tribunal"
          ? 0.6
          : 0.4;

  const age = Math.max(0, new Date().getFullYear() - authority.year);
  const recencyBoost = clamp(1 - age / 80, 0.35, 1);

  const matchedParagraphs = pickParagraphs(authority, query);
  const paragraphFit =
    matchedParagraphs.length === 0
      ? 0.2
      : Math.min(
          1,
          matchedParagraphs.length / Math.max(1, authority.paragraphs.length) +
            tokenHits(
              query.tokens,
              matchedParagraphs.map((p) => p.text).join(" ").toLowerCase(),
            ),
        );

  const preferenceBoost =
    query.courtPreference && query.courtPreference === authority.courtTier
      ? 4
      : 0;

  const relevancyScore = clamp(
    issueMatch * 28 +
      keywordMatch * 26 +
      statuteMatch * 16 +
      domainMatch * 12 +
      courtWeight * 10 +
      recencyBoost * 5 +
      paragraphFit * 8 +
      preferenceBoost,
  );

  const relevancyReasons: string[] = [];
  if (domainMatch > 0)
    relevancyReasons.push(
      `Domain alignment: ${authority.domains.filter((d) => query.domains.includes(d)).join(", ") || authority.domains[0]}`,
    );
  if (statuteMatch > 0)
    relevancyReasons.push(
      `Statute touchpoints: ${authority.statutes.slice(0, 3).join("; ")}`,
    );
  if (keywordMatch > 0.25)
    relevancyReasons.push("Strong lexical / issue keyword overlap with the query");
  if (authority.courtTier === "Supreme Court")
    relevancyReasons.push("Apex Court authority — high persuasive / binding weight");
  if (age <= 10) relevancyReasons.push("Relatively recent articulation of the doctrine");
  if (matchedParagraphs[0])
    relevancyReasons.push(`Key para: ${matchedParagraphs[0].paraLabel}`);

  return {
    authority,
    relevancyScore: Math.round(relevancyScore * 10) / 10,
    scoreBreakdown: {
      issueMatch: Math.round(issueMatch * 100),
      keywordMatch: Math.round(keywordMatch * 100),
      statuteMatch: Math.round(statuteMatch * 100),
      domainMatch: Math.round(domainMatch * 100),
      courtWeight: Math.round(courtWeight * 100),
      recencyBoost: Math.round(recencyBoost * 100),
      paragraphFit: Math.round(paragraphFit * 100),
    },
    matchedParagraphs: matchedParagraphs.slice(0, 3),
    relevancyReasons,
    sourcesConsulted: authority.sourceIds,
  };
}

export function rankAuthorities(
  authorities: CaseAuthority[],
  query: ParsedQuery,
  limit = 12,
): RankedAuthority[] {
  return authorities
    .map((a) => scoreAuthority(a, query))
    .filter((r) => {
      const { keywordMatch, issueMatch, statuteMatch, domainMatch } =
        r.scoreBreakdown;
      // Require real topical grip — domain-alone matches (e.g. any "criminal"
      // authority on a bail query) should not pollute the ranked list.
      const topical = keywordMatch + issueMatch + statuteMatch;
      return r.relevancyScore >= 28 && (topical >= 35 || (domainMatch >= 50 && topical >= 20));
    })
    .sort((a, b) => b.relevancyScore - a.relevancyScore)
    .slice(0, limit);
}

export function rankCommentary(
  items: CommentaryHit[],
  query: ParsedQuery,
  limit = 6,
) {
  return items
    .map((item) => {
      const hay = `${item.title} ${item.snippet} ${item.keywords.join(" ")}`.toLowerCase();
      const score = clamp(
        tokenHits(query.tokens, hay) * 55 +
          overlapScore(query.domains, item.domains) * 30 +
          overlapScore(query.phrases, item.keywords) * 15,
      );
      return { ...item, relevancyScore: Math.round(score * 10) / 10 };
    })
    .filter((i) => i.relevancyScore >= 10)
    .sort((a, b) => b.relevancyScore - a.relevancyScore)
    .slice(0, limit);
}
