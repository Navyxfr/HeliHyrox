import type { ApplicationStatus } from "@helihyrox/shared";

export function deriveApplicationStatus(input: {
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
