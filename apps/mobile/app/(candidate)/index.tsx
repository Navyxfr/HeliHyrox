import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { useAuth } from "@/features/auth/AuthContext";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function CandidateDashboardScreen() {
  const { email } = useAuth();
  const { application, error, isLoading } = useCandidate();

  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="CANDIDATE"
        title="CandidateDashboard"
        body={`Base du parcours candidat: profil, certificat de saison, reglement, paiement et statut du dossier.${email ? ` Compte: ${email}.` : ""}${application ? ` Saison: ${application.seasonLabel}. Statut: ${application.status}.` : ""}`}
      />
      {isLoading ? <Text style={styles.meta}>Chargement du dossier...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.actions}>
        <Link href="/(candidate)/application-form" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Completer le dossier</Text>
          </Pressable>
        </Link>
        <Link href="/(candidate)/medical-certificate" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Certificat medical</Text>
          </Pressable>
        </Link>
        <Link href="/(candidate)/rules" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Consulter le reglement</Text>
          </Pressable>
        </Link>
        <Link href="/(candidate)/payment-info" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voir les infos paiement</Text>
          </Pressable>
        </Link>
        <Link href="/(candidate)/application-status" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Suivre le dossier</Text>
          </Pressable>
        </Link>
        <Link href="/(candidate)/pending" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voir le statut pending</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 12
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  primaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
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
