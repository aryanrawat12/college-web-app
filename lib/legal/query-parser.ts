import type { LegalDomain, ParsedQuery } from "./types";

const DOMAIN_HINTS: Record<LegalDomain, string[]> = {
  constitutional: [
    "article",
    "fundamental right",
    "constitution",
    "writ",
    "mandamus",
    "certiorari",
    "habeas",
    "basic structure",
    "federal",
    "part iii",
    "article 14",
    "article 19",
    "article 21",
    "article 32",
    "article 226",
  ],
  criminal: [
    "bail",
    "fir",
    "ipc",
    "bns",
    "crpc",
    "bnss",
    "arrest",
    "charge",
    "acquittal",
    "conviction",
    "section 302",
    "section 420",
    "anticipatory",
    "remand",
    "ndps",
  ],
  civil: [
    "injunction",
    "specific performance",
    "damages",
    "plaint",
    "suit",
    "cpc",
    "limitation",
    "res judicata",
    "interim",
    "mesne",
  ],
  corporate: [
    "companies act",
    "nclt",
    "nclat",
    "insolvency",
    "ibc",
    "merger",
    "oppression",
    "mismanagement",
    "directors",
    "shareholder",
    "sebi",
  ],
  arbitration: [
    "arbitration",
    "arbitral",
    "section 11",
    "section 34",
    "section 9",
    "seat",
    "venue",
    "uncitral",
    "a&c act",
  ],
  labour: [
    "industrial dispute",
    "retrenchment",
    "workman",
    "epf",
    "gratuity",
    "layoff",
    "strike",
    "wage",
    "esi",
  ],
  tax: [
    "gst",
    "income tax",
    "assessment",
    "vat",
    "customs",
    "transfer pricing",
    "tds",
    "input tax",
  ],
  ip: [
    "patent",
    "trademark",
    "copyright",
    "passing off",
    "infringement",
    "design",
    "geographical indication",
  ],
  environmental: [
    "pollution",
    "environment",
    "forest",
    "ngt",
    "precautionary",
    "polluter pays",
    "eia",
  ],
  family: [
    "divorce",
    "maintenance",
    "custody",
    "hindu marriage",
    "muslim personal",
    "adoption",
    "guardianship",
    "dowry",
  ],
  procedural: [
    "limitation",
    "jurisdiction",
    "maintainability",
    "locus",
    "natural justice",
    "audi alteram",
    "evidence",
    "affidavit",
  ],
  administrative: [
    "natural justice",
    "delegated legislation",
    "administrative action",
    "bias",
    "proportionality",
    "legitimate expectation",
  ],
  general: [],
};

const STATUTE_PATTERNS: Array<{ re: RegExp; label: string }> = [
  { re: /\barticle\s*\d+[a-z]?\b/gi, label: "Constitution of India" },
  { re: /\bipc\b|\bindian penal code\b|\bbns\b/gi, label: "IPC / BNS" },
  { re: /\bcr\.?\s*p\.?\s*c\.?\b|\bcrpc\b|\bbnss\b/gi, label: "CrPC / BNSS" },
  { re: /\bc\.?\s*p\.?\s*c\.?\b|\bcivil procedure\b/gi, label: "CPC" },
  { re: /\bcompanies act\b|\bca\s*2013\b/gi, label: "Companies Act, 2013" },
  { re: /\bibc\b|\binsolvency\b/gi, label: "Insolvency and Bankruptcy Code" },
  {
    re: /\barbitration\b|\ba&c act\b|\b1996 act\b/gi,
    label: "Arbitration & Conciliation Act, 1996",
  },
  { re: /\bgst\b|\bcgst\b|\bigst\b/gi, label: "GST laws" },
  { re: /\bit\s*act\b|\bincome[- ]tax\b/gi, label: "Income Tax Act" },
  { re: /\bndps\b/gi, label: "NDPS Act" },
  { re: /\bcontract act\b|\bindian contract act\b/gi, label: "Indian Contract Act, 1872" },
];

function extractPhrases(q: string): string[] {
  const quoted = [...q.matchAll(/"([^"]+)"/g)].map((m) => m[1].trim());
  return quoted.filter(Boolean);
}

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));
}

const STOP = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "under",
  "into",
  "about",
  "what",
  "when",
  "where",
  "which",
  "while",
  "have",
  "has",
  "had",
  "are",
  "was",
  "were",
  "been",
  "being",
  "will",
  "would",
  "could",
  "should",
  "can",
  "may",
  "please",
  "advise",
  "opinion",
  "whether",
  "against",
  "between",
  "their",
  "there",
  "than",
  "then",
  "also",
  "such",
  "into",
  "over",
  "after",
  "before",
]);

function detectDomains(text: string): LegalDomain[] {
  const lower = text.toLowerCase();
  const hits: LegalDomain[] = [];
  for (const [domain, hints] of Object.entries(DOMAIN_HINTS) as Array<
    [LegalDomain, string[]]
  >) {
    if (domain === "general") continue;
    if (hints.some((h) => lower.includes(h))) hits.push(domain);
  }
  return hits.length ? hits : ["general"];
}

function frameIssues(text: string, domains: LegalDomain[]): string[] {
  const issues: string[] = [];
  const lower = text.toLowerCase();

  if (/bail|anticipatory/.test(lower)) {
    issues.push("Whether bail / anticipatory bail ought to be granted on the facts");
  }
  if (/arrest|remand/.test(lower)) {
    issues.push("Legality of arrest / remand and compliance with procedural safeguards");
  }
  if (/article\s*21|privacy|personal liberty/.test(lower)) {
    issues.push("Scope of Article 21 and personal liberty / privacy protections");
  }
  if (/article\s*14|equality|arbitrary/.test(lower)) {
    issues.push("Whether the State action survives Article 14 reasonableness scrutiny");
  }
  if (/injunct|interim|stay/.test(lower)) {
    issues.push("Whether interim / injunctive relief satisfies the triple test");
  }
  if (/arbitrat/.test(lower)) {
    issues.push("Arbitrability, seat/venue, and maintainability under the A&C Act");
  }
  if (/insolven|ibc|nclt/.test(lower)) {
    issues.push("Maintainability and commercial wisdom / CIRP issues under the IBC");
  }
  if (/contract|breach|specific performance/.test(lower)) {
    issues.push("Existence of breach and appropriate contractual / equitable remedy");
  }
  if (/jurisdiction|maintainability|locus/.test(lower)) {
    issues.push("Jurisdiction, maintainability and locus standi");
  }
  if (/natural justice|audi alteram|bias/.test(lower)) {
    issues.push("Breach of natural justice and consequences for the impugned order");
  }

  if (!issues.length) {
    issues.push(
      `Primary legal question arising from the query (${domains[0]} lens)`,
    );
    issues.push("Applicable statutory scheme and controlling precedent");
    issues.push("Available remedies, limitations and litigation strategy");
  } else {
    issues.push("Controlling precedent hierarchy and distinguishing facts");
    issues.push("Practical remedy map and risk-weighted strategy");
  }

  return [...new Set(issues)];
}

export function parseLegalQuery(raw: string): ParsedQuery {
  const normalized = raw.replace(/\s+/g, " ").trim();
  const tokens = tokenize(normalized);
  const phrases = extractPhrases(normalized);
  const domains = detectDomains(normalized);

  const statutes: string[] = [];
  for (const { re, label } of STATUTE_PATTERNS) {
    if (re.test(normalized)) statutes.push(label);
    re.lastIndex = 0;
  }

  const articleHits = [
    ...normalized.matchAll(/\barticle\s*(\d+[a-z]?)\b/gi),
  ].map((m) => `Article ${m[1]}`);
  statutes.push(...articleHits);

  let courtPreference: ParsedQuery["courtPreference"];
  if (/supreme court|\bsc\b|apex court/i.test(normalized)) {
    courtPreference = "Supreme Court";
  } else if (/high court|\bhc\b/i.test(normalized)) {
    courtPreference = "High Court";
  }

  return {
    raw,
    normalized,
    tokens,
    phrases,
    issues: frameIssues(normalized, domains),
    statutes: [...new Set(statutes)],
    domains,
    courtPreference,
  };
}
