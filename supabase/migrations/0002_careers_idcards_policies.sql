-- Careers (job posts + applications), student ID-card submissions, policy PDFs.
-- Same RLS pattern as 0001: content tables are public-read / admin-write;
-- submission tables are public-insert / admin-read.
-- Resumes and ID photos are stored privately in S3 (`private/...` keys); only
-- the object key is saved here and admins open them via presigned URLs.

-- ─────────────────────────────────────────────────────────────────────────────
-- Content tables
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.jobs (
  id bigint generated always as identity primary key,
  title text not null,
  department text,
  location text,
  employment_type text,
  qualification text,
  experience text,
  description text,
  last_date date,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.policies (
  id bigint generated always as identity primary key,
  title text not null,
  category text,
  description text,
  pdf_url text not null,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Submission tables
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.job_applications (
  id bigint generated always as identity primary key,
  job_id bigint references public.jobs (id) on delete set null,
  job_title text,
  name text not null,
  email text not null,
  mobile text not null,
  qualification text,
  experience text,
  message text,
  resume_key text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.id_card_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  enrollment_no text not null,
  course text not null,
  batch text not null,
  dob date not null,
  contact text not null,
  father_name text not null,
  mother_name text not null,
  local_address text not null,
  photo_key text not null,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array['jobs','policies'] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "public read" on public.%I;', t);
    execute format('create policy "public read" on public.%I for select using (true);', t);
    execute format('drop policy if exists "admin write" on public.%I;', t);
    execute format('create policy "admin write" on public.%I for all to authenticated using (true) with check (true);', t);
  end loop;

  foreach t in array array['job_applications','id_card_submissions'] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "public insert" on public.%I;', t);
    execute format('drop policy if exists "admin read" on public.%I;', t);
    execute format('create policy "admin read" on public.%I for select to authenticated using (true);', t);
  end loop;
end $$;

-- Public insert, but only with a file key issued by /api/public-upload.
create policy "public insert" on public.job_applications
  for insert with check (resume_key like 'private/resume/%');
create policy "public insert" on public.id_card_submissions
  for insert with check (photo_key like 'private/id-photo/%');

-- Table privileges (RLS above still decides which rows).
grant select on public.jobs, public.policies to anon, authenticated;
grant insert, update, delete on public.jobs, public.policies to authenticated;
grant insert on public.job_applications, public.id_card_submissions to anon, authenticated;
grant select on public.job_applications, public.id_card_submissions to authenticated;
