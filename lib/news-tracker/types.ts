export type NewsSource = "google-news" | "rss" | "campus";

export type NewsWatchConfig = {
  topic: string;
  notifyEmail: string;
  source: NewsSource;
  rssUrl?: string;
  enabled: boolean;
  updatedAt: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  link: string;
  summary?: string;
  publishedAt?: string;
  sourceLabel: string;
};

export type NotifiedArticle = NewsArticle & {
  notifiedAt: string;
};

export type NewsTrackerState = {
  config: NewsWatchConfig;
  seenIds: string[];
  history: NotifiedArticle[];
  lastCheckedAt: string | null;
  lastError: string | null;
};

export type CheckResult = {
  ok: boolean;
  checkedAt: string;
  fetched: number;
  newCount: number;
  emailed: NotifiedArticle[];
  emailConfigured: boolean;
  message: string;
};
