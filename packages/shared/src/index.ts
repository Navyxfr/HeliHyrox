export const applicationStatuses = [
  "draft",
  "incomplete",
  "pending_review",
  "changes_requested",
  "approved",
  "rejected"
] as const;

export const membershipStatuses = [
  "active",
  "suspended",
  "expired",
  "cancelled"
] as const;

export const userRoles = ["member", "coach", "admin"] as const;

export const bookingStatuses = ["confirmed", "cancelled", "no_show"] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];
export type MembershipStatus = (typeof membershipStatuses)[number];
export type UserRole = (typeof userRoles)[number];
export type BookingStatus = (typeof bookingStatuses)[number];

