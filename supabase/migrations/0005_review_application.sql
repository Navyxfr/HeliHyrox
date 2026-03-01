create or replace function public.review_application(
  target_application_id uuid,
  next_status public.application_status,
  next_review_comment text
)
returns public.membership_applications
language plpgsql
security definer
set search_path = public
as $$
declare
  target_application public.membership_applications;
  reviewed_application public.membership_applications;
begin
  if not public.has_role('admin') then
    raise exception 'Admin role required';
  end if;

  select *
  into target_application
  from public.membership_applications
  where id = target_application_id;

  if not found then
    raise exception 'Application not found';
  end if;

  update public.membership_applications
  set
    status = next_status,
    review_comment = nullif(next_review_comment, ''),
    validated_at = case when next_status = 'approved' then now() else null end,
    validated_by = case when next_status = 'approved' then auth.uid() else null end,
    submitted_at = case
      when next_status = 'pending_review' and submitted_at is null then now()
      else submitted_at
    end
  where id = target_application_id
  returning * into reviewed_application;

  if next_status = 'approved' then
    insert into public.memberships (
      user_id,
      season_id,
      application_id,
      status,
      activated_at
    )
    values (
      target_application.user_id,
      target_application.season_id,
      target_application.id,
      'active',
      now()
    )
    on conflict (application_id) do update
    set
      status = 'active',
      ended_at = null,
      activated_at = excluded.activated_at;

    insert into public.user_roles (user_id, role)
    values (target_application.user_id, 'member')
    on conflict (user_id, role) do nothing;
  end if;

  return reviewed_application;
end;
$$;

grant execute on function public.review_application(uuid, public.application_status, text) to authenticated;
