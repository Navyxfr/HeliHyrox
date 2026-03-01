import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { useAuth } from "@/features/auth/AuthContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function PendingDashboardScreen() {
  const { email } = useAuth();

  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="PENDING"
        title="PendingDashboard"
        body={`Dossier soumis et en attente de validation bureau.${email ? ` Compte: ${email}.` : ""} En cas de correction demandee, retour vers le parcours candidat.`}
      />
      <Link href="/(candidate)/application-status" asChild>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Voir le statut detaille</Text>
        </Pressable>
      </Link>
      <Link href="/(candidate)/correction-request" asChild>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Voir une demande de correction</Text>
        </Pressable>
      </Link>
      <Link href="/(candidate)" asChild>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Simuler retour correction</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
