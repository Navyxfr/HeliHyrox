import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/features/auth/AuthContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function VerifyEmailScreen() {
  const { email, isSupabaseEnabled, signInAs } = useAuth();

  return (
    <Screen scrollable>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Vérification email</Text>
        <Text style={styles.title}>Confirmez votre adresse</Text>
        <Text style={styles.body}>
          {email
            ? `Un email de confirmation a été envoyé à ${email}. Ouvrez le lien reçu pour activer votre dossier d’adhésion.`
            : "Un email de confirmation a été envoyé. Ouvrez le lien reçu pour activer votre dossier d’adhésion."}
        </Text>
        <Text style={styles.hint}>
          {isSupabaseEnabled
            ? "Une fois l’adresse confirmée, reconnectez-vous pour reprendre le parcours candidat."
            : "Mode démonstration actif : vous pouvez continuer directement."}
        </Text>
      </View>
      {!isSupabaseEnabled ? (
        <Link href="/(candidate)" asChild>
          <Pressable
            onPress={() => void signInAs("candidate")}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Continuer vers la candidature</Text>
          </Pressable>
        </Link>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    gap: 10,
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
  hint: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20
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
  }
});
