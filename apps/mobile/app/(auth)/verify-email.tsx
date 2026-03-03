import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";
import { colors } from "@/theme/tokens";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { email, isSupabaseEnabled, signInAs } = useAuth();

  return (
    <Screen scrollable>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Verification email</Text>
        <Text style={styles.title}>Confirmez votre adresse</Text>
        <Text style={styles.body}>
          {email
            ? `Un email de confirmation a ete envoye a ${email}. Ouvrez le lien recu pour activer votre dossier d'adhesion.`
            : "Un email de confirmation a ete envoye. Ouvrez le lien recu pour activer votre dossier d'adhesion."}
        </Text>
        <Text style={styles.hint}>
          {isSupabaseEnabled
            ? "Une fois l'adresse confirmee, reconnectez-vous pour reprendre le parcours candidat."
            : "Mode demonstration actif : vous pouvez continuer directement."}
        </Text>
      </View>
      {!isSupabaseEnabled ? (
        <Button
          label="Continuer vers la candidature"
          onPress={async () => {
            await signInAs("candidate");
            router.push("/(candidate)");
          }}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
    padding: 20
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase"
  },
  title: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "900"
  },
  body: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22
  },
  hint: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 20
  }
});
