import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function VerifyEmailScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="AUTH"
        title="EmailVerificationPending"
        body="Attente de verification email avant ouverture du dossier d'adhesion."
      />
      <Link href="/(candidate)" asChild>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continuer vers candidature</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  primaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  }
});

