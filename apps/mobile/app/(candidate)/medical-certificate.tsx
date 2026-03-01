import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";

export default function MedicalCertificateScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="CANDIDATE"
        title="MedicalCertificateUpload"
        body="Depot du certificat medical de la saison en cours. Ce document conditionne la validation de l'adhesion."
      />
    </Screen>
  );
}
