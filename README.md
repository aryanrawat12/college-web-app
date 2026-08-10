# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

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

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
