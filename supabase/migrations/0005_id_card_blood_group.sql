-- ID card form: blood group + parent/spouse contact (both mandatory in the
-- form; nullable here so rows submitted before this change stay valid).
alter table public.id_card_submissions
  add column if not exists blood_group text,
  add column if not exists parent_spouse_contact text;
