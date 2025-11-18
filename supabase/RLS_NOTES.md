# Supabase RLS & Security Notes

## Recommended Policies
Enable Row Level Security (RLS) on all tables that contain user-specific data:

1. `payments` (from 20241028125946): Only owner (user_id) can select/insert their own payment rows.
2. `newsletter_subscribers` (20251103100000): Allow insert for public (email capture) but select/update only for service role.
3. `free_resources` (20251103100000_free_resources.sql): Public read if resources are meant open; otherwise restrict to authenticated users.
4. `demo_users` (20241028130000_add_demo_users.sql): If used for onboarding, restrict select to service role or remove table in production.

## Example Policy Snippets
```sql
-- Enable RLS
alter table payments enable row level security;

-- Payments: owner can CRUD
create policy "payments_owner_access" on payments for all using ( auth.uid() = user_id );

-- Newsletter: allow public insert (no spam protection here - consider rate limit) but no select
alter table newsletter_subscribers enable row level security;
create policy "newsletter_public_insert" on newsletter_subscribers for insert with check ( true );
create policy "newsletter_no_public_select" on newsletter_subscribers for select using ( auth.role() = 'service_role' );

-- Free resources: public read
alter table free_resources enable row level security;
create policy "free_resources_public_read" on free_resources for select using ( true );
```

## Indexes & Performance
Add indexes on columns frequently filtered:
- `payments.user_id`
- `newsletter_subscribers.email` (unique + index)
- `free_resources.slug` (if slug used for retrieval)

## Environment Variables
Store service role key ONLY server-side. In frontend use anon key.

## Auditing
Consider an `audit_log` table with trigger capturing inserts/updates for critical tables.

## Next Steps
1. Review each migration file and confirm column naming for consistent `user_id`.
2. Apply policies in SQL editor.
3. Add automated test script for connectivity (optional).
4. Document any public endpoints exposed.

