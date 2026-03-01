import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { colors } from "@/theme/tokens";

export default function SeasonRenewalPromptScreen() {
  return (
    <Screen>
      <StackHeader title="Renouvellement" />
      <PlaceholderPanel
        eyebrow="MEMBER"
        title="SeasonRenewalPrompt"
        body="Une nouvelle saison est ouverte. Le profil reste conserve, mais il faut deposer un nouveau certificat et une nouvelle preuve de paiement."
      />
      <Link href="/(candidate)" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Demarrer le renouvellement</Text>
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
