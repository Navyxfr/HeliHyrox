import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function PublicHomeScreen() {
  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.kicker}>AIRBUS HELICOPTERS / SECTION SPORTIVE</Text>
        <Text style={styles.title}>HeliHyrox</Text>
        <Text style={styles.subtitle}>
          Application publique pour adhesion de saison, espace membre, coach et
          bureau.
        </Text>
      </View>

      <View style={styles.actions}>
        <Link href="/(auth)/login" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Se connecter</Text>
          </Pressable>
        </Link>
        <Link href="/(auth)/register" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Creer un compte</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 12,
    paddingTop: 32
  },
  kicker: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1
  },
  title: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24
  },
  actions: {
    gap: 12
  },
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

