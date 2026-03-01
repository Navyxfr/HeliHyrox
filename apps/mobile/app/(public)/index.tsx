import { derivedStatusLabels } from "@helihyrox/shared";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";
import { getTargetPath } from "@/features/auth/routeAccess";
import { colors } from "@/theme/tokens";

export default function PublicHomeScreen() {
  const router = useRouter();
  const { derivedStatus, email } = useAuth();
  const hasSession = derivedStatus !== "public";

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.kicker}>AIRBUS HELICOPTERS / SECTION SPORTIVE</Text>
        <Text style={styles.title}>HeliHyrox</Text>
        <Text style={styles.subtitle}>
          Application publique pour adhesion de saison, espace membre, coach et bureau.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button label="Se connecter" onPress={() => router.push("/(auth)/login")} />
        <Button
          label="Creer un compte"
          onPress={() => router.push("/(auth)/register")}
          variant="secondary"
        />
      </View>
      {hasSession ? (
        <View style={styles.sessionCard}>
          <Text style={styles.sessionTitle}>Session active</Text>
          <Text style={styles.sessionBody}>
            {email ?? "Compte connecte"} - {derivedStatusLabels[derivedStatus]}
          </Text>
          <Button
            label="Continuer avec ce compte"
            onPress={() => router.push(getTargetPath(derivedStatus))}
            variant="secondary"
          />
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 12,
    paddingTop: 32
  },
  kicker: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1
  },
  title: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24
  },
  actions: {
    gap: 12
  },
  sessionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 10,
    padding: 18
  },
  sessionTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "800"
  },
  sessionBody: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  }
});
