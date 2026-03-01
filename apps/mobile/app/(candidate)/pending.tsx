import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";
import { colors } from "@/theme/tokens";

export default function PendingDashboardScreen() {
  const router = useRouter();
  const { email } = useAuth();

  return (
    <Screen scrollable>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Validation bureau</Text>
        <Text style={styles.title}>Dossier envoye</Text>
        <Text style={styles.body}>
          Votre dossier est en attente de validation par le bureau HeliHyrox.
          {email ? ` Le compte suivi est ${email}.` : ""}
        </Text>
        <View style={styles.checklist}>
          <Text style={styles.checkItem}>- Verification du certificat medical</Text>
          <Text style={styles.checkItem}>- Verification de la preuve de paiement</Text>
          <Text style={styles.checkItem}>- Activation du statut membre</Text>
        </View>
      </View>
      <Button
        label="Voir le statut detaille"
        onPress={() => router.push("/(candidate)/application-status")}
        variant="secondary"
      />
      <Button
        label="Voir une demande de correction"
        onPress={() => router.push("/(candidate)/correction-request")}
        variant="secondary"
      />
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
  }
});
