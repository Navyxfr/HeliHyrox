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
import { supabase } from "@/services/supabase";
import { formatDateLabel, formatTimeLabel } from "@/features/booking/formatters";
import { mockSessions, type SessionItem } from "@/features/booking/mockData";

type SessionRpcRow = {
  id: string;
  title: string;
  session_type: SessionItem["sessionType"];
  starts_at: string;
  ends_at: string;
  location: string | null;
  capacity: number;
  booked_count: number | string;
  user_booked: boolean;
  coach_name: string;
};

type BookingContextValue = {
  sessions: SessionItem[];
  myBookings: SessionItem[];
  isLoading: boolean;
  error: string | null;
  refreshSessions: () => Promise<void>;
  reserveSession: (sessionId: string) => Promise<boolean>;
  cancelBooking: (sessionId: string) => Promise<boolean>;
  getSessionById: (sessionId: string) => SessionItem | null;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const [sessions, setSessions] = useState(mockSessions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function mapRpcSession(session: SessionRpcRow): SessionItem {
    return {
      id: session.id,
      title: session.title,
      sessionType: session.session_type,
      startsAtIso: session.starts_at,
      endsAtIso: session.ends_at,
      startsAtLabel: formatTimeLabel(session.starts_at),
      endsAtLabel: formatTimeLabel(session.ends_at),
      dateLabel: formatDateLabel(session.starts_at),
      location: session.location ?? "Lieu a definir",
      capacity: session.capacity,
      bookedCount: Number(session.booked_count),
      coachName: session.coach_name,
      isBooked: session.user_booked
    };
  }

  const refreshSessions = useCallback(async () => {
    if (!supabase || !userId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data, error: sessionsError } = await supabase.rpc("get_member_sessions");

    if (sessionsError) {
      setError(sessionsError.message);
      setIsLoading(false);
      return;
    }

    setSessions(((data ?? []) as SessionRpcRow[]).map(mapRpcSession));
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    async function load() {
      if (!supabase || !userId) {
        return;
      }
      await refreshSessions();
    }

    void load();
  }, [refreshSessions]);

  const value = useMemo<BookingContextValue>(() => {
    const getSessionById = (sessionId: string) =>
      sessions.find((session) => session.id === sessionId) ?? null;

    return {
      sessions,
      myBookings: sessions.filter((session) => session.isBooked),
      isLoading,
      error,
      refreshSessions,
      reserveSession: async (sessionId: string) => {
        if (supabase && userId) {
          setIsLoading(true);
          setError(null);
          const { error: bookingError } = await supabase.rpc("book_session", {
            target_session_id: sessionId
          });

          if (bookingError) {
            setError(bookingError.message);
            setIsLoading(false);
            return false;
          }

          await refreshSessions();
          return true;
        }

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
        return true;
      },
      cancelBooking: async (sessionId: string) => {
        if (supabase && userId) {
          setIsLoading(true);
          setError(null);
          const { error: bookingError } = await supabase.rpc("cancel_booking", {
            target_session_id: sessionId
          });

          if (bookingError) {
            setError(bookingError.message);
            setIsLoading(false);
            return false;
          }

          await refreshSessions();
          return true;
        }

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
        return true;
      },
      getSessionById
    };
  }, [error, isLoading, refreshSessions, sessions, userId]);

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
