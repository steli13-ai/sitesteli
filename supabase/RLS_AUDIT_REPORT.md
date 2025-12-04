# Supabase RLS Audit Report

Date: 2025-12-03

## Summary
RLS is enabled and enforced on user-related tables. Policies follow owner-only access patterns; public content has explicit public read. Newsletter captures allow anon inserts without public read. Exam submissions restrict to owners and private storage bucket with prefix policies. No service role keys are exposed client-side; frontend uses anon key.

## Tables & Policies Reviewed
- user_profiles: RLS enabled; `id = auth.uid()` owner policy (ALL) ✔️
- subscriptions: RLS enabled; owner policy (ALL) ✔️
- payments: RLS enabled; owner policy (ALL) ✔️
- user_progress: RLS enabled; owner policy (ALL) ✔️
- saved_worksheets: RLS enabled; owner policy (ALL) ✔️
- newsletter_subscribers: RLS enabled; `anon` insert only; `revoke select/update/delete` for anon ✔️
- resources (free_resources): RLS enabled; public SELECT; admin write via role check in user_profiles ✔️
- exam_submissions: RLS enabled; owner SELECT/INSERT; admin ALL optional; storage bucket prefix policies ✔️

## Gaps & Recommendations
1. Demo users migration is for test/dev. Ensure it is not applied to production or remove in prod.
2. Add rate limiting/captcha on newsletter endpoint at the edge (Netlify Function or third-party) to mitigate spam.
3. Log scrubbing: Implemented PII redaction in `src/utils/logger.js` and Sentry hook in `src/lib/monitoring.js`.
4. Service role usage: Keep service role keys server-side (Netlify Functions). Avoid exposing in frontend.
5. Indexes: Consider additional indexes on frequently queried columns: `resources.type`, `resources.grade`, `resources.subject` if filtered.

## Next steps
- Verify policies are deployed in Supabase project (SQL editor or migration apply).
- Add integration tests for authenticated vs anon access (optional, via Supabase client on CI with test keys).
- Review any serverless functions that touch Supabase and ensure service-role usage stays server-only.
