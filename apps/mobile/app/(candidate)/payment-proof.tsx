import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useToast } from "@/components/Toast";
import { Button } from "@/components/ui/Button";
import { SessionPanel } from "@/features/auth/components/SessionPanel";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { colors } from "@/theme/tokens";

export default function PaymentProofScreen() {
  const { showToast } = useToast();
  const { application, error, isLoading, uploadPaymentProof } = useCandidate();

  return (
    <Screen scrollable>
      <StackHeader title="Preuve de paiement" />
      <SessionPanel />
      <Text style={styles.copy}>
        Deposez le justificatif de paiement pour la saison {application?.seasonLabel}.
      </Text>
      <Text style={styles.meta}>
        Statut : {application?.documents.paymentProofUploaded ? "depose" : "manquant"}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        isLoading={isLoading}
        label="Choisir et envoyer un justificatif"
        onPress={async () => {
          const success = await uploadPaymentProof();

          if (success) {
            showToast("Preuve de paiement deposee.", "success");
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
