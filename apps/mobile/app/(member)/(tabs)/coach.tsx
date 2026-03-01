import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";

export default function CoachSessionsScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="COACH"
        title="CoachSessions"
        body="Onglet conditionnel reserve aux comptes avec le role coach."
      />
    </Screen>
  );
}
