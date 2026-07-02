create extension if not exists "pgcrypto";

do $$
declare
  admin_user_id uuid;
begin
  select id into admin_user_id
  from auth.users
  where email = 'admin@dubai-estate.local'
  limit 1;

  if admin_user_id is null then
    admin_user_id := gen_random_uuid();

    insert into auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    )
    values (
      admin_user_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'admin@dubai-estate.local',
      crypt('Dubai2026!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  else
    update auth.users
    set encrypted_password = crypt('Dubai2026!', gen_salt('bf')),
        email_confirmed_at = coalesce(email_confirmed_at, now()),
        updated_at = now()
    where id = admin_user_id;
  end if;

  insert into auth.identities (
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
  values (
    'admin@dubai-estate.local',
    admin_user_id,
    jsonb_build_object(
      'sub', admin_user_id::text,
      'email', 'admin@dubai-estate.local',
      'email_verified', true
    ),
    'email',
    now(),
    now(),
    now()
  )
  on conflict (provider, provider_id) do update
  set user_id = excluded.user_id,
      identity_data = excluded.identity_data,
      updated_at = now();
end $$;

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

delete from public.properties
where title in (
  'Marina Sky Residences',
  'Palm Horizon Villas',
  'Downtown Boulevard',
  'Creek Harbour Lofts',
  'Business Bay Canal',
  'Dubai Hills Park Gate'
);

insert into public.properties (
  title,
  district,
  type,
  price,
  area,
  bedrooms,
  roi,
  handover,
  developer,
  description,
  installment,
  tour,
  image,
  gallery,
  x,
  y
)
values
  (
    'Marina Sky Residences',
    'Dubai Marina',
    'Апартаменты',
    420000,
    82,
    1,
    '8.4%',
    'Q4 2026',
    'Emaar',
    'Апартаменты у набережной Dubai Marina с видом на воду, инфраструктурой резорта и высоким арендным спросом.',
    true,
    true,
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85',
    '[]'::jsonb,
    41,
    59
  ),
  (
    'Palm Horizon Villas',
    'Palm Jumeirah',
    'Вилла',
    1850000,
    310,
    4,
    '6.9%',
    'Готовый',
    'Damac',
    'Готовая вилла на Palm Jumeirah для жизни у моря и премиальной долгосрочной аренды.',
    false,
    true,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    '[]'::jsonb,
    28,
    46
  ),
  (
    'Downtown Boulevard',
    'Downtown Dubai',
    'Пентхаус',
    980000,
    145,
    2,
    '7.6%',
    'Q2 2027',
    'Ellington',
    'Пентхаус рядом с Burj Khalifa, торговыми галереями и ресторанной инфраструктурой Downtown Dubai.',
    true,
    true,
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
    '[]'::jsonb,
    58,
    42
  ),
  (
    'Creek Harbour Lofts',
    'Creek Harbour',
    'Апартаменты',
    315000,
    68,
    1,
    '8.9%',
    'Q1 2026',
    'Emaar',
    'Лофт в Creek Harbour с быстрым доступом к набережной, паркам и новой деловой инфраструктуре.',
    true,
    false,
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
    '[]'::jsonb,
    71,
    55
  ),
  (
    'Business Bay Canal',
    'Business Bay',
    'Студия',
    220000,
    44,
    0,
    '9.1%',
    'Готовый',
    'Sobha',
    'Компактная студия у канала Business Bay для арендной стратегии и коротких деловых поездок.',
    false,
    true,
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    '[]'::jsonb,
    54,
    51
  ),
  (
    'Dubai Hills Park Gate',
    'Dubai Hills',
    'Апартаменты',
    560000,
    118,
    2,
    '7.8%',
    'Q3 2026',
    'Emaar',
    'Семейные апартаменты рядом с парком Dubai Hills, школами, моллом и зелёными прогулочными зонами.',
    true,
    false,
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
    '[]'::jsonb,
    46,
    72
  );
