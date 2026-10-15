-- Header menu, editable from /admin → Site → Header Menu.
-- `menu` = dropdown name (rows sharing it form one dropdown, placed where its
-- lowest-sort item sits); null/blank = a top-level link. "Academics" keeps the
-- department mega-menu on desktop. If the table is empty the site falls back
-- to the static menu in lib/nav.ts.

create table if not exists public.nav_links (
  id bigint generated always as identity primary key,
  menu text,
  label text not null,
  href text not null,
  sort int not null default 0
);

alter table public.nav_links enable row level security;
drop policy if exists "public read" on public.nav_links;
create policy "public read" on public.nav_links for select using (true);
drop policy if exists "admin write" on public.nav_links;
create policy "admin write" on public.nav_links
  for all to authenticated using (true) with check (true);

grant select on public.nav_links to anon, authenticated;
grant insert, update, delete on public.nav_links to authenticated;

-- Seed with the current menu (only when empty).
insert into public.nav_links (menu, label, href, sort)
select * from (values
  ('About',      'About Us',                            '/about',                 20),
  ('About',      'Leadership',                          '/leadership',            21),
  ('About',      'Approvals & Accreditation',           '/approvals',             22),
  ('About',      'Alumni',                              '/alumni',                23),
  ('About',      'FAQs',                                '/faq',                   24),
  ('About',      'Mandatory Disclosures',               '/mandatory-disclosures', 25),
  ('About',      'Policies',                            '/policies',              26),
  ('About',      'Careers',                             '/careers',               27),
  ('Academics',  'All Programmes',                      '/programmes',            30),
  ('Academics',  'Pharmacy',                            '/pharmacy',              31),
  ('Academics',  'Management (MBA)',                    '/management',            32),
  ('Academics',  'Teaching Education (B.Ed & D.El.Ed)', '/teaching-education',    33),
  (null,         'Faculty',                             '/faculty',               35),
  ('Admissions', 'How to Apply',                        '/admissions',            40),
  ('Admissions', 'Apply Online',                        '/apply',                 41),
  ('Admissions', 'Enquire Now',                         '/enquiry',               42),
  ('Admissions', 'Download Prospectus',                 '/docs/prospectus.pdf',   43),
  ('Students',   'Documents (Checklist & Upload)',      '/documents-required',    50),
  ('Students',   'ID Card Details Form',                '/id-card',               51),
  (null,         'Placements',                          '/placements',            60),
  ('Media',      'Campus Events',                       '/campus-events',         70),
  ('Media',      'Gallery',                             '/gallery',               71),
  ('Media',      'Notices & Announcements',             '/notices',               72),
  ('Media',      'Choupal (Grievance)',                 '/choupal',               73),
  ('Media',      'News Tracker',                        '/news-tracker',          74),
  (null,         'Contact',                             '/contact-us',            80)
) as v(menu, label, href, sort)
where not exists (select 1 from public.nav_links);
