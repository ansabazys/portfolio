create table if not exists public.entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('blog', 'thought')),
  title text not null check (char_length(title) between 1 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text,
  content text not null,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.entries enable row level security;

revoke all on table public.entries from anon;
grant select on table public.entries to anon;
grant select, insert, update, delete on table public.entries to authenticated;

create policy "Anyone can read published entries"
on public.entries for select
using (published = true or auth.uid() = user_id);

create policy "Authors can create their entries"
on public.entries for insert to authenticated
with check (auth.uid() = user_id);

create policy "Authors can update their entries"
on public.entries for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Authors can delete their entries"
on public.entries for delete to authenticated
using (auth.uid() = user_id);

