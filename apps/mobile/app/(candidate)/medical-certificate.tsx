import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useToast } from "@/components/Toast";
import { Button } from "@/components/ui/Button";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { colors } from "@/theme/tokens";

export default function MedicalCertificateScreen() {
  const { showToast } = useToast();
  const { application, error, isLoading, uploadMedicalCertificate } = useCandidate();

  return (
    <Screen scrollable>
      <StackHeader title="Certificat médical" />
      <Text style={styles.copy}>
        Déposez votre certificat médical pour la saison {application?.seasonLabel}.
      </Text>
      <Text style={styles.meta}>
        Statut : {application?.documents.medicalCertificateUploaded ? "déposé" : "manquant"}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        isLoading={isLoading}
        label="Choisir et envoyer un document"
        onPress={async () => {
          const success = await uploadMedicalCertificate();

          if (success) {
            showToast("Certificat déposé.", "success");
          }
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
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
