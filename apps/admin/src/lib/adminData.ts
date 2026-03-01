import { mockApplications, mockNewsPosts, mockSessions } from "@/lib/mockData";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function getApplications() {
  const supabase = getSupabaseAdmin();

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
      profiles:profiles!inner(first_name, last_name),
      season:seasons!inner(label),
      documents:application_documents(document_type, status)
    `
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    return mockApplications;
  }

  return data.map((row: any) => ({
    id: row.id,
    applicantName: `${row.profiles.first_name} ${row.profiles.last_name}`.trim(),
    email: row.user_id,
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
  const supabase = getSupabaseAdmin();

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
  const supabase = getSupabaseAdmin();

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
