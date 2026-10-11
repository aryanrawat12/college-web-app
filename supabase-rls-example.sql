-- Run in Supabase SQL Editor after creating tables.
-- Allows public read + form inserts via the anon key (adjust for production).

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE grievances ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read faculties" ON faculties FOR SELECT USING (true);
CREATE POLICY "Public read announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Public read notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);

CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert grievances" ON grievances FOR INSERT WITH CHECK (true);

-- Campus facilities (admin-editable cards on the homepage).
CREATE TABLE IF NOT EXISTS facilities (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title     text NOT NULL,
  body      text,
  image_url text,
  sort      integer NOT NULL DEFAULT 0
);
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read facilities" ON facilities FOR SELECT USING (true);
-- Logged-in admin (Supabase Auth) can create/edit/delete.
CREATE POLICY "Auth write facilities" ON facilities
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- "Why ABGI" highlight cards (admin-editable on the homepage).
CREATE TABLE IF NOT EXISTS why_choose_us (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title     text NOT NULL,
  body      text,
  image_url text,
  sort      integer NOT NULL DEFAULT 0
);
ALTER TABLE why_choose_us ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read why_choose_us" ON why_choose_us FOR SELECT USING (true);
CREATE POLICY "Auth write why_choose_us" ON why_choose_us
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Homepage section order (admin drags/sorts; page.tsx renders by `sort`).
CREATE TABLE IF NOT EXISTS home_sections (
  id    bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key   text NOT NULL UNIQUE,
  label text NOT NULL,
  sort  integer NOT NULL DEFAULT 0
);
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read home_sections" ON home_sections FOR SELECT USING (true);
CREATE POLICY "Auth write home_sections" ON home_sections
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Editable eyebrow/heading/description (+ hero CTA labels) per homepage section.
CREATE TABLE IF NOT EXISTS section_content (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key           text NOT NULL UNIQUE,
  eyebrow       text,
  heading       text,
  description   text,
  cta_primary   text,
  cta_secondary text,
  sort          integer NOT NULL DEFAULT 0
);
ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read section_content" ON section_content FOR SELECT USING (true);
CREATE POLICY "Auth write section_content" ON section_content
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
