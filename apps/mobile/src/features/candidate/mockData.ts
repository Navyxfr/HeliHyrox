import type { ApplicationStatus } from "@helihyrox/shared";

export type CandidateDocumentStatus = {
  medicalCertificateUploaded: boolean;
  paymentProofUploaded: boolean;
  rulesAccepted: boolean;
};

export type CandidateApplicationState = {
  seasonId: string;
  seasonLabel: string;
  membershipFeeLabel: string;
  ribLabel: string;
  status: ApplicationStatus;
  firstName: string;
  lastName: string;
  phone: string;
  documents: CandidateDocumentStatus;
};

export const mockCandidateApplication: CandidateApplicationState = {
  seasonId: "mock-season",
  seasonLabel: "2025-2026",
  membershipFeeLabel: "300 EUR",
  ribLabel: "FR76 1234 5678 9012 3456 7890 123",
  status: "incomplete",
  firstName: "Tom",
  lastName: "Martin",
  phone: "0600000000",
  documents: {
    medicalCertificateUploaded: false,
    paymentProofUploaded: false,
    rulesAccepted: false
  }
};
