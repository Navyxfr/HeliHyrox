import { mockApplications, mockNewsPosts, mockSessions } from "@/lib/mockData";
import { requireAdminUser } from "@/lib/adminAuth";
import { getSupabaseServer } from "@/lib/supabaseServer";

export type AdminApplicationItem = {
  id: string;
  applicantName: string;
  contactLabel: string;
  status: string;
  seasonLabel: string;
  rulesAccepted: boolean;
  medicalCertificate: boolean;
  paymentProof: boolean;
  medicalCertificateUrl: string | null;
  paymentProofUrl: string | null;
};

type ApplicationRow = {
  id: string;
  user_id: string;
  status: string;
  rules_accepted_at: string | null;
  season: Array<{ label: string }>;
  documents: Array<{
    document_type: string;
    status: string;
    storage_path: string;
  }>;
};

type ProfileRow = {
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
};

type NewsPostRow = {
  id: string;
  title: string;
  visibility: string;
  published_at: string | null;
};

type SessionRow = {
  id: string;
  title: string;
  session_type: string;
  starts_at: string;
  location: string | null;
  capacity: number;
};

function createMockApplications(): AdminApplicationItem[] {
  return mockApplications.map((application) => ({
    id: application.id,
    applicantName: application.applicantName,
    contactLabel: application.email,
    status: application.status,
    seasonLabel: application.seasonLabel,
    rulesAccepted: application.rulesAccepted,
    medicalCertificate: application.medicalCertificate,
    paymentProof: application.paymentProof,
    medicalCertificateUrl: null,
    paymentProofUrl: null
  }));
}

export async function getApplications(): Promise<AdminApplicationItem[]> {
  await requireAdminUser();
  const supabase = await getSupabaseServer();

  if (!supabase) {
    return createMockApplications();
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
      documents:application_documents(document_type, status, storage_path)
    `
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    return createMockApplications();
  }

  const userIds = [...new Set(data.map((row) => row.user_id))];
  const { data: profiles } = userIds.length
    ? await supabase
        .from("profiles")
        .select("user_id, first_name, last_name, phone")
        .in("user_id", userIds)
    : { data: [] as ProfileRow[] };

  const profilesByUserId = new Map(
    (profiles ?? []).map((profile) => [profile.user_id, profile])
  );

  const signedUrlEntries = await Promise.all(
    (data as ApplicationRow[]).flatMap((row) =>
      row.documents.map(async (document) => {
        const { data: signedUrlData } = await supabase.storage
          .from("membership-documents")
          .createSignedUrl(document.storage_path, 60 * 60);

        return [
          `${row.id}:${document.document_type}`,
          signedUrlData?.signedUrl ?? null
        ] as const;
      })
    )
  );

  const documentUrls = new Map(signedUrlEntries);

  return (data as ApplicationRow[]).map((row) => ({
    id: row.id,
    applicantName: `${profilesByUserId.get(row.user_id)?.first_name ?? ""} ${
      profilesByUserId.get(row.user_id)?.last_name ?? ""
    }`.trim() || `Compte ${row.user_id.slice(0, 8)}`,
    contactLabel:
      profilesByUserId.get(row.user_id)?.phone ?? `Compte ${row.user_id.slice(0, 8)}`,
    status: row.status,
    seasonLabel: row.season[0]?.label ?? "Saison inconnue",
    rulesAccepted: Boolean(row.rules_accepted_at),
    medicalCertificate: row.documents?.some(
      (doc) => doc.document_type === "medical_certificate" && doc.status !== "rejected"
    ),
    paymentProof: row.documents?.some(
      (doc) => doc.document_type === "payment_proof" && doc.status !== "rejected"
    ),
    medicalCertificateUrl:
      documentUrls.get(`${row.id}:medical_certificate`) ?? null,
    paymentProofUrl: documentUrls.get(`${row.id}:payment_proof`) ?? null
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

  return (data as NewsPostRow[]).map((row) => ({
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

  return (data as SessionRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    sessionType: row.session_type,
    startsAt: row.starts_at,
    location: row.location ?? "Lieu a definir",
    capacity: row.capacity
  }));
}
