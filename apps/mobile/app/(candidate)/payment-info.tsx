import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { Button } from "@/components/ui/Button";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { colors } from "@/theme/tokens";

export default function PaymentInfoScreen() {
  const router = useRouter();
  const { application } = useCandidate();

  return (
    <Screen>
      <StackHeader title="Informations paiement" />
      <Text style={styles.copy}>Montant: {application?.membershipFeeLabel ?? "A definir"}</Text>
      <Text style={styles.copy}>RIB section: {application?.ribLabel ?? "N/A"}</Text>
      <Button
        label="Deposer une preuve de paiement"
        onPress={() => router.push("/(candidate)/payment-proof")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  }
});
