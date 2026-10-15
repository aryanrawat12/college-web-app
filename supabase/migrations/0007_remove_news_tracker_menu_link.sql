-- News Tracker is now an admin-only tool (/admin/news-tracker, linked from
-- the admin sidebar), so drop its public header-menu entry.
delete from public.nav_links where href = '/news-tracker';
