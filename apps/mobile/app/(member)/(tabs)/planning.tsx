import { StyleSheet, Text, View } from "react-native";
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
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Training board</Text>
        <Text style={styles.title}>Planning</Text>
      </View>
      {isLoading ? <Text style={styles.meta}>Chargement des seances...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          actionLabel={session.isBooked ? "Voir la reservation" : "Voir la seance"}
          href={`/(member)/session/${session.id}`}
          session={session}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 6
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "900"
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "600"
  }
});
