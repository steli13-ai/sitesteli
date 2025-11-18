-- Newsletter subscribers table
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  created_at timestamptz not null default now()
);

-- Basic unique constraint to avoid duplicates
create unique index if not exists newsletter_subscribers_email_key
  on public.newsletter_subscribers (lower(email));

-- RLS
alter table public.newsletter_subscribers enable row level security;

-- Allow inserts from anon key (public website), but no select/update/delete
create policy anon_insert_newsletter on public.newsletter_subscribers
  for insert to anon
  with check (true);

revoke select, update, delete on public.newsletter_subscribers from anon;
