import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
      <View style={styles.links}>
        <Link href="/(member)/membership-status" asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Voir le statut administratif</Text>
          </Pressable>
        </Link>
        <Link href="/(member)/records" asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Voir mes records</Text>
          </Pressable>
        </Link>
        <Link href="/(member)/season-renewal" asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Voir le renouvellement</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={() => void signOut()} style={styles.button}>
        <Text style={styles.buttonText}>Se deconnecter</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  links: {
    gap: 10
  },
  linkButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  linkButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center"
  },
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
