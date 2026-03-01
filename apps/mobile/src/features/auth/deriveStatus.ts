import type { ApplicationStatus, DerivedStatus, MembershipStatus } from "@helihyrox/shared";

export function deriveStatusFromData(input: {
  membershipStatus: MembershipStatus | null;
  applicationStatus: ApplicationStatus | null;
}): DerivedStatus {
  if (input.membershipStatus === "active") {
    return "member_active";
  }

  if (input.membershipStatus === "suspended") {
    return "suspended";
  }

  if (input.applicationStatus === "pending_review") {
    return "pending_member";
  }

  if (
    input.applicationStatus === "draft" ||
    input.applicationStatus === "incomplete" ||
    input.applicationStatus === "changes_requested"
  ) {
    return "candidate";
  }

  if (!input.membershipStatus && !input.applicationStatus) {
    return "candidate";
  }

  return "public";
}
