create or replace function public.get_member_sessions()
returns table (
  id uuid,
  title text,
  session_type public.session_type,
  starts_at timestamptz,
  ends_at timestamptz,
  location text,
  capacity integer,
  booked_count bigint,
  user_booked boolean,
  coach_name text
)
language sql
security definer
set search_path = public
as $$
  with active_season as (
    select s.id
    from public.seasons s
    where s.is_active = true
    order by s.starts_at desc
    limit 1
  ),
  booking_counts as (
    select b.session_id, count(*)::bigint as booked_count
    from public.bookings b
    where b.status = 'confirmed'
    group by b.session_id
  ),
  user_bookings as (
    select b.session_id, true as user_booked
    from public.bookings b
    where b.user_id = auth.uid()
      and b.status = 'confirmed'
  ),
  coach_labels as (
    select
      sc.session_id,
      concat_ws(' ', p.first_name, p.last_name) as coach_name,
      row_number() over (
        partition by sc.session_id
        order by sc.assigned_at asc
      ) as rn
    from public.session_coaches sc
    left join public.profiles p on p.user_id = sc.user_id
  )
  select
    s.id,
    s.title,
    s.session_type,
    s.starts_at,
    s.ends_at,
    s.location,
    s.capacity,
    coalesce(bc.booked_count, 0) as booked_count,
    coalesce(ub.user_booked, false) as user_booked,
    coalesce(cl.coach_name, 'Coach a definir') as coach_name
  from public.sessions s
  join active_season a on a.id = s.season_id
  left join booking_counts bc on bc.session_id = s.id
  left join user_bookings ub on ub.session_id = s.id
  left join coach_labels cl on cl.session_id = s.id and cl.rn = 1
  where s.status = 'scheduled'
    and s.starts_at >= now() - interval '1 hour'
  order by s.starts_at asc;
$$;

create or replace function public.book_session(target_session_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  active_season_id uuid;
  membership_ok boolean;
  session_capacity integer;
  confirmed_count integer;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select s.id
  into active_season_id
  from public.seasons s
  where s.is_active = true
  order by s.starts_at desc
  limit 1;

  if active_season_id is null then
    raise exception 'No active season';
  end if;

  select exists (
    select 1
    from public.memberships m
    where m.user_id = auth.uid()
      and m.season_id = active_season_id
      and m.status = 'active'
  )
  into membership_ok;

  if not membership_ok then
    raise exception 'Active membership required';
  end if;

  select s.capacity
  into session_capacity
  from public.sessions s
  where s.id = target_session_id
    and s.season_id = active_season_id
    and s.status = 'scheduled';

  if session_capacity is null then
    raise exception 'Session not available';
  end if;

  perform 1
  from public.bookings b
  where b.session_id = target_session_id
    and b.user_id = auth.uid()
    and b.status = 'confirmed';

  if found then
    raise exception 'Already booked';
  end if;

  select count(*)
  into confirmed_count
  from public.bookings b
  where b.session_id = target_session_id
    and b.status = 'confirmed';

  if confirmed_count >= session_capacity then
    raise exception 'Session full';
  end if;

  update public.bookings
  set
    status = 'confirmed',
    cancelled_at = null,
    cancel_reason = null
  where session_id = target_session_id
    and user_id = auth.uid()
    and status = 'cancelled';

  if not found then
    insert into public.bookings (session_id, user_id, status)
    values (target_session_id, auth.uid(), 'confirmed');
  end if;
end;
$$;

create or replace function public.cancel_booking(target_session_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  update public.bookings
  set
    status = 'cancelled',
    cancelled_at = now(),
    cancel_reason = 'cancelled_by_user'
  where session_id = target_session_id
    and user_id = auth.uid()
    and status = 'confirmed';

  if not found then
    raise exception 'No active booking found';
  end if;
end;
$$;

grant execute on function public.get_member_sessions() to authenticated;
grant execute on function public.book_session(uuid) to authenticated;
grant execute on function public.cancel_booking(uuid) to authenticated;
