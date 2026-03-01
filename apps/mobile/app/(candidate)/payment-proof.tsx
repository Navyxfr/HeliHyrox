import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";

export default function PaymentProofScreen() {
  return (
    <Screen>
      <PlaceholderPanel
        eyebrow="CANDIDATE"
        title="PaymentProofUpload"
        body="Depot du justificatif de paiement. Le bureau le validera manuellement avant activation du compte membre."
      />
    </Screen>
  );
}
