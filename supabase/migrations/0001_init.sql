-- ABGI site — initial schema, RLS, and seed data.
-- Pattern: content tables are publicly READable; only authenticated (admin) can
-- write them. Submission tables (enquiries/grievances/applications) accept public
-- INSERT but are READable only by authenticated admins.
-- Images: URLs only (files live in external storage / AWS S3).

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────────
-- Submission tables (public INSERT, admin SELECT)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.enquiries (
  id bigint generated always as identity primary key,
  name text, email text, mobile text, state text, city text,
  department text, programme text,
  created_at timestamptz not null default now()
);

create table if not exists public.grievances (
  id bigint generated always as identity primary key,
  name text, enrollment_no text, programme text, year text, description text,
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id bigint generated always as identity primary key,
  name text, email text, mobile text, dob text, state text, city text,
  qualification text, percentage text, department text, programme text,
  message text, document_path text,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Content tables (public SELECT, admin write)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.announcements (
  id bigint generated always as identity primary key,
  description text not null,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.notices (
  id bigint generated always as identity primary key,
  description text not null,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.faculties (
  id bigint generated always as identity primary key,
  name text not null,
  designation text,
  bio text,
  photo_url text,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id bigint generated always as identity primary key,
  event_name text,
  event_description text,
  image_1_url text, image_2_url text, image_3_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.programmes (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  school text not null,
  level text not null,          -- Diploma | UG | PG
  level_label text not null,
  duration text,
  intake text,
  fees text,
  eligibility text,
  careers text,
  description text,
  mode text,
  approval text,
  image_url text,
  sort int not null default 0
);

create table if not exists public.accreditations (
  id bigint generated always as identity primary key,
  abbr text not null,
  name text not null,
  logo_url text,
  reg_no text,
  certificate_url text,
  sort int not null default 0
);

create table if not exists public.placement_stats (
  id bigint generated always as identity primary key,
  value text not null,
  label text not null,
  sort int not null default 0
);

create table if not exists public.placement_record (
  id bigint generated always as identity primary key,
  year text not null,
  placed text,
  highest text,
  offers int,
  sort int not null default 0
);

create table if not exists public.recruiters (
  id bigint generated always as identity primary key,
  name text not null,
  logo_url text,
  sort int not null default 0
);

create table if not exists public.testimonials (
  id bigint generated always as identity primary key,
  name text not null,
  detail text,
  quote text not null,
  photo_url text,
  sort int not null default 0
);

create table if not exists public.alumni (
  id bigint generated always as identity primary key,
  name text not null,
  batch text,
  programme text,
  role text,
  company text,
  photo_url text,
  quote text,
  sort int not null default 0
);

create table if not exists public.faqs (
  id bigint generated always as identity primary key,
  question text not null,
  answer text not null,
  sort int not null default 0
);

create table if not exists public.stats (
  id bigint generated always as identity primary key,
  value text not null,
  label text not null,
  sort int not null default 0
);

-- Single-row tables (id = 1)
create table if not exists public.leadership (
  id int primary key default 1,
  name text, role text, message text, image_url text,
  constraint leadership_singleton check (id = 1)
);

create table if not exists public.site_settings (
  id int primary key default 1,
  helpline text, whatsapp text,
  email1 text, email2 text, email3 text,
  address text, maps_url text, maps_query text,
  linkedin_url text, instagram_url text, youtube_url text,
  prospectus_url text,
  hero_title text, hero_subtitle text,
  constraint site_settings_singleton check (id = 1)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────────────────
do $$
declare t text;
begin
  -- content tables: public read, admin write
  foreach t in array array[
    'announcements','notices','faculties','events','programmes','accreditations',
    'placement_stats','placement_record','recruiters','testimonials','alumni',
    'faqs','stats','leadership','site_settings'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "public read" on public.%I;', t);
    execute format('create policy "public read" on public.%I for select using (true);', t);
    execute format('drop policy if exists "admin write" on public.%I;', t);
    execute format('create policy "admin write" on public.%I for all to authenticated using (true) with check (true);', t);
  end loop;

  -- submission tables: public insert, admin read
  foreach t in array array['enquiries','grievances','applications'] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "public insert" on public.%I;', t);
    execute format('create policy "public insert" on public.%I for insert with check (true);', t);
    execute format('drop policy if exists "admin read" on public.%I;', t);
    execute format('create policy "admin read" on public.%I for select to authenticated using (true);', t);
  end loop;
end $$;
