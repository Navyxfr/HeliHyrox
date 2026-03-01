import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function RulesViewScreen() {
  return (
    <Screen scrollable>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Règlement intérieur</Text>
        <Text style={styles.title}>Conditions d’adhésion</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Présence et réservation</Text>
          <Text style={styles.sectionText}>
            Les réservations sont personnelles. Toute annulation doit respecter
            la fenêtre prévue par la section. Les absences répétées peuvent
            entraîner une suspension.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certificat médical</Text>
          <Text style={styles.sectionText}>
            Un certificat médical valide est requis pour chaque saison. Le
            bureau peut demander un nouveau dépôt si le document est illisible.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paiement et validation</Text>
          <Text style={styles.sectionText}>
            L’adhésion n’est activée qu’après vérification du dossier complet et
            de la preuve de paiement par le bureau.
          </Text>
        </View>
      </View>
      <Link href="/(candidate)/rules-acceptance" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continuer vers l’acceptation</Text>
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
    gap: 14,
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
  section: {
    gap: 6
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700"
  },
  sectionText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21
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
