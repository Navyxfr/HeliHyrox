import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { useAuth } from "@/features/auth/AuthContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function RegisterScreen() {
  const { isSupabaseEnabled } = useAuth();

  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="AUTH"
        title="Register"
        body={
          isSupabaseEnabled
            ? "Creation de compte publique prete a etre branchee sur Supabase Auth."
            : "Creation de compte publique en placeholder. Le flux continue vers une verification email mockee."
        }
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
