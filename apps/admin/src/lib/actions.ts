"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function updateApplicationStatus(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    revalidatePath("/applications");
    return;
  }

  const applicationId = String(formData.get("applicationId"));
  const status = String(formData.get("status"));
  const reviewComment = String(formData.get("reviewComment") ?? "");

  await supabase
    .from("membership_applications")
    .update({
      status,
      review_comment: reviewComment || null,
      validated_at: status === "approved" ? new Date().toISOString() : null
    })
    .eq("id", applicationId);

  revalidatePath("/applications");
}

export async function createNewsPost(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    revalidatePath("/news");
    return;
  }

  await supabase.from("news_posts").insert({
    title: String(formData.get("title")),
    summary: String(formData.get("summary")),
    content: String(formData.get("content")),
    visibility: String(formData.get("visibility")),
    published_at: new Date().toISOString()
  });

  revalidatePath("/news");
}

export async function createSession(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    revalidatePath("/sessions");
    return;
  }

  const activeSeason = await supabase
    .from("seasons")
    .select("id")
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

  await supabase.from("sessions").insert({
    season_id: activeSeason.data.id,
    title: String(formData.get("title")),
    session_type: String(formData.get("sessionType")),
    starts_at: startsAt,
    ends_at: endsAt,
    capacity: Number(formData.get("capacity")),
    location: String(formData.get("location")),
    booking_opens_at: startsAt,
    booking_closes_at: startsAt,
    cancellation_deadline_at: startsAt
  });

  revalidatePath("/sessions");
}
