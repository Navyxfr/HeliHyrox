import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { getSessionById } from "@/features/booking/mockData";
import { colors } from "@/theme/tokens";

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const session = getSessionById(id);

  if (!session) {
    return (
      <Screen>
        <PlaceholderPanel
          eyebrow="MEMBER"
          title="SessionDetail"
          body="Seance introuvable dans les donnees mockees."
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="MEMBER"
        title="SessionDetail"
        body={`${session.title} · ${session.dateLabel} · ${session.startsAtLabel} - ${session.endsAtLabel}`}
      />
      <View style={styles.card}>
        <Text style={styles.label}>Lieu</Text>
        <Text style={styles.value}>{session.location}</Text>
        <Text style={styles.label}>Coach</Text>
        <Text style={styles.value}>{session.coachName}</Text>
        <Text style={styles.label}>Capacite</Text>
        <Text style={styles.value}>
          {session.bookedCount}/{session.capacity} inscrits
        </Text>
        <Text style={styles.label}>Type</Text>
        <Text style={styles.value}>{session.sessionType}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    padding: 18
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginTop: 6,
    textTransform: "uppercase"
  },
  value: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  }
});
