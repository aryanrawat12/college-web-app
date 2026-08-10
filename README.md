This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## News update tracker

Track a particular news topic and email every new update to a specific inbox.

1. Copy `.env.example` → `.env.local` and set `NEWS_TRACKER_EMAIL`, SMTP vars, and `CRON_SECRET`.
2. Open `/news-tracker`, set the topic + email, then **Save watch**.
3. First **Check now** seeds a baseline (no flood of existing headlines). Later checks email only new items.
4. Cron hits `/api/news-tracker/check` every 15 minutes (`vercel.json`).
5. Optional durable storage on Supabase: run `supabase-news-tracker.sql`.

Sources: Google News by keywords, campus announcements/notices, or a custom RSS URL.

## Apex Counsel (legal research bot)

Ultimate Indian legal research desk at [`/legal-research`](/legal-research).

- Searches / deep-links Supreme Court, High Courts (eCourts), Indian Kanoon, SCC Online, LiveLaw, Bar & Bench, iPleaders, Cyril Amarchand, Khaitan, AZB, Trilegal, Nishith Desai
- Frames issues like a senior chambers note (ratio, distinguishing, contrary, procedure, statute, remedies, commercial)
- Returns case law ordered by **relevancy score**, with matched paragraphs and score breakdown
- Hybrid engine: curated landmark corpus + optional live portal scan
- API: `POST /api/legal-research` with `{ "query": "...", "preferLive": true }`
- Optional env: `INDIANKANOON_API_TOKEN` (see `legal.env.example`)

Not legal advice — verify official judgments and citator status before filing.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
