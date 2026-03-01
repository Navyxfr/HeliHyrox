import { StyleSheet, Text, View } from "react-native";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { mockSessions } from "@/features/booking/mockData";
import { colors } from "@/theme/tokens";

export default function CoachSessionsScreen() {
  const assignedSessions = mockSessions.filter((session) => session.coachName === "Julie M.");

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Coach</Text>
        <Text style={styles.title}>Mes séances assignées</Text>
      </View>
      {assignedSessions.length === 0 ? (
        <EmptyState
          eyebrow="Coach"
          title="Aucune séance assignée"
          description="Les séances qui vous sont attribuées apparaîtront ici avec la liste des inscrits."
        />
      ) : (
        assignedSessions.map((session) => (
          <View key={session.id} style={styles.card}>
            <Text style={styles.cardTitle}>{session.title}</Text>
            <Text style={styles.cardMeta}>
              {session.dateLabel} • {session.startsAtLabel} - {session.endsAtLabel}
            </Text>
            <Text style={styles.cardMeta}>
              {session.location} • {session.bookedCount}/{session.capacity} inscrits
            </Text>
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
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
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
  }
});
