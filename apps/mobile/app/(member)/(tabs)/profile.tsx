import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/features/auth/AuthContext";
import { useMemberData } from "@/features/member/MemberDataContext";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function ProfileScreen() {
  const { derivedStatus, email, roles, signOut } = useAuth();
  const { membershipSummary } = useMemberData();

  return (
    <Screen scrollable>
      <View style={styles.profileCard}>
        <Text style={styles.eyebrow}>Profil</Text>
        <Text style={styles.title}>Mon compte</Text>
        <Text style={styles.body}>
          {email ?? "Aucun email renseigné"} • statut {derivedStatus.replace("_", " ")}
        </Text>
        <Text style={styles.body}>
          Rôles : {roles.length ? roles.join(", ") : "member"}
        </Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Saison active</Text>
        <Text style={styles.summaryValue}>{membershipSummary.seasonLabel}</Text>
        <Text style={styles.summaryMeta}>{membershipSummary.dossierStatusLabel}</Text>
      </View>
      <View style={styles.links}>
        <Link href="/(member)/membership-status" asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Voir le statut administratif</Text>
          </Pressable>
        </Link>
        <Link href="/(member)/records" asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Voir mes records</Text>
          </Pressable>
        </Link>
        <Link href="/(member)/season-renewal" asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Voir le renouvellement</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={() => void signOut()} style={styles.button}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </Pressable>
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
  },
  linkButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  linkButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center"
  },
  button: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  }
});
