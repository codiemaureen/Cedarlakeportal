-- Run in Supabase SQL Editor after reviewing any pre-existing profiles table.
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null default '',
 role text not null default 'employee' check (role in ('employee','admin')),
 active boolean not null default true,
 created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
revoke all on public.profiles from anon;
grant select on public.profiles to authenticated;
create policy "users read own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);
-- Create users in Authentication > Users, then insert their matching UUID:
-- insert into public.profiles(id,full_name,role) values ('AUTH_USER_UUID','Employee Name','employee');
