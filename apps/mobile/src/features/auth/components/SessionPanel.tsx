import { derivedStatusLabels } from "@helihyrox/shared";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";
import { colors } from "@/theme/tokens";

type SessionPanelProps = {
  title?: string;
  body?: string;
  continueLabel?: string;
  onContinue?: () => void;
};

export function SessionPanel({
  title = "Compte connecte",
  body,
  continueLabel,
  onContinue
}: SessionPanelProps) {
  const { derivedStatus, email, signOut } = useAuth();

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Session</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>
        {email ?? "Aucun email"} - {derivedStatusLabels[derivedStatus]}
      </Text>
      {body ? <Text style={styles.meta}>{body}</Text> : null}
      <View style={styles.actions}>
        {continueLabel && onContinue ? (
          <Button label={continueLabel} onPress={onContinue} variant="secondary" />
        ) : null}
        <Button label="Se deconnecter" onPress={() => void signOut()} variant="ghost" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
    padding: 18
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
    fontSize: 18,
    fontWeight: "800"
  },
  body: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20
  },
  actions: {
    gap: 10
  }
});
