create extension if not exists "pgcrypto";

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  district text not null,
  type text default '',
  price numeric default 0,
  area numeric default 0,
  bedrooms integer default 0,
  roi text default '',
  handover text default '',
  developer text default '',
  description text default '',
  installment boolean default false,
  tour boolean default false,
  image text default '',
  gallery jsonb default '[]'::jsonb,
  x numeric default 50,
  y numeric default 50,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.properties enable row level security;

drop policy if exists "Public can read properties" on public.properties;
create policy "Public can read properties"
on public.properties for select
using (true);

drop policy if exists "Authenticated users can manage properties" on public.properties;
create policy "Authenticated users can manage properties"
on public.properties for all
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('property-media', 'property-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read property media" on storage.objects;
create policy "Public can read property media"
on storage.objects for select
using (bucket_id = 'property-media');

drop policy if exists "Authenticated users can upload property media" on storage.objects;
create policy "Authenticated users can upload property media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'property-media');

drop policy if exists "Authenticated users can update property media" on storage.objects;
create policy "Authenticated users can update property media"
on storage.objects for update
to authenticated
using (bucket_id = 'property-media')
with check (bucket_id = 'property-media');

drop policy if exists "Authenticated users can delete property media" on storage.objects;
create policy "Authenticated users can delete property media"
on storage.objects for delete
to authenticated
using (bucket_id = 'property-media');
