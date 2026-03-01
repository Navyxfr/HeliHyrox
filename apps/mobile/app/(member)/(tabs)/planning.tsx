import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";

export default function PlanningScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="MEMBER"
        title="Planning"
        body="Planning de reservation MVP. Le prochain lot branchera les seances, les reservations et les contraintes de quota/annulation."
      />
    </Screen>
  );
}

