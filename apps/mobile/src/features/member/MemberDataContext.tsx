import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { membershipSummary as mockMembershipSummary } from "@/features/membership/mockData";
import { mockNews } from "@/features/news/mockData";
import { mockRecords } from "@/features/records/mockData";
import { supabase } from "@/services/supabase";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishedAtLabel: string;
};

type RecordItem = {
  id: string;
  movementId: string;
  movement: string;
  value: number;
  valueLabel: string;
  performedOn: string;
  performedOnLabel: string;
};

type MovementOption = {
  id: string;
  key: string;
  label: string;
  unit: string;
};

type MembershipSummary = {
  seasonLabel: string;
  membershipFeeLabel: string;
  certificateStatusLabel: string;
  dossierStatusLabel: string;
  seasonEndsAtLabel: string;
};

type MemberDataContextValue = {
  news: NewsItem[];
  records: RecordItem[];
  movements: MovementOption[];
  membershipSummary: MembershipSummary;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addRecord: (input: {
    movementId: string;
    value: number;
    valueLabel: string;
    performedOn: string;
  }) => Promise<void>;
};

const DEFAULT_MEMBERSHIP_SUMMARY: MembershipSummary = mockMembershipSummary;

const MemberDataContext = createContext<MemberDataContextValue | null>(null);

function formatDateLabel(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function mapApplicationStatusLabel(status?: string | null) {
  switch (status) {
    case "pending_review":
      return "Dossier en attente";
    case "changes_requested":
      return "Correction demandee";
    case "approved":
      return "Adhesion active";
    case "rejected":
      return "Dossier refuse";
    case "incomplete":
      return "Dossier incomplet";
    case "draft":
      return "Dossier en cours";
    default:
      return "Adhesion active";
  }
}

function createMockRecords(): RecordItem[] {
  return mockRecords.map((record, index) => ({
    id: record.id,
    movementId: `mock-movement-${index}`,
    movement: record.movement,
    value: index + 1,
    valueLabel: record.valueLabel,
    performedOn: `2026-02-${String(index + 10).padStart(2, "0")}`,
    performedOnLabel: record.performedOnLabel
  }));
}

function createMockMovements(): MovementOption[] {
  return [
    { id: "mock-skierg", key: "skierg", label: "SkiErg 1000m", unit: "seconds" },
    { id: "mock-row", key: "row", label: "Row 1000m", unit: "seconds" },
    { id: "mock-wallballs", key: "wallballs", label: "Wall Balls", unit: "reps" }
  ];
}

export function MemberDataProvider({ children }: { children: ReactNode }) {
  const { isSupabaseEnabled, userId } = useAuth();
  const [news, setNews] = useState<NewsItem[]>(isSupabaseEnabled ? [] : mockNews);
  const [records, setRecords] = useState<RecordItem[]>(
    isSupabaseEnabled ? [] : createMockRecords()
  );
  const [movements, setMovements] = useState<MovementOption[]>(
    isSupabaseEnabled ? [] : createMockMovements()
  );
  const [membershipSummary, setMembershipSummary] =
    useState<MembershipSummary>(DEFAULT_MEMBERSHIP_SUMMARY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase || !userId) {
      setNews(mockNews);
      setRecords(createMockRecords());
      setMovements(createMockMovements());
      setMembershipSummary(DEFAULT_MEMBERSHIP_SUMMARY);
      return;
    }

    setIsLoading(true);
    setError(null);

    const activeSeasonResult = await supabase
      .from("seasons")
      .select("id, label, membership_fee_cents, ends_at")
      .eq("is_active", true)
      .order("starts_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (activeSeasonResult.error || !activeSeasonResult.data) {
      setError(activeSeasonResult.error?.message ?? "Aucune saison active.");
      setIsLoading(false);
      return;
    }

    const activeSeason = activeSeasonResult.data;

    const [newsResult, recordsResult, movementsResult, membershipResult, applicationResult] =
      await Promise.all([
        supabase
          .from("news_posts")
          .select("id, title, summary, content, published_at")
          .not("published_at", "is", null)
          .order("published_at", { ascending: false }),
        supabase
          .from("records")
          .select("id, value, value_label, performed_on, movement:movements(id, key, label, unit)")
          .eq("user_id", userId)
          .order("performed_on", { ascending: false }),
        supabase
          .from("movements")
          .select("id, key, label, unit")
          .eq("is_active", true)
          .order("label", { ascending: true }),
        supabase
          .from("memberships")
          .select("status")
          .eq("user_id", userId)
          .eq("season_id", activeSeason.id)
          .order("activated_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("membership_applications")
          .select("id, status")
          .eq("user_id", userId)
          .eq("season_id", activeSeason.id)
          .maybeSingle()
      ]);

    if (
      newsResult.error ||
      recordsResult.error ||
      movementsResult.error ||
      membershipResult.error ||
      applicationResult.error
    ) {
      setError(
        newsResult.error?.message ??
          recordsResult.error?.message ??
          movementsResult.error?.message ??
          membershipResult.error?.message ??
          applicationResult.error?.message ??
          "Impossible de charger l'espace membre."
      );
      setIsLoading(false);
      return;
    }

    let certificateStatusLabel = "A fournir";

    if (applicationResult.data?.id) {
      const documentsResult = await supabase
        .from("application_documents")
        .select("document_type, status")
        .eq("application_id", applicationResult.data.id);

      if (documentsResult.error) {
        setError(documentsResult.error.message);
        setIsLoading(false);
        return;
      }

      certificateStatusLabel = documentsResult.data.some(
        (document) =>
          document.document_type === "medical_certificate" && document.status !== "rejected"
      )
        ? "Certificat recu"
        : "A fournir";
    }

    setNews(
      (newsResult.data ?? []).map((item) => ({
        id: item.id,
        title: item.title,
        summary: item.summary ?? "",
        content: item.content,
        publishedAtLabel: item.published_at ? formatDateLabel(item.published_at) : "Brouillon"
      }))
    );

    setRecords(
      (recordsResult.data ?? []).map((record: any) => ({
        id: record.id,
        movementId: record.movement.id,
        movement: record.movement.label,
        value: Number(record.value),
        valueLabel: record.value_label,
        performedOn: record.performed_on,
        performedOnLabel: formatDateLabel(record.performed_on)
      }))
    );

    setMovements(
      (movementsResult.data ?? []).map((movement) => ({
        id: movement.id,
        key: movement.key,
        label: movement.label,
        unit: movement.unit
      }))
    );

    setMembershipSummary({
      seasonLabel: activeSeason.label,
      membershipFeeLabel: `${(activeSeason.membership_fee_cents / 100).toFixed(0)} EUR`,
      certificateStatusLabel,
      dossierStatusLabel:
        membershipResult.data?.status === "active"
          ? "Adhesion active"
          : mapApplicationStatusLabel(applicationResult.data?.status),
      seasonEndsAtLabel: formatDateLabel(activeSeason.ends_at)
    });

    setIsLoading(false);
  }, [isSupabaseEnabled, userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<MemberDataContextValue>(
    () => ({
      news,
      records,
      movements,
      membershipSummary,
      isLoading,
      error,
      refresh,
      addRecord: async ({ movementId, value, valueLabel, performedOn }) => {
        if (!supabase || !userId) {
          const movement = movements.find((item) => item.id === movementId);
          setRecords((current) => [
            {
              id: `mock-${Date.now()}`,
              movementId,
              movement: movement?.label ?? "Mouvement",
              value,
              valueLabel,
              performedOn,
              performedOnLabel: formatDateLabel(performedOn)
            },
            ...current
          ]);
          return;
        }

        setIsLoading(true);
        setError(null);

        const { error: insertError } = await supabase.from("records").insert({
          user_id: userId,
          movement_id: movementId,
          value,
          value_label: valueLabel,
          performed_on: performedOn
        });

        if (insertError) {
          setError(insertError.message);
          setIsLoading(false);
          return;
        }

        await refresh();
      }
    }),
    [error, isLoading, membershipSummary, movements, news, records, refresh, userId]
  );

  return <MemberDataContext.Provider value={value}>{children}</MemberDataContext.Provider>;
}

export function useMemberData() {
  const context = useContext(MemberDataContext);

  if (!context) {
    throw new Error("useMemberData must be used within MemberDataProvider");
  }

  return context;
}
