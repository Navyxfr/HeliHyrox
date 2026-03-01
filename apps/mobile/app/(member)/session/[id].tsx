import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useBooking } from "@/features/booking/BookingContext";
import { colors } from "@/theme/tokens";

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cancelBooking, error, getSessionById, isLoading, reserveSession } =
    useBooking();
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
      <StackHeader title="Detail seance" />
      <PlaceholderPanel
        eyebrow="MEMBER"
        title="SessionDetail"
        body={`${session.title} · ${session.dateLabel} · ${session.startsAtLabel} - ${session.endsAtLabel}`}
      />
      <View style={styles.card}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
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
        <Pressable
          disabled={isLoading}
          onPress={() =>
            void (session.isBooked
              ? cancelBooking(session.id)
              : reserveSession(session.id))
          }
          style={session.isBooked ? styles.secondaryButton : styles.primaryButton}
        >
          <Text
            style={
              session.isBooked ? styles.secondaryButtonText : styles.primaryButtonText
            }
          >
            {isLoading
              ? "Traitement..."
              : session.isBooked
                ? "Annuler la reservation"
                : "Reserver la seance"}
          </Text>
        </Pressable>
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
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600"
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  primaryButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center"
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center"
  }
});
