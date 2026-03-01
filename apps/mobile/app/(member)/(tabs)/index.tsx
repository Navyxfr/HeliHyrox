import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { useBooking } from "@/features/booking/BookingContext";
import { useMemberData } from "@/features/member/MemberDataContext";
import { colors } from "@/theme/tokens";

export default function MemberHomeScreen() {
  const { sessions } = useBooking();
  const { membershipSummary, news } = useMemberData();
  const nextSession = sessions.find((session) => session.isBooked) ?? sessions[0] ?? null;
  const latestNews = news[0] ?? null;

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Espace membre</Text>
        <Text style={styles.title}>Bienvenue sur HeliHyrox</Text>
        <Text style={styles.body}>
          Retrouvez votre prochaine séance, le suivi administratif de la saison
          et les dernières actualités du bureau.
        </Text>
      </View>
      {nextSession ? (
        <View style={styles.cardPrimary}>
          <Text style={styles.cardEyebrow}>Prochaine séance</Text>
          <Text style={styles.cardTitle}>{nextSession.title}</Text>
          <Text style={styles.cardText}>
            {nextSession.dateLabel} • {nextSession.startsAtLabel} - {nextSession.endsAtLabel}
          </Text>
          <Text style={styles.cardText}>
            {nextSession.location} • Coach {nextSession.coachName}
          </Text>
        </View>
      ) : (
        <EmptyState
          eyebrow="Planning"
          title="Aucune séance à venir"
          description="Aucun créneau n’est encore disponible pour votre profil. Revenez bientôt."
        />
      )}
      <View style={styles.card}>
        <Text style={styles.cardEyebrowMuted}>Statut administratif</Text>
        <Text style={styles.cardTitleDark}>{membershipSummary.dossierStatusLabel}</Text>
        <Text style={styles.cardTextDark}>
          Certificat : {membershipSummary.certificateStatusLabel}
        </Text>
        <Text style={styles.cardTextDark}>
          Fin de saison : {membershipSummary.seasonEndsAtLabel}
        </Text>
      </View>
      {latestNews ? (
        <View style={styles.card}>
          <Text style={styles.cardEyebrowMuted}>Dernière actualité</Text>
          <Text style={styles.cardTitleDark}>{latestNews.title}</Text>
          <Text style={styles.cardTextDark}>{latestNews.summary}</Text>
        </View>
      ) : null}
      <Link href="/(member)/my-bookings" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Voir mes réservations</Text>
        </Pressable>
      </Link>
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
  body: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  cardPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    gap: 6,
    padding: 18
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    padding: 18
  },
  cardEyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  cardEyebrowMuted: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  cardTitle: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: "800"
  },
  cardTitleDark: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "800"
  },
  cardText: {
    color: colors.surface,
    fontSize: 14,
    lineHeight: 20
  },
  cardTextDark: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  }
});
