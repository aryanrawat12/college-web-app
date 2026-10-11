-- Admission documents uploaded by students from /documents-required.
-- One row per submission; each doc_* column holds a private S3 key
-- (private/document/...) issued by /api/public-upload. Public insert,
-- admin read — same pattern as id_card_submissions.

create table if not exists public.student_documents (
  id bigint generated always as identity primary key,
  name text not null,
  course text not null,
  mobile text not null,
  email text not null,
  enrollment_no text,
  doc_10th text not null,
  doc_12th text not null,
  doc_tc text not null,
  doc_migration text,
  doc_gap text,
  doc_income text not null,
  doc_domicile text not null,
  doc_caste text,
  doc_aadhaar text not null,
  doc_samagra text not null,
  doc_mp_taas text,
  doc_otr text,
  doc_photo text not null,
  created_at timestamptz not null default now()
);

alter table public.student_documents enable row level security;

drop policy if exists "public insert" on public.student_documents;
create policy "public insert" on public.student_documents
  for insert with check (
    doc_10th like 'private/document/%'
    and doc_12th like 'private/document/%'
    and doc_tc like 'private/document/%'
    and doc_income like 'private/document/%'
    and doc_domicile like 'private/document/%'
    and doc_aadhaar like 'private/document/%'
    and doc_samagra like 'private/document/%'
    and doc_photo like 'private/document/%'
    and coalesce(doc_migration, 'private/document/') like 'private/document/%'
    and coalesce(doc_gap, 'private/document/') like 'private/document/%'
    and coalesce(doc_caste, 'private/document/') like 'private/document/%'
    and coalesce(doc_mp_taas, 'private/document/') like 'private/document/%'
    and coalesce(doc_otr, 'private/document/') like 'private/document/%'
  );

drop policy if exists "admin read" on public.student_documents;
create policy "admin read" on public.student_documents
  for select to authenticated using (true);

grant insert on public.student_documents to anon, authenticated;
grant select on public.student_documents to authenticated;
