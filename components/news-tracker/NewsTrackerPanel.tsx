"use client";

import { FormEvent, useEffect, useState } from "react";
import type {
  CheckResult,
  NewsSource,
  NewsWatchConfig,
  NotifiedArticle,
} from "@/lib/news-tracker/types";

type TrackerPayload = {
  config: NewsWatchConfig;
  lastCheckedAt: string | null;
  lastError: string | null;
  history: NotifiedArticle[];
  seenCount: number;
  emailConfigured: boolean;
};

const labelClass = "mb-1.5 block text-sm font-medium text-brand-blue";
const inputClass =
  "w-full rounded-md border border-brand-blue/20 bg-white px-3 py-2.5 text-sm text-brand-blue placeholder:text-foreground/40 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/40";

export default function NewsTrackerPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(false);
  const [topic, setTopic] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [source, setSource] = useState<NewsSource>("google-news");
  const [rssUrl, setRssUrl] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [emailConfigured, setEmailConfigured] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [history, setHistory] = useState<NotifiedArticle[]>([]);
  const [seenCount, setSeenCount] = useState(0);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [lastCheck, setLastCheck] = useState<CheckResult | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/news-tracker", { cache: "no-store" });
      const data = (await res.json()) as TrackerPayload;
      setTopic(data.config.topic);
      setNotifyEmail(data.config.notifyEmail);
      setSource(data.config.source);
      setRssUrl(data.config.rssUrl ?? "");
      setEnabled(data.config.enabled);
      setEmailConfigured(data.emailConfigured);
      setLastCheckedAt(data.lastCheckedAt);
      setLastError(data.lastError);
      setHistory(data.history);
      setSeenCount(data.seenCount);
    } catch {
      setStatus({ type: "error", text: "Could not load tracker settings." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/news-tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          notifyEmail,
          source,
          rssUrl: source === "rss" ? rssUrl : undefined,
          enabled,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", text: data.error || "Save failed." });
        return;
      }
      setEmailConfigured(Boolean(data.emailConfigured));
      setStatus({
        type: "success",
        text: "Watch saved. New updates for this topic will be emailed.",
      });
    } catch {
      setStatus({ type: "error", text: "Save failed." });
    } finally {
      setSaving(false);
    }
  }

  async function handleCheck(seedOnly = false) {
    setChecking(true);
    setStatus(null);
    try {
      const res = await fetch("/api/news-tracker/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seedOnly }),
      });
      const data = (await res.json()) as CheckResult & { error?: string };
      if (!res.ok && data.error) {
        setStatus({ type: "error", text: data.error });
        return;
      }
      setLastCheck(data);
      setStatus({
        type: res.ok ? "success" : "error",
        text: data.message,
      });
      await load();
    } catch {
      setStatus({ type: "error", text: "Check failed." });
    } finally {
      setChecking(false);
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-foreground/70">Loading news tracker…</p>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        onSubmit={handleSave}
        className="space-y-5 rounded-lg border border-brand-blue/10 bg-brand-blue/[0.03] p-6"
      >
        <div>
          <h2 className="text-xl font-semibold text-brand-blue">
            Watch a news topic
          </h2>
          <p className="mt-1 text-sm text-foreground/70">
            Every time a new update appears for this topic, it is emailed to
            the address below.
          </p>
        </div>

        <div>
          <label htmlFor="topic" className={labelClass}>
            Topic / keywords
          </label>
          <input
            id="topic"
            className={inputClass}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. RGPV Bhopal admissions"
            required
          />
        </div>

        <div>
          <label htmlFor="notifyEmail" className={labelClass}>
            Email updates to
          </label>
          <input
            id="notifyEmail"
            type="email"
            className={inputClass}
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="source" className={labelClass}>
            Source
          </label>
          <select
            id="source"
            className={`${inputClass} cursor-pointer`}
            value={source}
            onChange={(e) => setSource(e.target.value as NewsSource)}
          >
            <option value="google-news">Google News (by topic)</option>
            <option value="campus">Campus announcements & notices</option>
            <option value="rss">Custom RSS feed</option>
          </select>
        </div>

        {source === "rss" && (
          <div>
            <label htmlFor="rssUrl" className={labelClass}>
              RSS feed URL
            </label>
            <input
              id="rssUrl"
              type="url"
              className={inputClass}
              value={rssUrl}
              onChange={(e) => setRssUrl(e.target.value)}
              placeholder="https://example.com/feed.xml"
              required
            />
          </div>
        )}

        <label className="flex items-center gap-2 text-sm text-brand-blue">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-4 w-4 accent-brand-yellow"
          />
          Enable automatic checks
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-brand-yellow px-4 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-yellow-hover disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save watch"}
          </button>
          <button
            type="button"
            disabled={checking}
            onClick={() => void handleCheck(false)}
            className="rounded-md border border-brand-blue px-4 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white disabled:opacity-60"
          >
            {checking ? "Checking…" : "Check now"}
          </button>
          <button
            type="button"
            disabled={checking}
            onClick={() => void handleCheck(true)}
            className="rounded-md border border-brand-blue/30 px-4 py-2.5 text-sm font-medium text-brand-blue/80 transition-colors hover:border-brand-blue hover:text-brand-blue disabled:opacity-60"
          >
            Seed baseline
          </button>
        </div>

        {status && (
          <p
            className={`text-sm ${
              status.type === "error"
                ? "text-red-700"
                : status.type === "success"
                  ? "text-emerald-700"
                  : "text-foreground/80"
            }`}
          >
            {status.text}
          </p>
        )}
      </form>

      <aside className="space-y-5">
        <div className="rounded-lg border border-brand-blue/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue/70">
            Status
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li>
              SMTP email:{" "}
              <span className="font-medium text-brand-blue">
                {emailConfigured ? "configured" : "not configured (logs only)"}
              </span>
            </li>
            <li>
              Items tracked:{" "}
              <span className="font-medium text-brand-blue">{seenCount}</span>
            </li>
            <li>
              Last check:{" "}
              <span className="font-medium text-brand-blue">
                {lastCheckedAt
                  ? new Date(lastCheckedAt).toLocaleString()
                  : "never"}
              </span>
            </li>
            {lastError && (
              <li className="text-red-700">Last error: {lastError}</li>
            )}
            {lastCheck && (
              <li>
                Last run fetched {lastCheck.fetched}, new {lastCheck.newCount}
              </li>
            )}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-foreground/60">
            Set <code className="font-mono">SMTP_*</code> and{" "}
            <code className="font-mono">NEWS_TRACKER_EMAIL</code> in{" "}
            <code className="font-mono">.env.local</code>. Schedule{" "}
            <code className="font-mono">/api/news-tracker/check</code> with a
            cron job (see <code className="font-mono">vercel.json</code>).
          </p>
        </div>

        <div className="rounded-lg border border-brand-blue/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue/70">
            Recent emailed updates
          </h3>
          {history.length === 0 ? (
            <p className="mt-3 text-sm text-foreground/60">
              No updates emailed yet. Save a watch, then run Check now after the
              baseline exists.
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {history.slice(0, 8).map((item) => (
                <li key={`${item.id}-${item.notifiedAt}`}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-brand-blue hover:text-brand-yellow"
                  >
                    {item.title}
                  </a>
                  <p className="text-xs text-foreground/55">
                    {item.sourceLabel}
                    {" · "}
                    {new Date(item.notifiedAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
