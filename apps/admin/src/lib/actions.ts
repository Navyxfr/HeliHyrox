"use server";

import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function updateApplicationStatus(formData: FormData) {
  const adminUser = await requireAdminUser();
  const supabase = await getSupabaseServer();

  if (!supabase || !adminUser) {
    revalidatePath("/applications");
    return;
  }

  const applicationId = String(formData.get("applicationId"));
  const status = String(formData.get("status"));
  const reviewComment = String(formData.get("reviewComment") ?? "");

  await supabase.rpc("review_application", {
    target_application_id: applicationId,
    next_status: status,
    next_review_comment: reviewComment
  });

  revalidatePath("/applications");
}

export async function createNewsPost(formData: FormData) {
  const adminUser = await requireAdminUser();
  const supabase = getSupabaseAdmin();

  if (!supabase || !adminUser) {
    revalidatePath("/news");
    return;
  }

  await supabase.from("news_posts").insert({
    title: String(formData.get("title")),
    summary: String(formData.get("summary")),
    content: String(formData.get("content")),
    visibility: String(formData.get("visibility")),
    published_at: new Date().toISOString(),
    created_by: adminUser.id
  });

  revalidatePath("/news");
}

export async function createSession(formData: FormData) {
  const adminUser = await requireAdminUser();
  const supabase = getSupabaseAdmin();

  if (!supabase || !adminUser) {
    revalidatePath("/sessions");
    return;
  }

  const activeSeason = await supabase
    .from("seasons")
    .select("id, default_cancellation_deadline_hours")
    .eq("is_active", true)
    .order("starts_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!activeSeason.data?.id) {
    revalidatePath("/sessions");
    return;
  }

  const startsAt = String(formData.get("startsAt"));
  const endsAt = String(formData.get("endsAt"));
  const startsAtDate = new Date(startsAt);
  const bookingOpensAt = new Date(startsAtDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const cancellationDeadlineAt = new Date(
    startsAtDate.getTime() -
      (activeSeason.data.default_cancellation_deadline_hours ?? 2) * 60 * 60 * 1000
  );

  await supabase.from("sessions").insert({
    season_id: activeSeason.data.id,
    title: String(formData.get("title")),
    session_type: String(formData.get("sessionType")),
    starts_at: startsAt,
    ends_at: endsAt,
    capacity: Number(formData.get("capacity")),
    location: String(formData.get("location")),
    booking_opens_at: bookingOpensAt.toISOString(),
    booking_closes_at: startsAtDate.toISOString(),
    cancellation_deadline_at: cancellationDeadlineAt.toISOString(),
    created_by: adminUser.id
  });

  revalidatePath("/sessions");
}
