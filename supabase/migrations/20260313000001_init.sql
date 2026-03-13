-- Places / Events table
create table if not exists public.places (
  id          bigserial primary key,
  title       text        not null,
  description text        not null default '',
  category    text        not null default 'Sights',
  address     text        not null default '',
  opening_hours text      not null default '',
  time        timestamptz,
  image_url   text        not null default '',
  coordinates jsonb       not null default '{"lat":47.4979,"lng":19.0402}'::jsonb,
  rating      numeric(3,1),
  hidden      boolean     not null default false,
  created_at  timestamptz not null default now()
);

-- Members table
create table if not exists public.members (
  id         bigserial primary key,
  name       text        not null,
  position   int         not null default 0,
  created_at timestamptz not null default now()
);

-- Storage bucket for event images
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

-- Allow public read on event-images
create policy "Public read event images"
  on storage.objects for select
  using ( bucket_id = 'event-images' );

-- Allow anyone to upload (no auth for this trip app)
create policy "Anyone can upload event images"
  on storage.objects for insert
  with check ( bucket_id = 'event-images' );

create policy "Anyone can update event images"
  on storage.objects for update
  using ( bucket_id = 'event-images' );

-- RLS: open access (group trip, no auth needed)
alter table public.places  enable row level security;
alter table public.members enable row level security;

create policy "Public full access to places"  on public.places  for all using (true) with check (true);
create policy "Public full access to members" on public.members for all using (true) with check (true);
