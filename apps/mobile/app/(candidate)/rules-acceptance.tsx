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
      <StackHeader title="Acceptation règlement" />
      <Text style={styles.copy}>
        Le règlement intérieur doit être accepté explicitement pour la saison{" "}
        {application?.seasonLabel}.
      </Text>
      <Text style={styles.meta}>
        Statut : {application?.documents.rulesAccepted ? "accepté" : "non accepté"}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        disabled={isAccepted}
        isLoading={isLoading}
        label={isAccepted ? "Règlement déjà accepté" : "Accepter le règlement"}
        onPress={async () => {
          const success = await acceptRules();

          if (success) {
            showToast("Règlement accepté.", "success");
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
