import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { SessionCard } from "@/features/booking/components/SessionCard";
import { useBooking } from "@/features/booking/BookingContext";
import { colors } from "@/theme/tokens";

export default function PlanningScreen() {
  const { error, isLoading, refreshSessions, sessions } = useBooking();

  return (
    <Screen
      refreshControlProps={{
        onRefresh: () => {
          void refreshSessions();
        },
        refreshing: isLoading,
        tintColor: colors.primary
      }}
      scrollable
    >
      <Text style={styles.title}>Planning</Text>
      {isLoading ? <Text style={styles.meta}>Chargement des séances...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          actionLabel={session.isBooked ? "Voir la réservation" : "Voir la séance"}
          href={`/(member)/session/${session.id}`}
          session={session}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "800"
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600"
  }
});
