import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { colors } from "@/theme/tokens";

export default function CorrectionRequestScreen() {
  const router = useRouter();

  return (
    <Screen scrollable>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Correction demandee</Text>
        <Text style={styles.title}>Elements a completer</Text>
        <Text style={styles.body}>
          Le bureau peut demander des complements avant validation finale. Les cas les plus
          frequents sont un certificat illisible, une preuve de paiement manquante ou un profil
          incomplet.
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>- Verifier les informations du profil</Text>
          <Text style={styles.listItem}>- Re-deposer un certificat lisible si besoin</Text>
          <Text style={styles.listItem}>- Re-deposer la preuve de paiement si necessaire</Text>
        </View>
      </View>
      <Button
        label="Retourner au dossier"
        onPress={() => router.push("/(candidate)")}
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
  list: {
    backgroundColor: colors.background,
    borderRadius: 18,
    gap: 8,
    padding: 16
  },
  listItem: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  }
});
