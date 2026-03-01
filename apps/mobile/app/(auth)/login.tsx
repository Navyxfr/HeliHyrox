import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { useAuth } from "@/features/auth/AuthContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function LoginScreen() {
  const { isSupabaseEnabled, signInAs } = useAuth();

  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="AUTH"
        title="Login"
        body={
          isSupabaseEnabled
            ? "Supabase est configure. Le prochain lot branchera le vrai formulaire de connexion."
            : "Fallback mock actif. Les boutons simulent les statuts pour valider les guards de navigation."
        }
      />
      <Pressable
        onPress={() => void signInAs("candidate")}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>Simuler candidat</Text>
      </Pressable>
      <Pressable
        onPress={() => void signInAs("pending_member")}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>Simuler pending</Text>
      </Pressable>
      <Pressable
        onPress={() => void signInAs("member_active")}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>Simuler membre actif</Text>
      </Pressable>
      <Pressable
        onPress={() => void signInAs("member_active", ["member", "coach"])}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>Simuler coach</Text>
      </Pressable>
      <Pressable
        onPress={() => void signInAs("suspended")}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>Simuler suspendu</Text>
      </Pressable>
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
