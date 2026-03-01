import type { SessionItem } from "@/features/booking/mockData";

export function applyMockReservation(
  sessions: SessionItem[],
  sessionId: string
): SessionItem[] {
  return sessions.map((session) =>
    session.id === sessionId && !session.isBooked
      ? {
          ...session,
          isBooked: true,
          bookedCount: Math.min(session.bookedCount + 1, session.capacity)
        }
      : session
  );
}

export function applyMockCancellation(
  sessions: SessionItem[],
  sessionId: string
): SessionItem[] {
  return sessions.map((session) =>
    session.id === sessionId && session.isBooked
      ? {
          ...session,
          isBooked: false,
          bookedCount: Math.max(session.bookedCount - 1, 0)
        }
      : session
  );
}
