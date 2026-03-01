import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function CandidateDashboardScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="CANDIDATE"
        title="CandidateDashboard"
        body="Base du parcours candidat: profil, certificat de saison, reglement, paiement et statut du dossier."
      />
      <View style={styles.actions}>
        <Link href="/(candidate)/application-form" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Completer le dossier</Text>
          </Pressable>
        </Link>
        <Link href="/(candidate)/pending" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voir le statut pending</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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

