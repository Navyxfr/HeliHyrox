import { derivedStatusLabels } from "@helihyrox/shared";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/AuthContext";
import { useMemberData } from "@/features/member/MemberDataContext";
import { colors } from "@/theme/tokens";

export default function ProfileScreen() {
  const router = useRouter();
  const { derivedStatus, email, roles, signOut } = useAuth();
  const { membershipSummary } = useMemberData();

  return (
    <Screen scrollable>
      <View style={styles.profileCard}>
        <Text style={styles.eyebrow}>Profil</Text>
        <Text style={styles.title}>Mon compte</Text>
        <Text style={styles.body}>
          {email ?? "Aucun email renseigne"} - statut {derivedStatusLabels[derivedStatus]}
        </Text>
        <Text style={styles.body}>Roles : {roles.length ? roles.join(", ") : "member"}</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Saison active</Text>
        <Text style={styles.summaryValue}>{membershipSummary.seasonLabel}</Text>
        <Text style={styles.summaryMeta}>{membershipSummary.dossierStatusLabel}</Text>
      </View>
      <View style={styles.links}>
        <Button
          label="Voir le statut administratif"
          onPress={() => router.push("/(member)/membership-status")}
          variant="secondary"
        />
        <Button
          label="Voir mes records"
          onPress={() => router.push("/(member)/records")}
          variant="secondary"
        />
        <Button
          label="Voir le renouvellement"
          onPress={() => router.push("/(member)/season-renewal")}
          variant="secondary"
        />
      </View>
      <Button label="Se deconnecter" onPress={() => void signOut()} variant="ghost" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
    padding: 20
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
    fontSize: 28,
    fontWeight: "800"
  },
  body: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  summaryCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    gap: 6,
    padding: 18
  },
  summaryLabel: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  summaryValue: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: "800"
  },
  summaryMeta: {
    color: colors.surface,
    fontSize: 14,
    lineHeight: 20
  },
  links: {
    gap: 10
  }
});
