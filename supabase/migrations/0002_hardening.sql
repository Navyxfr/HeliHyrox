create type public.visibility_level as enum (
  'public',
  'members'
);

create type public.session_type as enum (
  'hyrox',
  'strength',
  'conditioning',
  'mobility',
  'open_gym',
  'other'
);

create type public.notification_type as enum (
  'application_received',
  'application_changes_requested',
  'application_approved',
  'booking_confirmed',
  'booking_cancelled',
  'news_published',
  'general'
);

alter table public.news_posts
  alter column visibility drop default;

alter table public.news_posts
  alter column visibility type public.visibility_level
  using visibility::public.visibility_level;

alter table public.news_posts
  alter column visibility set default 'members'::public.visibility_level;

alter table public.sessions
  alter column session_type type public.session_type
  using session_type::public.session_type;

alter table public.notifications
  alter column type drop default;

alter table public.notifications
  alter column type type public.notification_type
  using type::public.notification_type;

drop index if exists public.bookings_unique_active_idx;
create unique index bookings_unique_active_idx
  on public.bookings (session_id, user_id)
  where status = 'confirmed';

drop index if exists public.memberships_active_per_user_season_idx;
create unique index memberships_active_per_user_season_idx
  on public.memberships (user_id, season_id)
  where status = 'active';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger seasons_set_updated_at
before update on public.seasons
for each row execute function public.set_updated_at();

create trigger membership_applications_set_updated_at
before update on public.membership_applications
for each row execute function public.set_updated_at();

create trigger memberships_set_updated_at
before update on public.memberships
for each row execute function public.set_updated_at();

create trigger news_posts_set_updated_at
before update on public.news_posts
for each row execute function public.set_updated_at();

create trigger sessions_set_updated_at
before update on public.sessions
for each row execute function public.set_updated_at();

create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

create or replace function public.has_role(requested_role public.user_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.role = requested_role
  );
$$;

create or replace function public.has_active_membership()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.memberships m
    where m.user_id = auth.uid()
      and m.status = 'active'
  );
$$;

create or replace function public.is_session_coach(target_session_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.session_coaches sc
    where sc.session_id = target_session_id
      and sc.user_id = auth.uid()
  );
$$;

alter table public.profiles enable row level security;
alter table public.seasons enable row level security;
alter table public.membership_applications enable row level security;
alter table public.application_documents enable row level security;
alter table public.memberships enable row level security;
alter table public.user_roles enable row level security;
alter table public.news_posts enable row level security;
alter table public.sessions enable row level security;
alter table public.session_coaches enable row level security;
alter table public.bookings enable row level security;
alter table public.movements enable row level security;
alter table public.records enable row level security;
alter table public.notifications enable row level security;

create policy profiles_select_own_or_admin
on public.profiles
for select
using (user_id = auth.uid() or public.has_role('admin'));

create policy profiles_update_own_or_admin
on public.profiles
for update
using (user_id = auth.uid() or public.has_role('admin'))
with check (user_id = auth.uid() or public.has_role('admin'));

create policy profiles_insert_own_or_admin
on public.profiles
for insert
with check (user_id = auth.uid() or public.has_role('admin'));

create policy seasons_select_active_or_admin
on public.seasons
for select
using (is_active or public.has_role('admin'));

create policy seasons_admin_manage
on public.seasons
for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy membership_applications_select_own_or_admin
on public.membership_applications
for select
using (user_id = auth.uid() or public.has_role('admin'));

create policy membership_applications_insert_own
on public.membership_applications
for insert
with check (user_id = auth.uid() or public.has_role('admin'));

create policy membership_applications_update_own_or_admin
on public.membership_applications
for update
using (user_id = auth.uid() or public.has_role('admin'))
with check (user_id = auth.uid() or public.has_role('admin'));

create policy application_documents_select_own_or_admin
on public.application_documents
for select
using (
  exists (
    select 1
    from public.membership_applications ma
    where ma.id = application_id
      and ma.user_id = auth.uid()
  )
  or public.has_role('admin')
);

create policy application_documents_insert_own_or_admin
on public.application_documents
for insert
with check (
  exists (
    select 1
    from public.membership_applications ma
    where ma.id = application_id
      and ma.user_id = auth.uid()
  )
  or public.has_role('admin')
);

create policy application_documents_update_own_or_admin
on public.application_documents
for update
using (
  exists (
    select 1
    from public.membership_applications ma
    where ma.id = application_id
      and ma.user_id = auth.uid()
  )
  or public.has_role('admin')
)
with check (
  exists (
    select 1
    from public.membership_applications ma
    where ma.id = application_id
      and ma.user_id = auth.uid()
  )
  or public.has_role('admin')
);

create policy memberships_select_own_or_admin
on public.memberships
for select
using (user_id = auth.uid() or public.has_role('admin'));

create policy memberships_admin_manage
on public.memberships
for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy user_roles_select_own_or_admin
on public.user_roles
for select
using (user_id = auth.uid() or public.has_role('admin'));

create policy user_roles_admin_manage
on public.user_roles
for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy news_posts_public_read
on public.news_posts
for select
using (
  published_at is not null
  and (
    visibility = 'public'
    or public.has_active_membership()
    or public.has_role('coach')
    or public.has_role('admin')
  )
);

create policy news_posts_admin_manage
on public.news_posts
for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy sessions_select_authenticated_or_admin
on public.sessions
for select
using (
  public.has_active_membership()
  or public.has_role('coach')
  or public.has_role('admin')
);

create policy sessions_admin_manage
on public.sessions
for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy session_coaches_select_own_or_admin
on public.session_coaches
for select
using (user_id = auth.uid() or public.has_role('admin'));

create policy session_coaches_admin_manage
on public.session_coaches
for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy bookings_select_own_coach_or_admin
on public.bookings
for select
using (
  user_id = auth.uid()
  or public.is_session_coach(session_id)
  or public.has_role('admin')
);

create policy bookings_insert_own_or_admin
on public.bookings
for insert
with check (
  (user_id = auth.uid() and public.has_active_membership())
  or public.has_role('admin')
);

create policy bookings_update_own_or_admin
on public.bookings
for update
using (
  (user_id = auth.uid() and public.has_active_membership())
  or public.has_role('admin')
)
with check (
  (user_id = auth.uid() and public.has_active_membership())
  or public.has_role('admin')
);

create policy movements_read_all
on public.movements
for select
using (is_active or public.has_role('admin'));

create policy movements_admin_manage
on public.movements
for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy records_select_own_or_admin
on public.records
for select
using (
  (user_id = auth.uid() and public.has_active_membership())
  or public.has_role('admin')
);

create policy records_insert_own_or_admin
on public.records
for insert
with check (
  (user_id = auth.uid() and public.has_active_membership())
  or public.has_role('admin')
);

create policy records_update_own_or_admin
on public.records
for update
using (
  (user_id = auth.uid() and public.has_active_membership())
  or public.has_role('admin')
)
with check (
  (user_id = auth.uid() and public.has_active_membership())
  or public.has_role('admin')
);

create policy notifications_select_own_or_admin
on public.notifications
for select
using (user_id = auth.uid() or public.has_role('admin'));

create policy notifications_insert_admin
on public.notifications
for insert
with check (public.has_role('admin'));

create policy notifications_update_own_or_admin
on public.notifications
for update
using (user_id = auth.uid() or public.has_role('admin'))
with check (user_id = auth.uid() or public.has_role('admin'));

insert into storage.buckets (id, name, public)
values ('membership-documents', 'membership-documents', false)
on conflict (id) do nothing;

create policy membership_documents_select_own_or_admin
on storage.objects
for select
using (
  bucket_id = 'membership-documents'
  and (
    (storage.foldername(name))[3] = auth.uid()::text
    or public.has_role('admin')
  )
);

create policy membership_documents_insert_own_or_admin
on storage.objects
for insert
with check (
  bucket_id = 'membership-documents'
  and (
    (storage.foldername(name))[3] = auth.uid()::text
    or public.has_role('admin')
  )
);

create policy membership_documents_update_own_or_admin
on storage.objects
for update
using (
  bucket_id = 'membership-documents'
  and (
    (storage.foldername(name))[3] = auth.uid()::text
    or public.has_role('admin')
  )
)
with check (
  bucket_id = 'membership-documents'
  and (
    (storage.foldername(name))[3] = auth.uid()::text
    or public.has_role('admin')
  )
);

create policy membership_documents_delete_own_or_admin
on storage.objects
for delete
using (
  bucket_id = 'membership-documents'
  and (
    (storage.foldername(name))[3] = auth.uid()::text
    or public.has_role('admin')
  )
);
