import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CandidateStepper } from "@/features/candidate/components/CandidateStepper";
import { useAuth } from "@/features/auth/AuthContext";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function CandidateDashboardScreen() {
  const { email } = useAuth();
  const { application, error, isLoading } = useCandidate();

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Candidat</Text>
        <Text style={styles.title}>Mon dossier d’adhésion</Text>
        <Text style={styles.body}>
          {email ? `Compte ${email}. ` : ""}
          {application
            ? `Saison ${application.seasonLabel}, statut actuel : ${application.status}.`
            : "Complétez chaque étape pour soumettre votre dossier au bureau."}
        </Text>
      </View>
      {isLoading ? <Text style={styles.meta}>Chargement du dossier...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {application ? <CandidateStepper application={application} /> : null}
      <View style={styles.actions}>
        <Link href="/(candidate)/application-status" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voir le récapitulatif du dossier</Text>
          </Pressable>
        </Link>
        {application?.status === "pending_review" ? (
          <Link href="/(candidate)/pending" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Suivre la validation du bureau</Text>
            </Pressable>
          </Link>
        ) : null}
      </View>
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
  actions: {
    gap: 12
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
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
