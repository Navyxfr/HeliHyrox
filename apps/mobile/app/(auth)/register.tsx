import { useState } from "react";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { useAuth } from "@/features/auth/AuthContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function RegisterScreen() {
  const { isLoading, isSupabaseEnabled, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="AUTH"
        title="Register"
        body={
          isSupabaseEnabled
            ? "Creation de compte publique prete a etre branchee sur Supabase Auth."
            : "Creation de compte publique en placeholder. Le flux continue vers une verification email mockee."
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
            }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              {isLoading ? "Creation..." : "Creer un compte"}
            </Text>
          </Pressable>
        </>
      ) : null}
      <Link href="/(auth)/verify-email" asChild>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Simuler inscription</Text>
        </Pressable>
      </Link>
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
