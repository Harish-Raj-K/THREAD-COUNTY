-- ThreadCounty Database Schema (Supabase / PostgreSQL)
-- Run this in the Supabase SQL editor. Assumes Supabase Auth is used for
-- authentication; `auth.users` is the built-in Supabase auth table.

-- ============================================================
-- 1. PROFILES
-- One row per authenticated user, extending auth.users.
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  plan text not null default 'Free' check (plan in ('Free', 'Student', 'Professional', 'Enterprise')),
  storage_used_mb numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 2. UPLOADS
-- Metadata for each fabric image uploaded by a user.
-- Actual image bytes live in Supabase Storage; this row stores the
-- storage path/URL plus validation info.
-- ============================================================
create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  file_path text not null,        -- path in Supabase Storage bucket
  file_size_kb numeric not null,
  mime_type text not null check (mime_type in ('image/jpeg', 'image/jpg', 'image/png')),
  status text not null default 'uploaded' check (status in ('uploaded', 'processing', 'analyzed', 'failed')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- 3. REPORTS
-- AI analysis result generated for an upload (1:1 with uploads).
-- ============================================================
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.uploads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  thread_density numeric,
  warp_count integer,
  weft_count integer,
  fabric_type text,
  confidence_score numeric,
  ai_suggestions jsonb default '[]'::jsonb,
  report_url text,                -- generated PDF stored in Supabase Storage
  created_at timestamptz not null default now()
);

-- ============================================================
-- 4. SUBSCRIPTIONS
-- Tracks each user's billing plan and status.
-- ============================================================
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('Free', 'Student', 'Professional', 'Enterprise')),
  status text not null default 'active' check (status in ('active', 'cancelled', 'past_due')),
  started_at timestamptz not null default now(),
  renews_at timestamptz,
  cancelled_at timestamptz
);

-- ============================================================
-- 5. CONTACT_MESSAGES
-- Submissions from the public Contact page.
-- ============================================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now(),
  resolved boolean not null default false
);

-- ============================================================
-- 6. NOTIFICATIONS
-- In-app notifications for users (e.g. "Your analysis is ready").
-- ============================================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_uploads_user_id on public.uploads(user_id);
create index if not exists idx_reports_user_id on public.reports(user_id);
create index if not exists idx_reports_upload_id on public.reports(upload_id);
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_notifications_user_id on public.notifications(user_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Users can only read/write their own rows. Admins (flagged via a
-- custom `is_admin` claim or a separate admins table) bypass these.
-- ============================================================
alter table public.profiles enable row level security;
alter table public.uploads enable row level security;
alter table public.reports enable row level security;
alter table public.subscriptions enable row level security;
alter table public.contact_messages enable row level security;
alter table public.notifications enable row level security;

-- Profiles: users can view/update only their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Uploads: users manage only their own uploads
create policy "Users can view own uploads" on public.uploads
  for select using (auth.uid() = user_id);
create policy "Users can insert own uploads" on public.uploads
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own uploads" on public.uploads
  for delete using (auth.uid() = user_id);

-- Reports: users view/delete only their own reports
create policy "Users can view own reports" on public.reports
  for select using (auth.uid() = user_id);
create policy "Users can delete own reports" on public.reports
  for delete using (auth.uid() = user_id);

-- Subscriptions: users view only their own subscription
create policy "Users can view own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Notifications: users view/update only their own notifications
create policy "Users can view own notifications" on public.notifications
  for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on public.notifications
  for update using (auth.uid() = user_id);

-- Contact messages: anyone can insert (public contact form);
-- only authenticated admins should be able to read/resolve them
-- (wire up an admin policy once an `admins` table or custom claim exists).
create policy "Anyone can submit a contact message" on public.contact_messages
  for insert with check (true);

-- ============================================================
-- TRIGGER: auto-create a profile row when a new auth user signs up
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
