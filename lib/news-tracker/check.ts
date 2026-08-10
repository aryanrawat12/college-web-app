import { isEmailConfigured, sendNewsUpdateEmail } from "@/lib/news-tracker/email";
import { fetchNewsArticles } from "@/lib/news-tracker/rss";
import {
  getState,
  markChecked,
  rememberSeen,
} from "@/lib/news-tracker/store";
import type { CheckResult, NotifiedArticle } from "@/lib/news-tracker/types";

/**
 * Core algorithm:
 * 1. Load watch config (topic + email + source)
 * 2. Fetch latest items for that news topic
 * 3. Diff against previously seen fingerprints
 * 4. Email each brand-new update to the configured address
 * 5. Persist fingerprints so the same update is never mailed twice
 */
export async function runNewsCheck(options?: {
  seedOnly?: boolean;
}): Promise<CheckResult> {
  const checkedAt = new Date().toISOString();
  const state = await getState();
  const { config } = state;

  if (!config.enabled) {
    return {
      ok: true,
      checkedAt,
      fetched: 0,
      newCount: 0,
      emailed: [],
      emailConfigured: isEmailConfigured(),
      message: "Tracker is disabled.",
    };
  }

  if (!config.notifyEmail) {
    return {
      ok: false,
      checkedAt,
      fetched: 0,
      newCount: 0,
      emailed: [],
      emailConfigured: isEmailConfigured(),
      message: "Configure a notify email first.",
    };
  }

  if (!config.topic && config.source !== "campus") {
    return {
      ok: false,
      checkedAt,
      fetched: 0,
      newCount: 0,
      emailed: [],
      emailConfigured: isEmailConfigured(),
      message: "Configure a topic first.",
    };
  }

  try {
    const articles = await fetchNewsArticles(config);
    const seen = new Set(state.seenIds);
    const fresh = articles.filter((article) => !seen.has(article.id));

    // First successful run seeds the baseline so we don't flood the inbox.
    if (options?.seedOnly || state.seenIds.length === 0) {
      await rememberSeen(
        articles.map((article) => article.id),
        checkedAt,
      );
      return {
        ok: true,
        checkedAt,
        fetched: articles.length,
        newCount: 0,
        emailed: [],
        emailConfigured: isEmailConfigured(),
        message:
          state.seenIds.length === 0
            ? `Baseline saved (${articles.length} items). Future updates will be emailed to ${config.notifyEmail}.`
            : `Seeded ${articles.length} current items without sending mail.`,
      };
    }

    const emailed: NotifiedArticle[] = [];
    const topicLabel = config.topic || "campus updates";

    for (const article of fresh) {
      await sendNewsUpdateEmail({
        to: config.notifyEmail,
        topic: topicLabel,
        article,
      });
      emailed.push({ ...article, notifiedAt: checkedAt });
    }

    await markChecked({
      checkedAt,
      newItems: emailed,
      error: null,
    });

    return {
      ok: true,
      checkedAt,
      fetched: articles.length,
      newCount: emailed.length,
      emailed,
      emailConfigured: isEmailConfigured(),
      message:
        emailed.length === 0
          ? "No new updates since the last check."
          : `Emailed ${emailed.length} new update(s) to ${config.notifyEmail}.`,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown news check failure";
    await markChecked({ checkedAt, newItems: [], error: message });
    return {
      ok: false,
      checkedAt,
      fetched: 0,
      newCount: 0,
      emailed: [],
      emailConfigured: isEmailConfigured(),
      message,
    };
  }
}
