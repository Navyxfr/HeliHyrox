import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { colors } from "@/theme/tokens";

export default function PaymentInfoScreen() {
  const { application } = useCandidate();

  return (
    <Screen>
      <StackHeader title="Informations paiement" />
      <Text style={styles.copy}>
        Montant: {application?.membershipFeeLabel ?? "A definir"}
      </Text>
      <Text style={styles.copy}>RIB section: {application?.ribLabel ?? "N/A"}</Text>
      <Link href="/(candidate)/payment-proof" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Deposer une preuve de paiement</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
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
  }
});
