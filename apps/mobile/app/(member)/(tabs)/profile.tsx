import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";

export default function ProfileScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="MEMBER"
        title="Profile"
        body="Profil, statut administratif de saison, records et renouvellement."
      />
    </Screen>
  );
}

