import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";

export default function MemberHomeScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="MEMBER"
        title="MemberHome"
        body="Accueil membre avec prochaine seance, statut administratif et actualites prioritaires."
      />
    </Screen>
  );
}

