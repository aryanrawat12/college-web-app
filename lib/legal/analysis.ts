import type {
  AnalysisAngle,
  AngleBrief,
  ParsedQuery,
  RankedAuthority,
} from "./types";

const ANGLE_META: Record<
  AnalysisAngle,
  { title: string; prompt: (q: ParsedQuery, top: RankedAuthority[]) => string }
> = {
  ratio: {
    title: "Ratio & controlling line",
    prompt: (q, top) => {
      const lead = top[0]?.authority;
      if (!lead) {
        return `Frame the governing ratio from the closest binding precedent on: ${q.issues[0]}.`;
      }
      return `The working ratio for counsel is drawn principally from ${lead.shortName} (${lead.citation}): ${lead.ratio} Apply it only where the material facts align; do not over-extend dicta.`;
    },
  },
  distinguishing: {
    title: "Distinguishing / adverse facts",
    prompt: (q, top) => {
      const names = top
        .slice(0, 3)
        .map((t) => t.authority.shortName)
        .join(", ");
      return `Stress-test the client's narrative against ${names || "the cited line"}. Identify factual deltas (timing, mens rea, contractual text, statutory trigger, forum) that let the other side distinguish the favourable authorities or that let you dilute unfavourable ones. Query focus: ${q.normalized.slice(0, 180)}.`;
    },
  },
  contrary: {
    title: "Contrary / narrowing authorities",
    prompt: (_q, top) => {
      const contrary = top.find((t) =>
        t.authority.relatedAngles.includes("contrary"),
      );
      if (contrary) {
        return `Keep ${contrary.authority.shortName} in view as a narrowing / contrary strand: ${contrary.authority.holding} Prepare a reconciliation (hierarchy, subsequent overruling, per incuriam, or confined to its facts).`;
      }
      return "Map the strongest contrary strand early — citator treatment, subsequent benches, and High Court splits — before the opponent springs it in reply.";
    },
  },
  procedural: {
    title: "Procedural & maintainability",
    prompt: (q) =>
      `Check limitation, jurisdiction, locus, alternative remedy, and natural-justice defects before merits. For criminal process, verify FIR / arrest / remand legality; for civil / commercial, verify cause of action and interim triple test. Issues framed: ${q.issues.join("; ")}.`,
  },
  constitutional: {
    title: "Constitutional overlay",
    prompt: (q) =>
      q.domains.includes("constitutional") ||
      q.statutes.some((s) => /article|constitution/i.test(s))
        ? "Run Articles 14/19/21 (and 32/226 as applicable) through legality, legitimate aim and proportionality. Ask whether the measure is manifestly arbitrary or trenches upon basic structure / personal liberty."
        : "Even in ostensibly private / commercial disputes, flag any Article 14/21 spillover (State action, fairness of process, penalty disproportionality) that can open a writ or constitutionalised reading.",
  },
  statutory: {
    title: "Statutory scheme & interpretation",
    prompt: (q) =>
      `Parse the governing statute(s)${q.statutes.length ? ` — ${q.statutes.join(", ")}` : ""} — for text, context, purpose, and later amendments. Prefer harmonious construction; use non obstante / special-over-general only with clean conflict analysis.`,
  },
  remedy: {
    title: "Remedy map",
    prompt: (_q, top) => {
      const rem = top.find((t) =>
        t.authority.relatedAngles.includes("remedy"),
      );
      return `Advise a laddered remedy: interim protection → primary forum relief → appellate / review. ${rem ? `Anchor prayer drafting to ${rem.authority.shortName}.` : ""} Quantify risk of adverse costs, undertakings, and without-prejudice settlement windows.`;
    },
  },
  policy: {
    title: "Policy & institutional context",
    prompt: () =>
      "Note institutional competence (legislature vs court), comparative foreign law only as persuasive, and enforcement reality — a perfect ratio that cannot be executed is poor counsel.",
  },
  commercial: {
    title: "Commercial / transactional angle",
    prompt: (q) =>
      q.domains.some((d) =>
        ["corporate", "arbitration", "tax", "ip"].includes(d),
      )
        ? "Translate the dispute into deal terms: reps/warranties, MAC, seat of arbitration, CoC economics, regulatory filings, and reputation risk. Recommend documentary holds and privilege protocol."
        : "If money claims dominate, model best/worst/likely recovery and interest exposure; consider commercial settlement leverage separately from doctrinal purity.",
  },
};

export function buildAngleBriefs(
  query: ParsedQuery,
  ranked: RankedAuthority[],
): AngleBrief[] {
  const wanted = new Set<AnalysisAngle>([
    "ratio",
    "distinguishing",
    "contrary",
    "procedural",
    "statutory",
    "remedy",
  ]);

  if (
    query.domains.includes("constitutional") ||
    query.statutes.some((s) => /constitution|article/i.test(s))
  ) {
    wanted.add("constitutional");
  }
  if (
    query.domains.some((d) =>
      ["corporate", "arbitration", "tax", "ip"].includes(d),
    )
  ) {
    wanted.add("commercial");
  }
  wanted.add("policy");

  return [...wanted].map((angle) => {
    const meta = ANGLE_META[angle];
    const supporting = ranked
      .filter(
        (r) =>
          r.authority.relatedAngles.includes(angle) ||
          r.relevancyScore >= 40,
      )
      .slice(0, 4)
      .map((r) => r.authority.citation);

    return {
      angle,
      title: meta.title,
      analysis: meta.prompt(query, ranked),
      supportingAuthorities: supporting,
    };
  });
}

export function buildExecutiveSummary(
  query: ParsedQuery,
  ranked: RankedAuthority[],
): string {
  if (!ranked.length) {
    return `No high-confidence authorities crossed the relevancy threshold for “${query.normalized}”. Broaden keywords, add statute sections, or attach party/forum facts for a deeper chambers note.`;
  }

  const top = ranked.slice(0, 3);
  const cites = top
    .map(
      (t) =>
        `${t.authority.shortName} (${t.authority.citation}) [${t.relevancyScore}]`,
    )
    .join("; ");

  return `Senior-counsel working view: the dispute sits primarily in the ${query.domains.join(" / ")} lane. Lead authorities by relevancy — ${cites}. Frame pleadings around: ${query.issues[0]}. Cross-check live citator status on Indian Kanoon / SCC before filing; High Court splits and statutory amendments can move the needle overnight.`;
}

export const RESEARCH_DISCLAIMER =
  "Apex Counsel is a research accelerator for advocates and students — not a substitute for independent professional judgment, a solicitor-client relationship, or filing advice. Always verify the official judgment text, subsequent judicial treatment, and current statutory amendments (including BNS/BNSS/BSA transitions) before relying on any paragraph in court.";
