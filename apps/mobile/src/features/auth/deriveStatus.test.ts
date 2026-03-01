import { describe, expect, it } from "vitest";
import { deriveStatusFromData } from "./deriveStatus";

describe("deriveStatusFromData", () => {
  it("retourne member_active pour une adhesion active", () => {
    expect(
      deriveStatusFromData({
        membershipStatus: "active",
        applicationStatus: null
      })
    ).toBe("member_active");
  });

  it("retourne suspended pour une adhesion suspendue", () => {
    expect(
      deriveStatusFromData({
        membershipStatus: "suspended",
        applicationStatus: "approved"
      })
    ).toBe("suspended");
  });

  it("retourne pending_member pour un dossier en attente", () => {
    expect(
      deriveStatusFromData({
        membershipStatus: null,
        applicationStatus: "pending_review"
      })
    ).toBe("pending_member");
  });

  it("retourne candidate pour un dossier brouillon, incomplet ou en correction", () => {
    expect(
      deriveStatusFromData({
        membershipStatus: null,
        applicationStatus: "draft"
      })
    ).toBe("candidate");
    expect(
      deriveStatusFromData({
        membershipStatus: null,
        applicationStatus: "incomplete"
      })
    ).toBe("candidate");
    expect(
      deriveStatusFromData({
        membershipStatus: null,
        applicationStatus: "changes_requested"
      })
    ).toBe("candidate");
  });

  it("retourne candidate par defaut pour un utilisateur connecte sans dossier", () => {
    expect(
      deriveStatusFromData({
        membershipStatus: null,
        applicationStatus: null
      })
    ).toBe("candidate");
  });

  it("retourne public pour une adhesion expiree ou annulee", () => {
    expect(
      deriveStatusFromData({
        membershipStatus: "expired",
        applicationStatus: null
      })
    ).toBe("public");
    expect(
      deriveStatusFromData({
        membershipStatus: "cancelled",
        applicationStatus: null
      })
    ).toBe("public");
  });
});
