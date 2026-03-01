import type { ApplicationStatus } from "@helihyrox/shared";
import * as DocumentPicker from "expo-document-picker";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { useAuth } from "@/features/auth/AuthContext";
import {
  mockCandidateApplication,
  type CandidateApplicationState
} from "@/features/candidate/mockData";
import { supabase } from "@/services/supabase";

type CandidateContextValue = {
  application: CandidateApplicationState | null;
  isLoading: boolean;
  error: string | null;
  refreshApplication: () => Promise<void>;
  saveProfile: (input: {
    firstName: string;
    lastName: string;
    phone: string;
  }) => Promise<boolean>;
  acceptRules: () => Promise<boolean>;
  uploadMedicalCertificate: () => Promise<boolean>;
  uploadPaymentProof: () => Promise<boolean>;
  submitApplication: () => Promise<boolean>;
};

const CandidateContext = createContext<CandidateContextValue | null>(null);

async function pickSingleDocument() {
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
    multiple: false,
    type: ["application/pdf", "image/*"]
  });

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  return result.assets[0];
}

function deriveApplicationStatus(input: {
  currentStatus?: ApplicationStatus;
  hasMedicalCertificate: boolean;
  hasPaymentProof: boolean;
  hasRulesAccepted: boolean;
  hasProfile: boolean;
}): ApplicationStatus {
  if (
    input.hasMedicalCertificate &&
    input.hasPaymentProof &&
    input.hasRulesAccepted &&
    input.hasProfile
  ) {
    return "pending_review";
  }

  if (input.currentStatus === "changes_requested") {
    return "changes_requested";
  }

  return "incomplete";
}

export function CandidateProvider({ children }: { children: ReactNode }) {
  const { isSupabaseEnabled, userId } = useAuth();
  const [application, setApplication] = useState<CandidateApplicationState | null>(
    isSupabaseEnabled ? null : mockCandidateApplication
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshApplication = useCallback(async () => {
    if (!supabase || !userId) {
      setApplication(mockCandidateApplication);
      return;
    }

    setIsLoading(true);
    setError(null);

    const activeSeasonResult = await supabase
      .from("seasons")
      .select("id, label, membership_fee_cents, rib_iban")
      .eq("is_active", true)
      .order("starts_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (activeSeasonResult.error || !activeSeasonResult.data) {
      setError(activeSeasonResult.error?.message ?? "Aucune saison active.");
      setIsLoading(false);
      return;
    }

    const season = activeSeasonResult.data;

    const [profileResult, applicationResult] = await Promise.all([
      supabase
        .from("profiles")
        .select("first_name, last_name, phone")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("membership_applications")
        .select("id, status, rules_accepted_at")
        .eq("user_id", userId)
        .eq("season_id", season.id)
        .maybeSingle()
    ]);

    if (profileResult.error) {
      setError(profileResult.error.message);
      setIsLoading(false);
      return;
    }

    if (applicationResult.error) {
      setError(applicationResult.error.message);
      setIsLoading(false);
      return;
    }

    let applicationId = applicationResult.data?.id ?? null;
    if (!applicationId) {
      const created = await supabase
        .from("membership_applications")
        .insert({
          user_id: userId,
          season_id: season.id,
          status: "draft"
        })
        .select("id, status, rules_accepted_at")
        .single();

      if (created.error) {
        setError(created.error.message);
        setIsLoading(false);
        return;
      }

      applicationId = created.data.id;
    }

    const documentsResult = await supabase
      .from("application_documents")
      .select("document_type, status")
      .eq("application_id", applicationId);

    if (documentsResult.error) {
      setError(documentsResult.error.message);
      setIsLoading(false);
      return;
    }

    const hasMedicalCertificate = documentsResult.data.some(
      (doc) => doc.document_type === "medical_certificate" && doc.status !== "rejected"
    );
    const hasPaymentProof = documentsResult.data.some(
      (doc) => doc.document_type === "payment_proof" && doc.status !== "rejected"
    );
    const hasRulesAccepted = Boolean(applicationResult.data?.rules_accepted_at);
    const hasProfile = Boolean(
      profileResult.data?.first_name && profileResult.data?.last_name
    );

    setApplication({
      seasonId: season.id,
      seasonLabel: season.label,
      membershipFeeLabel: `${(season.membership_fee_cents / 100).toFixed(0)} EUR`,
      ribLabel: season.rib_iban,
      status: deriveApplicationStatus({
        currentStatus: (applicationResult.data?.status as ApplicationStatus | undefined) ?? "draft",
        hasMedicalCertificate,
        hasPaymentProof,
        hasRulesAccepted,
        hasProfile
      }),
      firstName: profileResult.data?.first_name ?? "",
      lastName: profileResult.data?.last_name ?? "",
      phone: profileResult.data?.phone ?? "",
      documents: {
        medicalCertificateUploaded: hasMedicalCertificate,
        paymentProofUploaded: hasPaymentProof,
        rulesAccepted: hasRulesAccepted
      }
    });
    setIsLoading(false);
  }, [isSupabaseEnabled, userId]);

  const uploadDocument = useCallback(
    async (documentType: "medical_certificate" | "payment_proof") => {
      if (!application) {
        return false;
      }

      const pickedDocument = await pickSingleDocument();

      if (!pickedDocument) {
        return false;
      }

      if (!supabase || !userId) {
        setApplication((current) =>
          current
            ? {
                ...current,
                documents: {
                  ...current.documents,
                  medicalCertificateUploaded:
                    documentType === "medical_certificate"
                      ? true
                      : current.documents.medicalCertificateUploaded,
                  paymentProofUploaded:
                    documentType === "payment_proof"
                      ? true
                      : current.documents.paymentProofUploaded
                }
              }
            : current
        );
        return true;
      }

      setIsLoading(true);
      setError(null);

      const applicationRow = await supabase
        .from("membership_applications")
        .select("id")
        .eq("user_id", userId)
        .eq("season_id", application.seasonId)
        .single();

      if (applicationRow.error) {
        setError(applicationRow.error.message);
        setIsLoading(false);
        return false;
      }

      const extension =
        pickedDocument.name?.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
        (pickedDocument.mimeType === "application/pdf" ? "pdf" : "jpg");
      const baseName =
        documentType === "medical_certificate"
          ? "medical-certificate"
          : "payment-proof";
      const storagePath = `memberships/${application.seasonId}/${userId}/${baseName}.${extension}`;

      try {
        const response = await fetch(pickedDocument.uri);
        const arrayBuffer = await response.arrayBuffer();
        const fileBlob = new Blob([arrayBuffer], {
          type: pickedDocument.mimeType ?? "application/octet-stream"
        });

        const { error: storageError } = await supabase.storage
          .from("membership-documents")
          .upload(storagePath, fileBlob, {
            contentType: pickedDocument.mimeType ?? undefined,
            upsert: true
          });

        if (storageError) {
          setError(storageError.message);
          setIsLoading(false);
          return false;
        }

        const { error: docError } = await supabase.from("application_documents").upsert(
          {
            application_id: applicationRow.data.id,
            document_type: documentType,
            storage_path: storagePath,
            status: "uploaded"
          },
          { onConflict: "application_id,document_type" }
        );

        if (docError) {
          setError(docError.message);
          setIsLoading(false);
          return false;
        }

        await refreshApplication();
        return true;
      } catch (uploadError) {
        setError(
          uploadError instanceof Error ? uploadError.message : "Echec de l'envoi du document."
        );
        setIsLoading(false);
        return false;
      }
    },
    [application, refreshApplication, userId]
  );

  useEffect(() => {
    void refreshApplication();
  }, [refreshApplication]);

  const value = useMemo<CandidateContextValue>(
    () => ({
      application,
      isLoading,
      error,
      refreshApplication,
      saveProfile: async ({ firstName, lastName, phone }) => {
        if (!supabase || !userId) {
          setApplication((current) =>
            current
              ? {
                  ...current,
                  firstName,
                  lastName,
                  phone,
                  status: "incomplete"
                }
              : current
          );
          return true;
        }

        setIsLoading(true);
        setError(null);
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert(
            {
              user_id: userId,
              first_name: firstName,
              last_name: lastName,
              phone
            },
            { onConflict: "user_id" }
          );

        if (profileError) {
          setError(profileError.message);
          setIsLoading(false);
          return false;
        }

        await refreshApplication();
        return true;
      },
      acceptRules: async () => {
        if (!application) {
          return false;
        }

        if (!supabase || !userId) {
          setApplication((current) =>
            current
              ? {
                  ...current,
                  documents: { ...current.documents, rulesAccepted: true }
                }
              : current
          );
          return true;
        }

        setIsLoading(true);
        setError(null);
        const { error: applicationError } = await supabase
          .from("membership_applications")
          .update({ rules_accepted_at: new Date().toISOString() })
          .eq("user_id", userId)
          .eq("season_id", application.seasonId);

        if (applicationError) {
          setError(applicationError.message);
          setIsLoading(false);
          return false;
        }

        await refreshApplication();
        return true;
      },
      uploadMedicalCertificate: async () => {
        return uploadDocument("medical_certificate");
      },
      uploadPaymentProof: async () => {
        return uploadDocument("payment_proof");
      },
      submitApplication: async () => {
        if (!application) {
          return false;
        }

        const nextStatus = deriveApplicationStatus({
          currentStatus: application.status,
          hasMedicalCertificate: application.documents.medicalCertificateUploaded,
          hasPaymentProof: application.documents.paymentProofUploaded,
          hasRulesAccepted: application.documents.rulesAccepted,
          hasProfile: Boolean(application.firstName && application.lastName)
        });

        if (nextStatus !== "pending_review") {
          setError("Le dossier doit etre complet avant soumission au bureau.");
          return false;
        }

        if (!supabase || !userId) {
          setApplication((current) =>
            current
              ? {
                  ...current,
                  status: nextStatus
                }
              : current
          );
          return true;
        }

        setIsLoading(true);
        setError(null);
        const { error: submitError } = await supabase
          .from("membership_applications")
          .update({
            status: nextStatus,
            submitted_at:
              nextStatus === "pending_review" ? new Date().toISOString() : null
          })
          .eq("user_id", userId)
          .eq("season_id", application.seasonId);

        if (submitError) {
          setError(submitError.message);
          setIsLoading(false);
          return false;
        }

        await refreshApplication();
        return true;
      }
    }),
    [application, error, isLoading, isSupabaseEnabled, refreshApplication, uploadDocument, userId]
  );

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
}

export function useCandidate() {
  const context = useContext(CandidateContext);

  if (!context) {
    throw new Error("useCandidate must be used within CandidateProvider");
  }

  return context;
}
