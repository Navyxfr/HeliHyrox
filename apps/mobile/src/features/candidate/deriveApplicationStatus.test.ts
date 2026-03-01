import { describe, expect, it } from "vitest";
import { deriveApplicationStatus } from "./deriveApplicationStatus";

describe("deriveApplicationStatus", () => {
  it("retourne pending_review quand le dossier est complet", () => {
    expect(
      deriveApplicationStatus({
        currentStatus: "draft",
        hasMedicalCertificate: true,
        hasPaymentProof: true,
        hasRulesAccepted: true,
        hasProfile: true
      })
    ).toBe("pending_review");
  });

  it("preserve changes_requested tant que le dossier n'est pas complet", () => {
    expect(
      deriveApplicationStatus({
        currentStatus: "changes_requested",
        hasMedicalCertificate: true,
        hasPaymentProof: false,
        hasRulesAccepted: true,
        hasProfile: true
      })
    ).toBe("changes_requested");
  });

  it("retourne incomplete sinon", () => {
    expect(
      deriveApplicationStatus({
        currentStatus: "draft",
        hasMedicalCertificate: false,
        hasPaymentProof: false,
        hasRulesAccepted: false,
        hasProfile: false
      })
    ).toBe("incomplete");
  });
});
