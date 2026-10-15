-- Anti-Ragging Cell page (/anti-ragging), edited in /admin → Anti-Ragging.
-- Settings is a single row (id = 1); blank fields fall back to the defaults in
-- lib/anti-ragging-data.ts. Lists are one point per line.

create table if not exists public.anti_ragging_settings (
  id int primary key default 1 check (id = 1),
  intro text,
  helpline_phone text,
  helpline_email text,
  college_contact text,
  what_is_ragging text,
  punishments text,
  undertaking text,
  appointment_order text,
  appointment_date text,
  pdf_url text,
  pdf_label text
);

create table if not exists public.anti_ragging_members (
  id bigint generated always as identity primary key,
  name text not null,
  role text,
  department text,
  mobile text,
  email text,
  sort int not null default 0
);

create table if not exists public.anti_ragging_documents (
  id bigint generated always as identity primary key,
  title text not null,
  year text,
  pdf_url text not null,
  sort int not null default 0
);

-- Public read, admin write (same as other content tables).
do $$
declare t text;
begin
  foreach t in array array['anti_ragging_settings','anti_ragging_members','anti_ragging_documents'] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "public read" on public.%I;', t);
    execute format('create policy "public read" on public.%I for select using (true);', t);
    execute format('drop policy if exists "admin write" on public.%I;', t);
    execute format('create policy "admin write" on public.%I for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

grant select on public.anti_ragging_settings, public.anti_ragging_members, public.anti_ragging_documents to anon, authenticated;
grant insert, update, delete on public.anti_ragging_settings, public.anti_ragging_members, public.anti_ragging_documents to authenticated;

-- Pre-fill the page text so the admin form starts with editable content.
insert into public.anti_ragging_settings
  (id, intro, helpline_phone, helpline_email, what_is_ragging, punishments, undertaking, pdf_label)
values (
  1,
  $t$Ragging in any form is strictly prohibited at Akhil Bharti Group of Institutes. It is a criminal offence and a violation of human dignity, and the Hon'ble Supreme Court of India has directed every institution of higher education to curb it.

The Anti-Ragging Committee and Anti-Ragging Squad work throughout the year to keep the campus, hostels and transport safe for every student. Awareness drives are held before each new session, and senior students are counselled on the consequences of ragging.

At the time of admission, every student and their parent/guardian must submit an anti-ragging undertaking. A student found guilty of ragging will face strict disciplinary action, including cancellation of admission.$t$,
  '1800-180-5522',
  'helpline@antiragging.in',
  $t$Any conduct, by words spoken or written or by an act, that teases, treats or handles a fresher or any other student with rudeness
Indulging in rowdy or undisciplined activities that cause annoyance, hardship or psychological harm
Asking a student to do any act that they would not do in the ordinary course and that causes shame, torment or embarrassment
Any act by a senior that prevents, disrupts or disturbs the regular academic activity of another student
Exploiting the services of a fresher for completing academic tasks assigned to an individual or group
Any act of financial extortion or forceful expenditure burden put on a fresher
Any act of physical abuse, including sexual abuse, homosexual assaults, stripping, forcing obscene and lewd acts, or gestures causing bodily harm
Any act or abuse by spoken words, emails, posts or public insults, including deriving perverted pleasure from the embarrassment of a fresher
Any act that affects the mental health and self-confidence of a fresher, with or without an intent to derive sadistic pleasure$t$,
  $t$Suspension from attending classes and academic privileges
Withholding or withdrawing scholarships, fellowships and other benefits
Debarring from appearing in any test or examination, or withholding results
Debarring from representing the institution in any event, tournament or youth festival
Suspension or expulsion from the hostel
Cancellation of admission
Rustication from the institution for a period of one to four semesters
Expulsion from the institution and debarring from admission to any other institution
Fine and collective punishment where the persons committing ragging are not identified
Registration of an FIR with the police under the relevant provisions of law$t$,
  $t$As per UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009, every student and their parent/guardian must submit an online anti-ragging undertaking at www.antiragging.in at the time of admission and at the start of every academic year, and submit a copy to the institute.$t$,
  'Download Anti-Ragging Policy (PDF)'
)
on conflict (id) do nothing;

-- Header menu: Students → Anti-Ragging Cell.
insert into public.nav_links (menu, label, href, sort)
select 'Students', 'Anti-Ragging Cell', '/anti-ragging', 52
where not exists (select 1 from public.nav_links where href = '/anti-ragging');
