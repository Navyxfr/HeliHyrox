import { Link, type Href } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";
import { colors } from "@/theme/tokens";

export default function LoginScreen() {
  const { isLoading, isSupabaseEnabled, signIn, signInAs } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Screen scrollable>
      <PlaceholderPanel
        body={
          isSupabaseEnabled
            ? "Supabase est configuré. Connectez-vous avec votre compte existant."
            : "Fallback mock actif. Les boutons simulent les statuts pour valider les guards de navigation."
        }
        eyebrow="AUTH"
        title="Connexion"
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
            label="Se connecter"
            onPress={async () => {
              const result = await signIn(email, password);
              setErrorMessage(result.error);
            }}
          />
          <Link
            href={"/(auth)/reset-password" as Href}
            style={{ color: colors.primary, fontWeight: "600" }}
          >
            Mot de passe oublié ?
          </Link>
        </>
      ) : null}
      {!isSupabaseEnabled ? (
        <>
          <Button label="Simuler candidat" onPress={() => void signInAs("candidate")} />
          <Button
            label="Simuler pending"
            onPress={() => void signInAs("pending_member")}
            variant="secondary"
          />
          <Button
            label="Simuler membre actif"
            onPress={() => void signInAs("member_active")}
            variant="secondary"
          />
          <Button
            label="Simuler coach"
            onPress={() => void signInAs("member_active", ["member", "coach"])}
            variant="secondary"
          />
          <Button
            label="Simuler suspendu"
            onPress={() => void signInAs("suspended")}
            variant="secondary"
          />
        </>
      ) : null}
      {errorMessage ? <Text style={{ color: colors.danger }}>{errorMessage}</Text> : null}
    </Screen>
  );
}
