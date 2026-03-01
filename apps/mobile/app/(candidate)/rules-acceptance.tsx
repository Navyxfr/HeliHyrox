import { Pressable, StyleSheet, Text } from "react-native";
import { useToast } from "@/components/Toast";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { colors } from "@/theme/tokens";

export default function RulesAcceptanceScreen() {
  const { showToast } = useToast();
  const { application, acceptRules, error, isLoading } = useCandidate();
  const isAccepted = Boolean(application?.documents.rulesAccepted);

  return (
    <Screen scrollable>
      <StackHeader title="Acceptation règlement" />
      <Text style={styles.copy}>
        Le règlement intérieur doit être accepté explicitement pour la saison{" "}
        {application?.seasonLabel}.
      </Text>
      <Text style={styles.meta}>
        Statut : {application?.documents.rulesAccepted ? "accepté" : "non accepté"}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        disabled={isLoading || isAccepted}
        onPress={async () => {
          const success = await acceptRules();
          if (success) {
            showToast("Règlement accepté.", "success");
          }
        }}
        style={[styles.button, isLoading || isAccepted ? styles.buttonDisabled : null]}
      >
        <Text style={styles.buttonText}>
          {isAccepted ? "Règlement déjà accepté" : isLoading ? "Validation..." : "Accepter le règlement"}
        </Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600"
  }
});
