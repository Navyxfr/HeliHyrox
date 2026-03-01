import { ScrollView, StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { SessionCard } from "@/features/booking/components/SessionCard";
import { myBookings } from "@/features/booking/mockData";
import { colors } from "@/theme/tokens";

export default function MyBookingsScreen() {
  return (
    <Screen>
      <StackHeader title="Mes reservations" />
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
  }
});
