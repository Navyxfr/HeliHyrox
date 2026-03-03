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
          Retrouvez votre prochaine seance, le suivi administratif de la saison et les
          dernieres actualites du bureau.
        </Text>
      </View>
      {nextSession ? (
        <View style={styles.cardPrimary}>
          <Text style={styles.cardEyebrow}>Prochaine seance</Text>
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
          title="Aucune seance a venir"
          description="Aucun creneau n'est encore disponible pour votre profil. Revenez bientot."
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
          <Text style={styles.cardEyebrowMuted}>Derniere actualite</Text>
          <Text style={styles.cardTitleDark}>{latestNews.title}</Text>
          <Text style={styles.cardTextDark}>{latestNews.summary}</Text>
        </View>
      ) : null}
      <Link href="/(member)/my-bookings" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Voir mes reservations</Text>
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
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1.2
  },
  body: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22
  },
  cardPrimary: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    gap: 6,
    padding: 18
  },
  card: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    gap: 6,
    padding: 18
  },
  cardEyebrow: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase"
  },
  cardEyebrowMuted: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase"
  },
  cardTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800"
  },
  cardTitleDark: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800"
  },
  cardText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20
  },
  cardTextDark: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 15
  },
  buttonText: {
    color: colors.background,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.6,
    textAlign: "center"
  }
});
