import { useState } from "react";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useToast } from "@/components/Toast";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { Button } from "@/components/ui/Button";
import { SessionPanel } from "@/features/auth/components/SessionPanel";
import { useCandidate } from "@/features/candidate/CandidateContext";

export default function ApplicationFormScreen() {
  const { application, error, isLoading, saveProfile } = useCandidate();
  const { showToast } = useToast();
  const [firstName, setFirstName] = useState(application?.firstName ?? "");
  const [lastName, setLastName] = useState(application?.lastName ?? "");
  const [phone, setPhone] = useState(application?.phone ?? "");

  return (
    <Screen scrollable>
      <StackHeader title="Dossier adhesion" />
      <SessionPanel />
      <AppTextInput
        accessibilityLabel="Prenom"
        label="Prenom"
        onChangeText={setFirstName}
        placeholder="Prenom"
        value={firstName}
      />
      <AppTextInput
        accessibilityLabel="Nom"
        label="Nom"
        onChangeText={setLastName}
        placeholder="Nom"
        value={lastName}
      />
      <AppTextInput
        accessibilityLabel="Telephone"
        error={error}
        keyboardType="phone-pad"
        label="Telephone"
        onChangeText={setPhone}
        placeholder="Telephone"
        value={phone}
      />
      <Button
        isLoading={isLoading}
        label="Enregistrer le profil"
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
