import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { useToast } from "@/components/Toast";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";
import { colors } from "@/theme/tokens";

export default function ResetPasswordScreen() {
  const { isLoading, isSupabaseEnabled, resetPassword } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Auth</Text>
        <Text style={styles.title}>Reinitialiser le mot de passe</Text>
        <Text style={styles.body}>
          {isSupabaseEnabled
            ? "Saisissez votre adresse email pour recevoir un lien de reinitialisation."
            : "Le reset password n'est disponible qu'avec Supabase configure."}
        </Text>
      </View>
      <AppTextInput
        accessibilityLabel="Email"
        autoCapitalize="none"
        error={errorMessage}
        keyboardType="email-address"
        label="Email"
        onChangeText={setEmail}
        placeholder="Email"
        value={email}
      />
      <Button
        disabled={!isSupabaseEnabled}
        isLoading={isLoading}
        label="Envoyer le lien de reinitialisation"
        onPress={async () => {
          const result = await resetPassword(email);
          setErrorMessage(result.error);

          if (!result.error) {
            showToast("Lien de reinitialisation envoye.", "success");
          }
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8
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
  }
});
