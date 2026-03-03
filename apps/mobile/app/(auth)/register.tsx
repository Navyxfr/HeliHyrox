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
        <Text style={styles.eyebrow}>Nouveau compte</Text>
        <Text style={styles.title}>Inscription</Text>
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
            placeholder="nom@airbus.com"
            value={email}
          />
          <AppTextInput
            accessibilityLabel="Mot de passe"
            error={errorMessage}
            label="Mot de passe"
            onChangeText={setPassword}
            placeholder="Minimum 8 caracteres"
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
      ) : (
        <Button
          label="Simuler l'inscription"
          onPress={() => router.push("/(auth)/verify-email")}
        />
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
  }
});
