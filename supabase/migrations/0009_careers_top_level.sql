-- Careers moves out of the About dropdown to a top-level header link, in the
-- slot the Students dropdown used to occupy (between Admissions and Placements).
update public.nav_links
set menu = null, sort = 55
where href = '/careers';
