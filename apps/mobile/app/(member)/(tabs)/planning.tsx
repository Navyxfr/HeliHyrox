import { ScrollView, StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { SessionCard } from "@/features/booking/components/SessionCard";
import { useBooking } from "@/features/booking/BookingContext";
import { colors } from "@/theme/tokens";

export default function PlanningScreen() {
  const { error, isLoading, sessions } = useBooking();

  return (
    <Screen>
      <Text style={styles.title}>Planning</Text>
      {isLoading ? <Text style={styles.meta}>Chargement des seances...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ScrollView contentContainerStyle={styles.content}>
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            actionLabel={session.isBooked ? "Voir la reservation" : "Voir la seance"}
            href={`/(member)/session/${session.id}`}
            session={session}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "800"
  },
  content: {
    gap: 12,
    paddingBottom: 32
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
