import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useMemberData } from "@/features/member/MemberDataContext";
import { colors } from "@/theme/tokens";

export default function MembershipStatusScreen() {
  const { membershipSummary } = useMemberData();

  return (
    <Screen>
      <StackHeader title="Statut administratif" />
      <View style={styles.card}>
        <Text style={styles.label}>Saison</Text>
        <Text style={styles.value}>{membershipSummary.seasonLabel}</Text>
        <Text style={styles.label}>Cotisation</Text>
        <Text style={styles.value}>{membershipSummary.membershipFeeLabel}</Text>
        <Text style={styles.label}>Certificat</Text>
        <Text style={styles.value}>{membershipSummary.certificateStatusLabel}</Text>
        <Text style={styles.label}>Statut dossier</Text>
        <Text style={styles.value}>{membershipSummary.dossierStatusLabel}</Text>
        <Text style={styles.label}>Fin de saison</Text>
        <Text style={styles.value}>{membershipSummary.seasonEndsAtLabel}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    padding: 18
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
    textTransform: "uppercase"
  },
  value: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  }
});
