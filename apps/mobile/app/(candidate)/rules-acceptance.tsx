import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";

export default function RulesAcceptanceScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="CANDIDATE"
        title="RulesAcceptance"
        body="Acceptation horodatee du reglement interieur. Une signature simple suffit pour le MVP."
      />
    </Screen>
  );
}
