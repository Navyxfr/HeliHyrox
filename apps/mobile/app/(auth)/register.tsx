import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";

export default function RegisterScreen() {
  const { isLoading, isSupabaseEnabled, signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Screen scrollable>
      <PlaceholderPanel
        body={
          isSupabaseEnabled
            ? "Création de compte publique prête à être branchée sur Supabase Auth."
            : "Création de compte publique en mode démonstration. Le flux continue vers une vérification email simulée."
        }
        eyebrow="AUTH"
        title="Créer un compte"
      />
      {isSupabaseEnabled ? (
        <>
          <AppTextInput
            accessibilityLabel="Email"
            autoCapitalize="none"
            error={null}
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            placeholder="Email"
            value={email}
          />
          <AppTextInput
            accessibilityLabel="Mot de passe"
            error={errorMessage}
            label="Mot de passe"
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
          />
          <Button
            isLoading={isLoading}
            label="Créer un compte"
            onPress={async () => {
              const result = await signUp(email, password);
              setErrorMessage(result.error);
              if (!result.error) {
                router.replace("/(auth)/verify-email");
              }
            }}
          />
        </>
      ) : null}
      {!isSupabaseEnabled ? (
        <Link href="/(auth)/verify-email" asChild>
          <Button label="Simuler l’inscription" />
        </Link>
      ) : null}
    </Screen>
  );
}
