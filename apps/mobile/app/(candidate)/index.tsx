import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { CandidateStepper } from "@/features/candidate/components/CandidateStepper";
import { colors } from "@/theme/tokens";

export default function CandidateDashboardScreen() {
  const router = useRouter();
  const { email } = useAuth();
  const { application, error, isLoading } = useCandidate();

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Candidat</Text>
        <Text style={styles.title}>Mon dossier d'adhesion</Text>
        <Text style={styles.body}>
          {email ? `Compte ${email}. ` : ""}
          {application
            ? `Saison ${application.seasonLabel}, statut actuel : ${application.status}.`
            : "Completez chaque etape pour soumettre votre dossier au bureau."}
        </Text>
      </View>
      {isLoading ? <Text style={styles.meta}>Chargement du dossier...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {application ? <CandidateStepper application={application} /> : null}
      <View style={styles.actions}>
        <Button
          label="Voir le recapitulatif du dossier"
          onPress={() => router.push("/(candidate)/application-status")}
          variant="secondary"
        />
        {application?.status === "pending_review" ? (
          <Button
            label="Suivre la validation du bureau"
            onPress={() => router.push("/(candidate)/pending")}
            variant="secondary"
          />
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
