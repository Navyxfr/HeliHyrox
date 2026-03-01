import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";

export default function ApplicationStatusScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="CANDIDATE"
        title="ApplicationStatus"
        body="Vue de synthese du dossier: progression, pieces recues, validations et eventuelles corrections demandees."
      />
    </Screen>
  );
}
