-- Site colour theme, chosen in /admin → Site Settings → Site Theme.
-- Values match lib/themes.ts; anything else falls back to the default.
alter table public.site_settings
  add column if not exists theme text not null default 'default';

alter table public.site_settings
  drop constraint if exists site_settings_theme_check;
alter table public.site_settings
  add constraint site_settings_theme_check
  check (theme in ('default', 'royal-purple', 'ocean-blue'));
