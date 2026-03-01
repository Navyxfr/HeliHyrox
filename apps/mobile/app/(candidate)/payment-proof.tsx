import { Pressable, StyleSheet, Text } from "react-native";
import { useToast } from "@/components/Toast";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { colors } from "@/theme/tokens";

export default function PaymentProofScreen() {
  const { showToast } = useToast();
  const { application, error, isLoading, uploadPaymentProof } = useCandidate();

  return (
    <Screen scrollable>
      <StackHeader title="Preuve de paiement" />
      <Text style={styles.copy}>
        Déposez le justificatif de paiement pour la saison{" "}
        {application?.seasonLabel}.
      </Text>
      <Text style={styles.meta}>
        Statut : {application?.documents.paymentProofUploaded ? "déposé" : "manquant"}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        disabled={isLoading}
        onPress={async () => {
          const success = await uploadPaymentProof();
          if (success) {
            showToast("Preuve de paiement déposée.", "success");
          }
        }}
        style={[styles.button, isLoading ? styles.buttonDisabled : null]}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Envoi..." : "Choisir et envoyer un justificatif"}
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
  buttonDisabled: {
    opacity: 0.6
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
