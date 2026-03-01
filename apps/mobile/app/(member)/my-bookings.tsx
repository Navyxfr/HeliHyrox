import { ScrollView, StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { SessionCard } from "@/features/booking/components/SessionCard";
import { useBooking } from "@/features/booking/BookingContext";
import { colors } from "@/theme/tokens";

export default function MyBookingsScreen() {
  const { error, isLoading, myBookings } = useBooking();

  return (
    <Screen>
      <StackHeader title="Mes reservations" />
      {isLoading ? <Text style={styles.meta}>Chargement des reservations...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ScrollView contentContainerStyle={styles.content}>
        {myBookings.map((session) => (
          <SessionCard
            key={session.id}
            actionLabel="Voir la reservation"
            href={`/(member)/session/${session.id}`}
            session={session}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
