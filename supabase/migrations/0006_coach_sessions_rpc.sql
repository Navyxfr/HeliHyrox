create or replace function public.get_coach_sessions()
returns table (
  id uuid,
  title text,
  starts_at timestamptz,
  ends_at timestamptz,
  location text,
  capacity integer,
  booked_count bigint,
  attendees jsonb
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not (public.has_role('coach') or public.has_role('admin')) then
    raise exception 'Coach role required';
  end if;

  return query
  select
    s.id,
    s.title,
    s.starts_at,
    s.ends_at,
    s.location,
    s.capacity,
    count(b.id)::bigint as booked_count,
    coalesce(
      jsonb_agg(
        distinct jsonb_build_object(
          'user_id', p.user_id,
          'full_name', concat_ws(' ', p.first_name, p.last_name)
        )
      ) filter (where b.id is not null),
      '[]'::jsonb
    ) as attendees
  from public.session_coaches sc
  join public.sessions s on s.id = sc.session_id
  left join public.bookings b
    on b.session_id = s.id
    and b.status = 'confirmed'
  left join public.profiles p on p.user_id = b.user_id
  where sc.user_id = auth.uid()
    and s.status = 'scheduled'
  group by s.id, s.title, s.starts_at, s.ends_at, s.location, s.capacity
  order by s.starts_at asc;
end;
$$;

revoke all on function public.get_coach_sessions() from public;
grant execute on function public.get_coach_sessions() to authenticated;
