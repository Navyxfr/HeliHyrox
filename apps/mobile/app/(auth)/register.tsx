import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { useAuth } from "@/features/auth/AuthContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function RegisterScreen() {
  const { isLoading, isSupabaseEnabled, signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="AUTH"
        title="Créer un compte"
        body={
          isSupabaseEnabled
            ? "Création de compte publique prête à être branchée sur Supabase Auth."
            : "Création de compte publique en mode démonstration. Le flux continue vers une vérification email simulée."
        }
      />
      {isSupabaseEnabled ? (
        <>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            value={email}
          />
          <TextInput
            onChangeText={setPassword}
            placeholder="Mot de passe"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            style={styles.input}
            value={password}
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <Pressable
            onPress={async () => {
              const result = await signUp(email, password);
              setErrorMessage(result.error);
              if (!result.error) {
                router.replace("/(auth)/verify-email");
              }
            }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              {isLoading ? "Création..." : "Créer un compte"}
            </Text>
          </Pressable>
        </>
      ) : null}
      {!isSupabaseEnabled ? (
        <Link href="/(auth)/verify-email" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Simuler l’inscription</Text>
          </Pressable>
        </Link>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600"
  }
});
