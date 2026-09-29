-- Run this once in the Supabase SQL Editor to repair existing deployments.
-- Grants control whether a role can reach the table; RLS policies below control rows.
grant usage on schema public to anon, authenticated;
revoke all on table public.entries from anon;
grant select on table public.entries to anon;
grant select, insert, update, delete on table public.entries to authenticated;
