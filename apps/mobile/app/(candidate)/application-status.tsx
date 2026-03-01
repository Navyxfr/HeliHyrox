import { applicationStatusLabels } from "@helihyrox/shared";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useToast } from "@/components/Toast";
import { Button } from "@/components/ui/Button";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { colors } from "@/theme/tokens";

export default function ApplicationStatusScreen() {
  const { showToast } = useToast();
  const { application, error, isLoading, submitApplication } = useCandidate();
  const canSubmit = Boolean(
    application?.firstName &&
      application?.lastName &&
      application?.documents.medicalCertificateUploaded &&
      application?.documents.paymentProofUploaded &&
      application?.documents.rulesAccepted
  );

  return (
    <Screen scrollable>
      <StackHeader title="Statut du dossier" />
      <View style={styles.card}>
        <Text style={styles.label}>Statut</Text>
        <Text style={styles.value}>
          {application?.status ? applicationStatusLabels[application.status] : "Inconnu"}
        </Text>
        <Text style={styles.label}>Profil</Text>
        <Text style={styles.value}>
          {application?.firstName && application?.lastName ? "complet" : "incomplet"}
        </Text>
        <Text style={styles.label}>Certificat</Text>
        <Text style={styles.value}>
          {application?.documents.medicalCertificateUploaded ? "déposé" : "manquant"}
        </Text>
        <Text style={styles.label}>Règlement</Text>
        <Text style={styles.value}>
          {application?.documents.rulesAccepted ? "accepté" : "non accepté"}
        </Text>
        <Text style={styles.label}>Paiement</Text>
        <Text style={styles.value}>
          {application?.documents.paymentProofUploaded ? "déposé" : "manquant"}
        </Text>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        disabled={!canSubmit}
        isLoading={isLoading}
        label={canSubmit ? "Soumettre le dossier au bureau" : "Dossier incomplet"}
        onPress={async () => {
          const success = await submitApplication();

          if (success) {
            showToast("Dossier soumis au bureau.", "success");
          }
        }}
      />
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
