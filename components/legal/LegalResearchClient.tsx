"use client";

import { useState } from "react";
import type { ResearchBrief } from "@/lib/legal/types";

const EXAMPLES = [
  "Anticipatory bail in a Section 498A / dowry cruelty FIR after Arnesh Kumar checklist failure",
  "Whether an indefinite internet shutdown survives Anuradha Bhasin proportionality",
  "Challenge to CoC distribution under IBC after Essar Steel commercial wisdom doctrine",
  "Seat vs venue ambiguity in a Singapore-seated arbitration with Indian assets — BALCO / Vidya Drolia",
  "Interim injunction for trademark passing off — triple test and Delhi HC practice",
];

function scoreTone(score: number) {
  if (score >= 70) return "var(--ac-score-high)";
  if (score >= 45) return "var(--ac-score-mid)";
  return "var(--ac-score-low)";
}

export default function LegalResearchClient() {
  const [query, setQuery] = useState("");
  const [preferLive, setPreferLive] = useState(true);
  const [brief, setBrief] = useState<ResearchBrief | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function runResearch(nextQuery?: string) {
    const q = (nextQuery ?? query).trim();
    if (q.length < 8) {
      setError("Enter a fuller legal query so the chambers engine can frame issues.");
      return;
    }
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/legal-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, preferLive, maxAuthorities: 12 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Research failed");
      setBrief(data as ResearchBrief);
      setQuery(q);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Research failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="apex-shell">
      <div className="apex-atmosphere" aria-hidden />
      <div className="apex-grain" aria-hidden />

      <header className="apex-top">
        <div className="apex-brand-lockup">
          <span className="apex-mark" aria-hidden />
          <div>
            <p className="apex-brand">Apex Counsel</p>
            <p className="apex-brand-sub">Indian multi-source legal research</p>
          </div>
        </div>
        <nav className="apex-top-links">
          <a href="#authorities">Authorities</a>
          <a href="#angles">Angles</a>
          <a href="#sources">Sources</a>
        </nav>
      </header>

      <section className="apex-hero">
        <p className="apex-kicker">Senior-advocate chambers engine</p>
        <h1 className="apex-title">
          <span className="apex-title-brand">Apex Counsel</span>
        </h1>
        <p className="apex-lede">
          One research pass across Supreme Court, High Courts, Indian Kanoon, SCC,
          LiveLaw, iPleaders, Cyril Amarchand and peer firms — then a ranked
          authority brief with paragraphs and relevancy scores.
        </p>

        <form
          className="apex-composer"
          onSubmit={(e) => {
            e.preventDefault();
            runResearch();
          }}
        >
          <label className="sr-only" htmlFor="legal-query">
            Legal query
          </label>
          <textarea
            id="legal-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="State the facts, forum, statute sections and relief sought…"
            rows={4}
          />
          <div className="apex-composer-bar">
            <label className="apex-toggle">
              <input
                type="checkbox"
                checked={preferLive}
                onChange={(e) => setPreferLive(e.target.checked)}
              />
              Live portal scan
            </label>
            <button type="submit" className="apex-cta" disabled={pending}>
              {pending ? "Scanning authorities…" : "Run chambers research"}
            </button>
          </div>
        </form>

        <div className="apex-examples">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              className="apex-chip"
              onClick={() => runResearch(ex)}
            >
              {ex}
            </button>
          ))}
        </div>
      </section>

      {error ? <p className="apex-error">{error}</p> : null}

      {brief ? (
        <div className="apex-results">
          <section className="apex-summary apex-reveal">
            <h2>Working view</h2>
            <p>{brief.executiveSummary}</p>
            <ul className="apex-issues">
              {brief.issuesFramed.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
            <p className="apex-meta">
              Generated {new Date(brief.generatedAt).toLocaleString()} ·{" "}
              {brief.rankedAuthorities.length} authorities ranked
            </p>
          </section>

          <section id="authorities" className="apex-section apex-reveal">
            <div className="apex-section-head">
              <h2>Case law by relevancy</h2>
              <p>
                Scored across issue fit, keywords, statutes, court tier, recency
                and paragraph alignment.
              </p>
            </div>

            <ol className="apex-authority-list">
              {brief.rankedAuthorities.map((item, index) => (
                <li key={item.authority.id} className="apex-authority">
                  <div className="apex-authority-top">
                    <span className="apex-rank">#{index + 1}</span>
                    <span
                      className="apex-score"
                      style={{ color: scoreTone(item.relevancyScore) }}
                    >
                      {item.relevancyScore}
                      <small> relevancy</small>
                    </span>
                  </div>
                  <h3>{item.authority.title}</h3>
                  <p className="apex-cite">
                    {item.authority.citation} · {item.authority.court} ·{" "}
                    {item.authority.year}
                  </p>
                  <p className="apex-holding">{item.authority.holding}</p>
                  <div className="apex-reasons">
                    {item.relevancyReasons.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>

                  <div className="apex-paras">
                    {item.matchedParagraphs.map((para) => (
                      <blockquote key={para.paraLabel + para.text.slice(0, 24)}>
                        <p className="apex-para-label">{para.paraLabel}</p>
                        <p>{para.text}</p>
                        <footer>{para.whyRelevant}</footer>
                      </blockquote>
                    ))}
                  </div>

                  <div className="apex-breakdown" aria-label="Score breakdown">
                    {Object.entries(item.scoreBreakdown).map(([k, v]) => (
                      <span key={k}>
                        {k.replace(/([A-Z])/g, " $1")}: {v}
                      </span>
                    ))}
                  </div>

                  {item.authority.url ? (
                    <a
                      className="apex-source-link"
                      href={item.authority.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open source judgment
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section id="angles" className="apex-section apex-reveal">
            <div className="apex-section-head">
              <h2>All-angle chambers analysis</h2>
              <p>
                Ratio, distinguishing facts, contrary lines, procedure, statute,
                remedies and commercial posture — as a senior brief would.
              </p>
            </div>
            <div className="apex-angles">
              {brief.angles.map((angle) => (
                <article key={angle.angle} className="apex-angle">
                  <h3>{angle.title}</h3>
                  <p>{angle.analysis}</p>
                  {angle.supportingAuthorities.length ? (
                    <p className="apex-support">
                      Supporting: {angle.supportingAuthorities.join(" · ")}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="apex-section apex-reveal">
            <div className="apex-section-head">
              <h2>Commentary & firm insight</h2>
              <p>LiveLaw, iPleaders, SCC Blog, CAM and peer-firm thought leadership.</p>
            </div>
            <ul className="apex-commentary">
              {brief.commentary.map((c) => (
                <li key={c.id}>
                  <a href={c.url} target="_blank" rel="noreferrer">
                    {c.title}
                  </a>
                  <p>
                    {c.sourceName} · relevancy {c.relevancyScore}
                  </p>
                  <p>{c.snippet}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="sources" className="apex-section apex-reveal">
            <div className="apex-section-head">
              <h2>Sources queried</h2>
              <p>Portals scanned or deep-linked in this pass.</p>
            </div>
            <ul className="apex-sources">
              {brief.sourcesQueried.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.searchUrlTemplate.replace(
                      "{query}",
                      encodeURIComponent(brief.query.normalized),
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.name}
                  </a>
                  <span>{s.category}</span>
                </li>
              ))}
            </ul>
            <ul className="apex-notes">
              {brief.liveSearchNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <ul className="apex-gaps">
              {brief.researchGaps.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>

          <p className="apex-disclaimer">{brief.disclaimer}</p>
        </div>
      ) : null}
    </div>
  );
}
