import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";
import { colors } from "@/theme/tokens";

export default function LoginScreen() {
  const router = useRouter();
  const { isLoading, isSupabaseEnabled, signIn, signInAs } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Auth</Text>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.body}>
          {isSupabaseEnabled
            ? "Connectez-vous avec votre compte existant."
            : "Fallback mock actif. Les boutons ci-dessous simulent les statuts pour valider la navigation."}
        </Text>
      </View>
      {isSupabaseEnabled ? (
        <>
          <AppTextInput
            accessibilityLabel="Email"
            autoCapitalize="none"
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
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(auth)/reset-password")}
          >
            <Text style={styles.resetLink}>Mot de passe oublie ?</Text>
          </Pressable>
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
  },
  resetLink: {
    color: colors.primary,
    fontWeight: "600"
  }
});
