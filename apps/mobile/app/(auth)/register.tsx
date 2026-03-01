import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function RegisterScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="AUTH"
        title="Register"
        body="Creation de compte publique. Le prochain ecran du vrai parcours sera EmailVerificationPending."
      />
      <Link href="/(auth)/verify-email" asChild>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Simuler inscription</Text>
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

