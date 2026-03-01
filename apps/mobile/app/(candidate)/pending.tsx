import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/features/auth/AuthContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function PendingDashboardScreen() {
  const { email } = useAuth();

  return (
    <Screen scrollable>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Validation bureau</Text>
        <Text style={styles.title}>Dossier envoyé</Text>
        <Text style={styles.body}>
          Votre dossier est en attente de validation par le bureau HeliHyrox.
          {email ? ` Le compte suivi est ${email}.` : ""}
        </Text>
        <View style={styles.checklist}>
          <Text style={styles.checkItem}>• Vérification du certificat médical</Text>
          <Text style={styles.checkItem}>• Vérification de la preuve de paiement</Text>
          <Text style={styles.checkItem}>• Activation du statut membre</Text>
        </View>
      </View>
      <Link href="/(candidate)/application-status" asChild>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Voir le statut détaillé</Text>
        </Pressable>
      </Link>
      <Link href="/(candidate)/correction-request" asChild>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Voir une demande de correction</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    gap: 12,
    padding: 20
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  title: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "800"
  },
  body: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  checklist: {
    backgroundColor: colors.background,
    borderRadius: 18,
    gap: 8,
    padding: 16
  },
  checkItem: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
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
