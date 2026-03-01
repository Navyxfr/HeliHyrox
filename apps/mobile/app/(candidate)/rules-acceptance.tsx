import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useToast } from "@/components/Toast";
import { Button } from "@/components/ui/Button";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { colors } from "@/theme/tokens";

export default function RulesAcceptanceScreen() {
  const { showToast } = useToast();
  const { application, acceptRules, error, isLoading } = useCandidate();
  const isAccepted = Boolean(application?.documents.rulesAccepted);

  return (
    <Screen scrollable>
      <StackHeader title="Acceptation reglement" />
      <Text style={styles.copy}>
        Le reglement interieur doit etre accepte explicitement pour la saison{" "}
        {application?.seasonLabel}.
      </Text>
      <Text style={styles.meta}>
        Statut : {application?.documents.rulesAccepted ? "accepte" : "non accepte"}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        disabled={isLoading || isAccepted}
        label={
          isAccepted
            ? "Reglement deja accepte"
            : isLoading
              ? "Validation..."
              : "Accepter le reglement"
        }
        onPress={async () => {
          const success = await acceptRules();

          if (success) {
            showToast("Reglement accepte.", "success");
          }
        }}
      />
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
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600"
  }
});
