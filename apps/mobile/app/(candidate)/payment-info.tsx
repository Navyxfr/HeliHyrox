import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function PaymentInfoScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="CANDIDATE"
        title="PaymentInfo"
        body="Affichage du montant de cotisation, du RIB de la section et des consignes de virement."
      />
      <Link href="/(candidate)/payment-proof" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Deposer une preuve de paiement</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
