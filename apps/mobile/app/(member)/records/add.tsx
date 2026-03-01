import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";

export default function AddRecordScreen() {
  return (
    <Screen>
      <StackHeader title="Ajouter un resultat" />
      <PlaceholderPanel
        eyebrow="MEMBER"
        title="AddRecord"
        body="Formulaire d'ajout de record a brancher sur les mouvements et l'historique personnel."
      />
    </Screen>
  );
}
