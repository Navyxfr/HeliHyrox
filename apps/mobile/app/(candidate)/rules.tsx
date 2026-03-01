import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { SessionPanel } from "@/features/auth/components/SessionPanel";
import { colors } from "@/theme/tokens";

export default function RulesViewScreen() {
  const router = useRouter();

  return (
    <Screen scrollable>
      <SessionPanel />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Reglement interieur</Text>
        <Text style={styles.title}>Conditions d'adhesion</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presence et reservation</Text>
          <Text style={styles.sectionText}>
            Les reservations sont personnelles. Toute annulation doit respecter la fenetre prevue
            par la section. Les absences repetees peuvent entrainer une suspension.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certificat medical</Text>
          <Text style={styles.sectionText}>
            Un certificat medical valide est requis pour chaque saison. Le bureau peut demander un
            nouveau depot si le document est illisible.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paiement et validation</Text>
          <Text style={styles.sectionText}>
            L'adhesion n'est activee qu'apres verification du dossier complet et de la preuve de
            paiement par le bureau.
          </Text>
        </View>
      </View>
      <Button
        label="Continuer vers l'acceptation"
        onPress={() => router.push("/(candidate)/rules-acceptance")}
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
  }
});
