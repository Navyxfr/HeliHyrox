import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";

export default function ApplicationFormScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="CANDIDATE"
        title="ApplicationForm"
        body="Ecran de formulaire d'adhesion de saison. Le prochain lot branchera les sections profil, certificat, reglement et paiement."
      />
    </Screen>
  );
}

