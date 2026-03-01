import { mockApplications, mockNewsPosts, mockSessions } from "@/lib/mockData";
import { requireAdminUser } from "@/lib/adminAuth";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function getApplications() {
  await requireAdminUser();
  const supabase = await getSupabaseServer();

  if (!supabase) {
    return mockApplications;
  }

  const { data, error } = await supabase
    .from("membership_applications")
    .select(
      `
      id,
      user_id,
      status,
      rules_accepted_at,
      season:seasons!inner(label),
      documents:application_documents(document_type, status)
    `
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    return mockApplications;
  }

  const userIds = [...new Set(data.map((row) => row.user_id))];
  const { data: profiles } = userIds.length
    ? await supabase
        .from("profiles")
        .select("user_id, first_name, last_name")
        .in("user_id", userIds)
    : { data: [] as Array<{ user_id: string; first_name: string; last_name: string }> };

  const profilesByUserId = new Map(
    (profiles ?? []).map((profile) => [profile.user_id, profile])
  );

  return data.map((row: any) => ({
    id: row.id,
    applicantName: `${profilesByUserId.get(row.user_id)?.first_name ?? ""} ${
      profilesByUserId.get(row.user_id)?.last_name ?? ""
    }`.trim() || "Profil incomplet",
    email: `Compte ${row.user_id.slice(0, 8)}`,
    status: row.status,
    seasonLabel: row.season.label,
    rulesAccepted: Boolean(row.rules_accepted_at),
    medicalCertificate: row.documents?.some(
      (doc: any) => doc.document_type === "medical_certificate" && doc.status !== "rejected"
    ),
    paymentProof: row.documents?.some(
      (doc: any) => doc.document_type === "payment_proof" && doc.status !== "rejected"
    )
  }));
}

export async function getNewsPosts() {
  await requireAdminUser();
  const supabase = await getSupabaseServer();

  if (!supabase) {
    return mockNewsPosts;
  }

  const { data, error } = await supabase
    .from("news_posts")
    .select("id, title, visibility, published_at")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return mockNewsPosts;
  }

  return data.map((row: any) => ({
    id: row.id,
    title: row.title,
    visibility: row.visibility,
    publishedAt: row.published_at ?? "Brouillon"
  }));
}

export async function getSessions() {
  await requireAdminUser();
  const supabase = await getSupabaseServer();

  if (!supabase) {
    return mockSessions;
  }

  const { data, error } = await supabase
    .from("sessions")
    .select("id, title, session_type, starts_at, location, capacity")
    .order("starts_at", { ascending: true });

  if (error || !data) {
    return mockSessions;
  }

  return data.map((row: any) => ({
    id: row.id,
    title: row.title,
    sessionType: row.session_type,
    startsAt: row.starts_at,
    location: row.location ?? "Lieu a definir",
    capacity: row.capacity
  }));
}
