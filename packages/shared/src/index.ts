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
export const derivedStatuses = [
  "public",
  "candidate",
  "pending_member",
  "member_active",
  "suspended"
] as const;

export const newsVisibilityLevels = ["public", "members"] as const;

export const sessionTypes = [
  "hyrox",
  "strength",
  "conditioning",
  "mobility",
  "open_gym",
  "other"
] as const;

export const notificationTypes = [
  "application_received",
  "application_changes_requested",
  "application_approved",
  "booking_confirmed",
  "booking_cancelled",
  "news_published",
  "general"
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];
export type MembershipStatus = (typeof membershipStatuses)[number];
export type UserRole = (typeof userRoles)[number];
export type BookingStatus = (typeof bookingStatuses)[number];
export type DerivedStatus = (typeof derivedStatuses)[number];
export type NewsVisibilityLevel = (typeof newsVisibilityLevels)[number];
export type SessionType = (typeof sessionTypes)[number];
export type NotificationType = (typeof notificationTypes)[number];

export const applicationStatusLabels: Record<ApplicationStatus, string> = {
  draft: "Brouillon",
  incomplete: "Dossier incomplet",
  pending_review: "En attente",
  changes_requested: "Correction demandée",
  approved: "Validé",
  rejected: "Refusé"
};

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  dateOfBirth: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  employeeIdentifier: string | null;
  isPublicProfile: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Season {
  id: string;
  label: string;
  startsAt: string;
  endsAt: string;
  membershipFeeCents: number;
  maxActiveBookings: number;
  defaultCancellationDeadlineHours: number;
  ribLabel: string;
  ribIban: string;
  ribBic: string;
  rulesDocumentUrl: string | null;
  isActive: boolean;
}

export interface MembershipApplication {
  id: string;
  userId: string;
  seasonId: string;
  status: ApplicationStatus;
  submittedAt: string | null;
  validatedAt: string | null;
  validatedBy: string | null;
  reviewComment: string | null;
  rulesAcceptedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  seasonId: string;
  sessionType: SessionType;
  title: string;
  startsAt: string;
  endsAt: string;
  capacity: number;
  location: string | null;
  status: "scheduled" | "cancelled" | "completed";
  bookingOpensAt: string | null;
  bookingClosesAt: string | null;
  cancellationDeadlineAt: string | null;
}

export interface Booking {
  id: string;
  sessionId: string;
  userId: string;
  status: BookingStatus;
  bookedAt: string;
  cancelledAt: string | null;
  cancelReason: string | null;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  readAt: string | null;
}
