import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function CorrectionRequestScreen() {
  return (
    <Screen scrollable>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Correction demandée</Text>
        <Text style={styles.title}>Éléments à compléter</Text>
        <Text style={styles.body}>
          Le bureau peut demander des compléments avant validation finale.
          Les cas les plus fréquents sont un certificat illisible, une preuve de
          paiement manquante ou un profil incomplet.
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Vérifier les informations du profil</Text>
          <Text style={styles.listItem}>• Re-déposer un certificat lisible si besoin</Text>
          <Text style={styles.listItem}>• Re-déposer la preuve de paiement si nécessaire</Text>
        </View>
      </View>
      <Link href="/(candidate)" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Retourner au dossier</Text>
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
