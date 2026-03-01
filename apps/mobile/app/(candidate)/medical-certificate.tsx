import { Pressable, StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { colors } from "@/theme/tokens";

export default function MedicalCertificateScreen() {
  const { application, error, isLoading, uploadMedicalCertificate } =
    useCandidate();

  return (
    <Screen>
      <StackHeader title="Certificat medical" />
      <Text style={styles.copy}>
        Depot logique du certificat medical pour la saison {application?.seasonLabel}.
      </Text>
      <Text style={styles.meta}>
        Statut:{" "}
        {application?.documents.medicalCertificateUploaded ? "depose" : "manquant"}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        onPress={() => void uploadMedicalCertificate()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Envoi..." : "Marquer comme depose"}
        </Text>
      </Pressable>
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
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600"
  }
});
