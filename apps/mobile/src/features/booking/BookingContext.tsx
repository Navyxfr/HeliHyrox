import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { mockSessions, type SessionItem } from "@/features/booking/mockData";

type BookingContextValue = {
  sessions: SessionItem[];
  myBookings: SessionItem[];
  reserveSession: (sessionId: string) => void;
  cancelBooking: (sessionId: string) => void;
  getSessionById: (sessionId: string) => SessionItem | null;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState(mockSessions);

  const value = useMemo<BookingContextValue>(() => {
    const getSessionById = (sessionId: string) =>
      sessions.find((session) => session.id === sessionId) ?? null;

    return {
      sessions,
      myBookings: sessions.filter((session) => session.isBooked),
      reserveSession: (sessionId: string) => {
        setSessions((current) =>
          current.map((session) =>
            session.id === sessionId && !session.isBooked
              ? {
                  ...session,
                  isBooked: true,
                  bookedCount: Math.min(session.bookedCount + 1, session.capacity)
                }
              : session
          )
        );
      },
      cancelBooking: (sessionId: string) => {
        setSessions((current) =>
          current.map((session) =>
            session.id === sessionId && session.isBooked
              ? {
                  ...session,
                  isBooked: false,
                  bookedCount: Math.max(session.bookedCount - 1, 0)
                }
              : session
          )
        );
      },
      getSessionById
    };
  }, [sessions]);

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
}
