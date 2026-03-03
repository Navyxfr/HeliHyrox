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
        <Text style={styles.eyebrow}>Authentification</Text>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.body}>
          {isSupabaseEnabled
            ? "Identifiez-vous avec votre compte HeliHyrox."
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
            placeholder="nom@airbus.com"
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
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(auth)/reset-password")}
          >
            <Text style={styles.resetLink}>Mot de passe oublie ?</Text>
          </Pressable>
        </>
      ) : (
        <View style={styles.demoBlock}>
          <Text style={styles.demoTitle}>Simulation rapide</Text>
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
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8
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
    fontSize: 34,
    fontWeight: "900"
  },
  body: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "600"
  },
  resetLink: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5
  },
  demoBlock: {
    gap: 10,
    marginTop: 8
  },
  demoTitle: {
    color: colors.textDim,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase"
  }
});
