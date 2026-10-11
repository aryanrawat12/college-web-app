-- Optional: durable news-tracker state for serverless deploys.
-- Run in the Supabase SQL editor if you want checks to persist across invocations.

create table if not exists public.news_tracker_state (
  id int primary key default 1 check (id = 1),
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.news_tracker_state enable row level security;

-- Server uses the anon key already present in this app; allow read/write
-- for the single row when anon key is used from trusted server routes only.
-- Prefer a service-role key in production and tighten these policies.

create policy "Allow anon read news tracker state"
  on public.news_tracker_state
  for select
  to anon, authenticated
  using (true);

create policy "Allow anon upsert news tracker state"
  on public.news_tracker_state
  for all
  to anon, authenticated
  using (true)
  with check (true);
