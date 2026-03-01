import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useToast } from "@/components/Toast";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { Button } from "@/components/ui/Button";
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
      <StackHeader title="Dossier adhesion" />
      <AppTextInput onChangeText={setFirstName} placeholder="Prenom" value={firstName} />
      <AppTextInput onChangeText={setLastName} placeholder="Nom" value={lastName} />
      <AppTextInput
        keyboardType="phone-pad"
        onChangeText={setPhone}
        placeholder="Telephone"
        value={phone}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        disabled={isLoading}
        label={isLoading ? "Enregistrement..." : "Enregistrer le profil"}
        onPress={async () => {
          const success = await saveProfile({ firstName, lastName, phone });

          if (success) {
            showToast("Profil enregistre.", "success");
          }
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600"
  }
});
