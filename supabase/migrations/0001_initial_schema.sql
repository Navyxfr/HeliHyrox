create extension if not exists pgcrypto;

create type public.application_status as enum (
  'draft',
  'incomplete',
  'pending_review',
  'changes_requested',
  'approved',
  'rejected'
);

create type public.document_type as enum (
  'medical_certificate',
  'payment_proof',
  'other'
);

create type public.document_status as enum (
  'uploaded',
  'accepted',
  'rejected'
);

create type public.membership_status as enum (
  'active',
  'suspended',
  'expired',
  'cancelled'
);

create type public.user_role as enum (
  'member',
  'coach',
  'admin'
);

create type public.session_status as enum (
  'scheduled',
  'cancelled',
  'completed'
);

create type public.booking_status as enum (
  'confirmed',
  'cancelled',
  'no_show'
);

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  phone text,
  date_of_birth date,
  emergency_contact_name text,
  emergency_contact_phone text,
  employee_identifier text,
  is_public_profile boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.seasons (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  membership_fee_cents integer not null,
  max_active_bookings integer not null default 5,
  default_cancellation_deadline_hours integer not null default 2,
  rib_label text not null,
  rib_iban text not null,
  rib_bic text not null,
  rules_document_url text,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  season_id uuid not null references public.seasons(id) on delete restrict,
  status public.application_status not null default 'draft',
  submitted_at timestamptz,
  validated_at timestamptz,
  validated_by uuid references auth.users(id) on delete set null,
  review_comment text,
  rules_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, season_id)
);

create table public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.membership_applications(id) on delete cascade,
  document_type public.document_type not null,
  storage_path text not null,
  status public.document_status not null default 'uploaded',
  uploaded_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  review_comment text
);

create index application_documents_application_idx
  on public.application_documents (application_id);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  season_id uuid not null references public.seasons(id) on delete restrict,
  application_id uuid not null unique references public.membership_applications(id) on delete restrict,
  status public.membership_status not null default 'active',
  activated_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index memberships_active_per_user_season_idx
  on public.memberships (user_id, season_id);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.user_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  content text not null,
  cover_image_url text,
  visibility text not null default 'members',
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.seasons(id) on delete restrict,
  session_type text not null,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  capacity integer not null,
  location text,
  status public.session_status not null default 'scheduled',
  booking_opens_at timestamptz,
  booking_closes_at timestamptz,
  cancellation_deadline_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sessions_starts_at_idx on public.sessions (starts_at);

create table public.session_coaches (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references auth.users(id) on delete set null,
  unique (session_id, user_id)
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status public.booking_status not null default 'confirmed',
  booked_at timestamptz not null default now(),
  cancelled_at timestamptz,
  cancel_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index bookings_unique_active_idx
  on public.bookings (session_id, user_id);

create table public.movements (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  unit text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  movement_id uuid not null references public.movements(id) on delete restrict,
  value numeric not null,
  value_label text not null,
  performed_on date not null,
  created_at timestamptz not null default now()
);

create index records_user_movement_idx
  on public.records (user_id, movement_id, performed_on desc);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index notifications_user_created_idx
  on public.notifications (user_id, created_at desc);
