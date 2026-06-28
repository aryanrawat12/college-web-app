# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The import above is load-bearing: this repo runs **Next.js 16.2.6** (App Router, React 19, Tailwind v4). APIs and conventions differ from older Next.js. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js-specific code.

## Commands

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (flat config, eslint-config-next)
```

No test suite exists.

## Architecture

Marketing/brochure site for a college (ABGI). Every route is a static `app/<name>/page.tsx` Server Component — no dynamic routes, no route handlers, no auth, no middleware. Content is served from Supabase with a **static fallback**, so the site renders fully even with no database configured.

### Data layer — Supabase-with-fallback (the core pattern)

- `lib/supabase.ts` — `createServerSupabaseClient()` / `createBrowserSupabaseClient()` both use the anon key (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). **Both return `null` when env vars are unset.**
- `lib/queries.ts` — all read fetches live here. Each `fetch*` gets the server client; if it's `null`, errors, or returns no rows, it returns hardcoded fallback data instead. This means the app never crashes on a missing/empty DB.
- `lib/*-data.ts` (`faculty-data`, `events-data`, `home-data`, etc.) — the static fallback content, and the source of truth when Supabase is absent. **Edit these to change default site content.**
- `lib/database.types.ts` — Supabase-generated `Database` types; clients are typed against it.
- `supabase-rls-example.sql` — RLS policy template: public SELECT on content tables (faculties, announcements, notices, events), public INSERT on `enquiries` / `grievances`.

When adding a new DB-backed field: add the table read to `queries.ts` with a fallback, update `database.types.ts`, and extend the matching `*-data.ts` fallback.

### Reads vs writes

- **Reads:** Server Components call `lib/queries.ts` (async, `Promise.all` at the top of the page). Pages set `export const revalidate = 0` (always fresh).
- **Writes:** form Client Components in `components/forms/` use `createBrowserSupabaseClient()` to INSERT directly (enquiry, grievance/choupal). These are the only `"use client"` data paths.

### UI structure

- `app/layout.tsx` — root shell: fixed header (`TopBar` + `NavBar`), `main` with top padding to clear the fixed header, footer (`BottomBar` + `CopyRights`). Geist fonts via `next/font`.
- `components/` grouped by area: `layout/`, `home/`, `forms/`, `department/`, `faculty/`, `events/`, `leadership/`, `contact/`, `shared/`.
- Department pages (`pharmacy`, `management`, `teaching-education`) are composed from shared `components/department/Section*` blocks; `lib/departments.ts` holds the programme/department taxonomy used by both pages and forms.

### Styling — Tailwind v4

No `tailwind.config`. Theme is defined in `app/globals.css` via `@import "tailwindcss"` + `@theme inline`, exposing brand tokens as utilities: `brand-blue`, `brand-blue-dark`, `brand-yellow`, `brand-yellow-hover`. Use these tokens rather than raw hex.

### Misc

- Path alias `@/*` → repo root. TS `strict`.
- `lib/site.ts` reads external-portal URLs from env (`NEXT_PUBLIC_LOGIN_URL`, `NEXT_PUBLIC_PAYMENT_URL`, `NEXT_PUBLIC_LINKEDIN_URL`), falling back to `example.com` placeholders when unset.
- `next.config.ts` whitelists `**.supabase.co/storage/v1/object/public/**` for `next/image` (DB-hosted images).
