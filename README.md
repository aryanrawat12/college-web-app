# Akhil Bharti Group of Institutes (ABGI) — Website

Marketing/brochure site for ABGI, Bhopal (Pharmacy, Management & Teacher
Education). Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript,
backed by **Supabase** (dynamic content + auth) and **AWS S3** (image uploads),
with a static fallback so the site renders even with no database configured.

## Tech stack

- **Next.js 16.2.6** (App Router, Turbopack), **React 19**, **TypeScript (strict)**
- **Tailwind v4** — theme in `app/globals.css` (`@theme inline`), no config file
- **Supabase** — Postgres content + Auth (admin), RLS-protected
- **AWS S3** — image/asset uploads via presigned URLs
- Fonts: Source Serif 4 (headings) / Hanken Grotesk (body) / Space Mono (eyebrows)

## Getting started

```bash
npm install
npm run dev      # dev server → http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (flat config)
```

Create `.env.local` (git-ignored):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# AWS S3 (server-only — never NEXT_PUBLIC_)
AWS_REGION=
AWS_S3_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_PUBLIC_URL=          # e.g. https://<bucket>.s3.<region>.amazonaws.com

# Optional overrides (fall back to sensible defaults in lib/site.ts)
NEXT_PUBLIC_HELPLINE=
NEXT_PUBLIC_WHATSAPP=
NEXT_PUBLIC_EMAIL=
NEXT_PUBLIC_LOGIN_URL=      # defaults to /admin
NEXT_PUBLIC_PROSPECTUS_URL=
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_YOUTUBE_URL=
```

With no Supabase env set, every page falls back to the static content in
`lib/*-data.ts` — the site still works.

## Content model (dynamic)

Reads live in `lib/queries.ts`: each `fetch*` reads its Supabase table and
**falls back to static data** on empty/error. Pages are Server Components with
`export const revalidate = 0` (always fresh).

Tables (public read; writes restricted to authenticated admin via RLS):
`programmes`, `accreditations`, `placement_stats`, `placement_record`,
`recruiters`, `testimonials`, `alumni`, `faqs`, `stats`, `leadership`,
`faculties`, `events`, `announcements`, `notices`, `site_settings`,
`payment_links`. Submissions (`enquiries`, `applications`, `grievances`) are
public-insert / admin-read.

Schema lives in `supabase/migrations/`. Types in `lib/database.types.ts`.

## Admin panel

`/admin` — Supabase email/password login, then config-driven CRUD for every
content table + a read-only submissions viewer. Image fields upload straight to
S3 (presigned `POST /api/upload`, admin-auth gated). The editable-table config
is in `lib/admin-schema.ts`.

**Setup:** create an admin user in Supabase Dashboard → Authentication → Users,
and **disable public sign-ups** (Auth → Sign In / Providers) so only that user
can write.

## Project structure

- `app/` — routes (static Server Components); plus `app/admin`, `app/api/upload`
- `components/` — grouped by area (`home/`, `layout/`, `forms/`, `admin/`, …)
- `lib/` — `queries.ts` (reads), `*-data.ts` (static fallbacks),
  `supabase.ts`, `s3.ts`, `site.ts`, `nav.ts`, `admin-schema.ts`
- `supabase/migrations/` — SQL schema + RLS

## Placeholder data

Content is seeded with placeholders (dummy stats, `loremflickr`/`pravatar`
images, sample text). See **[DATA-REQUIRED.md](./DATA-REQUIRED.md)** for the
full list of real data the client must supply before launch.
