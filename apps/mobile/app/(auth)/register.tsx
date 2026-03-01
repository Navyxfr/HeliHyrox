import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";
import { colors } from "@/theme/tokens";

export default function RegisterScreen() {
  const { isLoading, isSupabaseEnabled, signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Auth</Text>
        <Text style={styles.title}>Creer un compte</Text>
        <Text style={styles.body}>
          {isSupabaseEnabled
            ? "Creation de compte publique prete a etre branchee sur Supabase Auth."
            : "Creation de compte publique en mode demonstration. Le flux continue vers une verification email simulee."}
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
            label="Creer un compte"
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
        <Button
          label="Simuler l'inscription"
          onPress={() => router.push("/(auth)/verify-email")}
        />
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
  }
});
