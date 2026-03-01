import { useState } from "react";
import { Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
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
      <PlaceholderPanel
        body={
          isSupabaseEnabled
            ? "Saisissez votre adresse email pour recevoir un lien de réinitialisation."
            : "Le reset password n’est disponible qu’avec Supabase configuré."
        }
        eyebrow="AUTH"
        title="Réinitialiser le mot de passe"
      />
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
        label="Envoyer le lien de réinitialisation"
        onPress={async () => {
          const result = await resetPassword(email);
          setErrorMessage(result.error);

          if (!result.error) {
            showToast("Lien de réinitialisation envoyé.", "success");
          }
        }}
      />
      {errorMessage ? <Text style={{ color: colors.danger }}>{errorMessage}</Text> : null}
    </Screen>
  );
}
