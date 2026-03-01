import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { colors } from "@/theme/tokens";

export default function CorrectionRequestScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="PENDING"
        title="CorrectionRequestDetail"
        body="Detail des corrections demandees par le bureau avant retour dans le parcours candidat."
      />
      <Link href="/(candidate)" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Retourner au dossier</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
