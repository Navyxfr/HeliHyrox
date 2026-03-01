import { useState } from "react";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useToast } from "@/components/Toast";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { Button } from "@/components/ui/Button";
import { useCandidate } from "@/features/candidate/CandidateContext";

export default function ApplicationFormScreen() {
  const { application, error, isLoading, saveProfile } = useCandidate();
  const { showToast } = useToast();
  const [firstName, setFirstName] = useState(application?.firstName ?? "");
  const [lastName, setLastName] = useState(application?.lastName ?? "");
  const [phone, setPhone] = useState(application?.phone ?? "");

  return (
    <Screen scrollable>
      <StackHeader title="Dossier adhésion" />
      <AppTextInput
        accessibilityLabel="Prénom"
        error={null}
        label="Prénom"
        onChangeText={setFirstName}
        placeholder="Prénom"
        value={firstName}
      />
      <AppTextInput
        accessibilityLabel="Nom"
        error={null}
        label="Nom"
        onChangeText={setLastName}
        placeholder="Nom"
        value={lastName}
      />
      <AppTextInput
        accessibilityLabel="Téléphone"
        error={error}
        keyboardType="phone-pad"
        label="Téléphone"
        onChangeText={setPhone}
        placeholder="Téléphone"
        value={phone}
      />
      <Button
        isLoading={isLoading}
        label="Enregistrer le profil"
        onPress={async () => {
          const success = await saveProfile({ firstName, lastName, phone });

          if (success) {
            showToast("Profil enregistré.", "success");
          }
        }}
      />
    </Screen>
  );
}
