import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { mockSessions } from "@/features/booking/mockData";
import { supabase } from "@/services/supabase";
import { colors } from "@/theme/tokens";

type CoachSessionItem = {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  bookedCount: number;
  capacity: number;
  attendees: string[];
};

type CoachSessionRpcRow = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  location: string | null;
  capacity: number;
  booked_count: number | string;
  attendees: Array<{
    user_id: string;
    full_name: string;
  }>;
};

function formatDateLabel(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(new Date(value));
}

function formatTimeLabel(start: string, end: string) {
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return `${formatter.format(new Date(start))} - ${formatter.format(new Date(end))}`;
}

function createMockCoachSessions(): CoachSessionItem[] {
  return mockSessions
    .filter((session) => session.coachName === "Julie M.")
    .map((session) => ({
      id: session.id,
      title: session.title,
      dateLabel: session.dateLabel,
      timeLabel: `${session.startsAtLabel} - ${session.endsAtLabel}`,
      location: session.location,
      bookedCount: session.bookedCount,
      capacity: session.capacity,
      attendees: ["Tom M.", "Julie R.", "Marc D."]
    }));
}

export default function CoachSessionsScreen() {
  const [sessions, setSessions] = useState<CoachSessionItem[]>(createMockCoachSessions);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCoachSessions() {
      if (!supabase) {
        setSessions(createMockCoachSessions());
        return;
      }

      setError(null);

      const coachSessionsResult = await supabase.rpc("get_coach_sessions");

      if (coachSessionsResult.error) {
        if (isMounted) {
          setError(coachSessionsResult.error.message);
        }
        return;
      }

      const nextSessions = ((coachSessionsResult.data ?? []) as CoachSessionRpcRow[]).map(
        (session) => ({
          id: session.id,
          title: session.title,
          dateLabel: formatDateLabel(session.starts_at),
          timeLabel: formatTimeLabel(session.starts_at, session.ends_at),
          location: session.location ?? "Lieu a definir",
          bookedCount: Number(session.booked_count),
          capacity: session.capacity,
          attendees: (session.attendees ?? []).map(
            (attendee) => attendee.full_name || attendee.user_id.slice(0, 8)
          )
        })
      );

      if (isMounted) {
        setSessions(nextSessions);
      }
    }

    void loadCoachSessions();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Coach</Text>
        <Text style={styles.title}>Mes seances assignees</Text>
        <Text style={styles.copy}>
          Retrouvez vos prochains cours et la liste des inscrits en temps reel.
        </Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {sessions.length === 0 ? (
        <EmptyState
          eyebrow="Coach"
          title="Aucune seance assignee"
          description="Les seances qui vous sont attribuees apparaitront ici avec la liste des inscrits."
        />
      ) : (
        sessions.map((session) => (
          <View key={session.id} style={styles.card}>
            <Text style={styles.cardTitle}>{session.title}</Text>
            <Text style={styles.cardMeta}>
              {session.dateLabel} • {session.timeLabel}
            </Text>
            <Text style={styles.cardMeta}>
              {session.location} • {session.bookedCount}/{session.capacity} inscrits
            </Text>
            <View style={styles.attendees}>
              {session.attendees.length === 0 ? (
                <Text style={styles.attendeeEmpty}>Aucun inscrit pour le moment.</Text>
              ) : (
                session.attendees.map((attendee) => (
                  <View key={`${session.id}-${attendee}`} style={styles.attendeePill}>
                    <Text style={styles.attendeeText}>{attendee}</Text>
                  </View>
                ))
              )}
            </View>
          </View>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  title: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "800"
  },
  copy: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600"
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
    padding: 18
  },
  cardTitle: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "700"
  },
  cardMeta: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  attendees: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8
  },
  attendeePill: {
    backgroundColor: colors.background,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  attendeeText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600"
  },
  attendeeEmpty: {
    color: colors.textMuted,
    fontSize: 13
  }
});
