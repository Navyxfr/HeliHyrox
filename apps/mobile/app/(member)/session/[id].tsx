import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useToast } from "@/components/Toast";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/features/booking/BookingContext";
import { colors } from "@/theme/tokens";

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showToast } = useToast();
  const { cancelBooking, error, getSessionById, isLoading, reserveSession } = useBooking();
  const session = getSessionById(id);

  if (!session) {
    return (
      <Screen>
        <EmptyState
          eyebrow="Member"
          title="Séance introuvable"
          description="La séance demandée n’est pas disponible dans votre planning."
        />
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <StackHeader title="Détail séance" />
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Séance</Text>
        <Text style={styles.heroTitle}>{session.title}</Text>
        <Text style={styles.heroMeta}>
          {session.dateLabel} • {session.startsAtLabel} - {session.endsAtLabel}
        </Text>
      </View>
      <View style={styles.card}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.label}>Lieu</Text>
        <Text style={styles.value}>{session.location}</Text>
        <Text style={styles.label}>Coach</Text>
        <Text style={styles.value}>{session.coachName}</Text>
        <Text style={styles.label}>Capacité</Text>
        <Text style={styles.value}>
          {session.bookedCount}/{session.capacity} inscrits
        </Text>
        <Text style={styles.label}>Type</Text>
        <Text style={styles.value}>{session.sessionType}</Text>
        <Button
          isLoading={isLoading}
          label={session.isBooked ? "Annuler la réservation" : "Réserver la séance"}
          onPress={async () => {
            const success = session.isBooked
              ? await cancelBooking(session.id)
              : await reserveSession(session.id);

            if (success) {
              showToast(
                session.isBooked ? "Réservation annulée." : "Réservation confirmée.",
                "success"
              );
            }
          }}
          variant={session.isBooked ? "secondary" : "primary"}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    gap: 6,
    padding: 18
  },
  heroEyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: "800"
  },
  heroMeta: {
    color: colors.surface,
    fontSize: 14,
    lineHeight: 20
  },
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
  }
});
