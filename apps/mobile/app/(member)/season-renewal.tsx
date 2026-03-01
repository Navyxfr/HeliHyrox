import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { colors } from "@/theme/tokens";

export default function SeasonRenewalPromptScreen() {
  return (
    <Screen scrollable>
      <StackHeader title="Renouvellement" />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Nouvelle saison</Text>
        <Text style={styles.title}>Préparer le renouvellement</Text>
        <Text style={styles.body}>
          Votre profil administratif reste conservé, mais l’adhésion annuelle
          demande un nouveau certificat médical et une nouvelle preuve de
          paiement.
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Vérifier vos coordonnées</Text>
          <Text style={styles.listItem}>• Déposer le certificat de la nouvelle saison</Text>
          <Text style={styles.listItem}>• Déposer la preuve du nouveau paiement</Text>
        </View>
      </View>
      <Link href="/(candidate)" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Démarrer le renouvellement</Text>
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
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  }
});
