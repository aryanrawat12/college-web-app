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
