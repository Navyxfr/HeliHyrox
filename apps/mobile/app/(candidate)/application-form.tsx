import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { useToast } from "@/components/Toast";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useCandidate } from "@/features/candidate/CandidateContext";
import { colors } from "@/theme/tokens";

export default function ApplicationFormScreen() {
  const { application, error, isLoading, saveProfile } = useCandidate();
  const { showToast } = useToast();
  const [firstName, setFirstName] = useState(application?.firstName ?? "");
  const [lastName, setLastName] = useState(application?.lastName ?? "");
  const [phone, setPhone] = useState(application?.phone ?? "");

  return (
    <Screen scrollable>
      <StackHeader title="Dossier adhésion" />
      <TextInput
        onChangeText={setFirstName}
        placeholder="Prénom"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={firstName}
      />
      <TextInput
        onChangeText={setLastName}
        placeholder="Nom"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={lastName}
      />
      <TextInput
        keyboardType="phone-pad"
        onChangeText={setPhone}
        placeholder="Téléphone"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={phone}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        disabled={isLoading}
        onPress={async () => {
          const success = await saveProfile({ firstName, lastName, phone });
          if (success) {
            showToast("Profil enregistré.", "success");
          }
        }}
        style={[styles.button, isLoading ? styles.buttonDisabled : null]}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Enregistrement..." : "Enregistrer le profil"}
        </Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 14
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
