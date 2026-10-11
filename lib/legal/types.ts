export type CourtTier =
  | "Supreme Court"
  | "High Court"
  | "Tribunal"
  | "Commentary"
  | "Law Firm Insight";

export type LegalDomain =
  | "constitutional"
  | "criminal"
  | "civil"
  | "corporate"
  | "arbitration"
  | "labour"
  | "tax"
  | "ip"
  | "environmental"
  | "family"
  | "procedural"
  | "administrative"
  | "general";

export type AnalysisAngle =
  | "ratio"
  | "distinguishing"
  | "contrary"
  | "procedural"
  | "constitutional"
  | "statutory"
  | "remedy"
  | "policy"
  | "commercial";

export interface SourceDefinition {
  id: string;
  name: string;
  category: "court" | "database" | "news" | "commentary" | "firm";
  baseUrl: string;
  searchUrlTemplate: string;
  weight: number;
  notes?: string;
}

export interface RelevantParagraph {
  paraLabel: string;
  text: string;
  whyRelevant: string;
}

export interface CaseAuthority {
  id: string;
  title: string;
  shortName: string;
  citation: string;
  court: string;
  courtTier: CourtTier;
  year: number;
  domains: LegalDomain[];
  issues: string[];
  statutes: string[];
  keywords: string[];
  holding: string;
  ratio: string;
  paragraphs: RelevantParagraph[];
  relatedAngles: AnalysisAngle[];
  overruledOrQualifiedBy?: string;
  sourceIds: string[];
  url?: string;
}

export interface CommentaryHit {
  id: string;
  title: string;
  sourceId: string;
  sourceName: string;
  url: string;
  snippet: string;
  publishedAt?: string;
  domains: LegalDomain[];
  keywords: string[];
}

export interface ParsedQuery {
  raw: string;
  normalized: string;
  tokens: string[];
  phrases: string[];
  issues: string[];
  statutes: string[];
  domains: LegalDomain[];
  partiesHint?: string;
  courtPreference?: CourtTier;
}

export interface RankedAuthority {
  authority: CaseAuthority;
  relevancyScore: number;
  scoreBreakdown: {
    issueMatch: number;
    keywordMatch: number;
    statuteMatch: number;
    domainMatch: number;
    courtWeight: number;
    recencyBoost: number;
    paragraphFit: number;
  };
  matchedParagraphs: RelevantParagraph[];
  relevancyReasons: string[];
  sourcesConsulted: string[];
}

export interface AngleBrief {
  angle: AnalysisAngle;
  title: string;
  analysis: string;
  supportingAuthorities: string[];
}

export interface ResearchBrief {
  query: ParsedQuery;
  executiveSummary: string;
  issuesFramed: string[];
  angles: AngleBrief[];
  rankedAuthorities: RankedAuthority[];
  commentary: Array<CommentaryHit & { relevancyScore: number }>;
  sourcesQueried: SourceDefinition[];
  liveSearchNotes: string[];
  researchGaps: string[];
  disclaimer: string;
  generatedAt: string;
}

export interface ResearchRequestBody {
  query: string;
  preferLive?: boolean;
  maxAuthorities?: number;
}
