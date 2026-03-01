import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function LoginScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="AUTH"
        title="Login"
        body="Ecran de connexion MVP. A brancher ensuite sur Supabase Auth avec verification email et reset mot de passe."
      />
      <Link href="/(candidate)" asChild>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Simuler compte candidat</Text>
        </Pressable>
      </Link>
      <Link href="/(member)/(tabs)" asChild>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Simuler membre actif</Text>
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
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  }
});

