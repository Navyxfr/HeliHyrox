import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { useAuth } from "@/features/auth/AuthContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function ProfileScreen() {
  const { derivedStatus, roles, signOut } = useAuth();

  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="MEMBER"
        title="Profile"
        body={`Profil, statut administratif de saison, records et renouvellement. Statut: ${derivedStatus}. Roles: ${roles.join(", ") || "none"}.`}
      />
      <Pressable onPress={() => void signOut()} style={styles.button}>
        <Text style={styles.buttonText}>Se deconnecter</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  }
});
