import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function MemberHomeScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="MEMBER"
        title="MemberHome"
        body="Accueil membre avec prochaine seance, statut administratif et actualites prioritaires."
      />
      <Link href="/(member)/my-bookings" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Voir mes reservations</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  }
});
