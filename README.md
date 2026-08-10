This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Apex Counsel (legal research bot)

Ultimate Indian legal research desk at [`/legal-research`](http://localhost:3000/legal-research).

- Searches / deep-links Supreme Court, High Courts (eCourts), Indian Kanoon, SCC Online, LiveLaw, Bar & Bench, iPleaders, Cyril Amarchand, Khaitan, AZB, Trilegal, Nishith Desai
- Frames issues like a senior chambers note (ratio, distinguishing, contrary, procedure, statute, remedies, commercial)
- Returns case law ordered by **relevancy score**, with matched paragraphs and score breakdown
- Hybrid engine: curated landmark corpus + optional live portal scan
- API: `POST /api/legal-research` with `{ "query": "...", "preferLive": true }`
- Optional env: `INDIANKANOON_API_TOKEN` (see `.env.example`)

Not legal advice — verify official judgments and citator status before filing.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
