import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";

export default function NewsScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="MEMBER"
        title="News"
        body="Flux d'actualites public et membre selon visibilite."
      />
    </Screen>
  );
}

