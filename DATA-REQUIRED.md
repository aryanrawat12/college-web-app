# Real Data Needed — ABGI Website

This site currently runs on **placeholder / dummy data** so every page renders.
Below is everything the client must supply to go live. Each item lists **where**
it lives in the code so a developer can swap it in. Anything marked `ponytail:` /
`DUMMY` / `TODO` in the source maps to a row here.

> Tip: search the codebase for `ponytail:`, `DUMMY`, `TODO`, `picsum`, `pravatar`,
> `XXXX`, `example.com` to jump straight to each placeholder.

---

## 1. Contact & identity — `lib/site.ts`

| Field | Current (dummy) | Needed |
|---|---|---|
| Helpline | `+91 98260 12345` | Real admissions phone |
| WhatsApp | `919826012345` | Real WhatsApp number (digits, intl format, no `+`) |
| Email | `info@abgi.ac.in` | Real institute email |
| Login portal URL | `example.com/login` | Real ERP/student/faculty login URLs |
| Payment URL | `example.com/payment` | Real fee-payment portal |
| LinkedIn | a GitLab demo URL | Real LinkedIn company page |
| Prospectus | `/docs/prospectus.pdf` (1-page dummy) | Real prospectus PDF |

Also `app/contact-us/page.tsx` has **dummy department phone numbers**
(`6345-4534-23` etc.) and `admissions@ABGI.com` — replace with real desk numbers,
emails and the correct campus address.

---

## 2. Programmes / Courses — `lib/department-content.ts`

For each of the 6 programmes (D.Pharm, B.Pharm, M.Pharm, MBA, D.El.Ed, B.Ed):

| Field | Current (dummy) | Needed |
|---|---|---|
| **Intake / seats** | guessed (e.g. 60, 100, 120) | **Sanctioned intake** per AICTE/PCI/NCTE |
| **Fees** | guessed (₹45k–₹1.1L/yr) | **Official annual fee** (or "On request") |
| **Image** | `picsum.photos/...` lorem | Real programme/dept photo |
| Description | generic copy | Optional: real programme blurb |
| Eligibility / duration | mostly real | Confirm against current norms |

This single file feeds the **Program Finder**, **department course cards**, and the
**`/programmes/<slug>` detail pages** — fix once, fixes all three.

---

## 3. Approvals & accreditation — `lib/home-data.ts` (`accreditations`)

| Field | Current (dummy) | Needed |
|---|---|---|
| Reference numbers | `F.No. .../XXXX`, `PCI Reg. No. ...` | **Real approval / affiliation / recognition numbers** |
| Certificate PDFs | 1-page dummy in `/public/docs/` | Real scanned approval letters / orders |
| DTE-MP logo | none (text fallback) | Official DTE-MP logo image → `public/accreditations/` |

(AICTE, PCI, RGPV, NCTE logos are real, pulled from Wikipedia.)

---

## 4. Placements — `lib/placements-data.ts`

| Field | Current (dummy) | Needed |
|---|---|---|
| Headline stats | `85% placed, 120+ recruiters, ₹6.5/₹3.2 LPA` | **Verified** placement %, recruiter count, packages |
| Year-wise record | 4 fake years | Real year-wise placed % / highest / offers |
| Recruiters | representative pharma names | Confirmed recruiter list (+ logos if available) |

Shows on the home placements band and `/placements`.

---

## 5. Testimonials — `lib/testimonials-data.ts`

3 entries with **dummy names** (Priya Sharma…) and **`pravatar` stock avatars**.
Need: real attributed student quotes, names, programme/batch, and photos (with
consent).

## 6. Alumni — `lib/alumni-data.ts`

6 **fully fabricated** profiles (name, batch, role, company, `pravatar` photo,
quote). Replace all with real alumni (with consent), or trim the list.

---

## 7. Leadership — `lib/home-data.ts` (`leadershipSnippet`) + `app/leadership/`

- Name is dummy (`Dr. Rakesh Sharma`). Need **real Chairman/Principal** name,
  designation, message, and photo (`/public/leaders/`).
- `app/leadership/page.tsx` may have additional placeholder profiles — verify.

## 8. Headline stats — `lib/home-data.ts` (`heroStats`)

`Established 2010`, `2,500+ students`, `120+ recruiters` are **guesses**. Confirm
establishment year and current student strength.

---

## 9. FAQ / Privacy / Terms

- `lib/faq-data.ts` — 8 generic answers; confirm fees/hostel/scholarship specifics.
- `app/privacy-policy/page.tsx`, `app/terms/page.tsx` — **boilerplate**, must be
  reviewed/approved by the institute (legal).

## 10. Mandatory disclosures — `app/mandatory-disclosures/page.tsx`

Placeholder official names, emails, contacts and **missing document links**
(committees, fee structure, anti-ragging, etc.). Client to provide the full
statutory disclosure set + PDFs.

## 11. Faculty — `lib/faculty-data.ts`

Verify faculty names, designations, qualifications and photos (`/public/faculty/`).

## 12. Gallery & events — `app/gallery/`, `lib/events-data.ts`, `/public/events/`

Replace sample images with an official campus/event photo set. **Also compress
the current `/public/events/*.jpg` — they are ~2 MB / 5880 px each**, which slows
the homepage "Life on campus" strip. Resize to ~1600 px wide before committing.

---

## Images to replace (lorem/stock → real)

| Placeholder source | Used for |
|---|---|
| `loremflickr.com/...` | Programme / course card images (topical lorem) |
| `i.pravatar.cc/...` | Testimonial & alumni avatars |
| `/public/docs/*.pdf` | Prospectus + approval certificates (all 1-page dummies) |
| `/public/headers/header.jpg` | Inner-page header banner (verify it's a real campus shot) |

> Once real images are in `/public`, switch the placeholder `<img>` tags to
> `next/image` for better performance (currently plain `<img>` because external
> lorem hosts aren't whitelisted in `next.config.ts`).

---

## Online application form — `components/forms/ApplicationForm.tsx`

Works in **demo mode** now (no DB → shows success). To capture real applications:

1. Create an `applications` table in Supabase (columns: name, email, mobile, dob,
   state, city, qualification, percentage, department, programme, message,
   `document_path`).
2. Create a public/authenticated **`applications` storage bucket** for uploads.
3. Add the table to `lib/database.types.ts` and remove the `as never` cast.
4. Add an RLS insert policy (see `supabase-rls-example.sql`).

---

## Environment variables (`.env`)

Set these in production so the dummies in `lib/site.ts` are overridden:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_HELPLINE=
NEXT_PUBLIC_WHATSAPP=
NEXT_PUBLIC_EMAIL=
NEXT_PUBLIC_LOGIN_URL=
NEXT_PUBLIC_STUDENT_LOGIN_URL=
NEXT_PUBLIC_FACULTY_LOGIN_URL=
NEXT_PUBLIC_PAYMENT_URL=
NEXT_PUBLIC_PROSPECTUS_URL=
NEXT_PUBLIC_LINKEDIN_URL=
```
