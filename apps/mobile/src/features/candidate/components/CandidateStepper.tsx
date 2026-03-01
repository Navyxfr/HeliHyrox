import { type Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CandidateApplicationState } from "@/features/candidate/mockData";
import { colors } from "@/theme/tokens";

type StepItem = {
  id: string;
  title: string;
  description: string;
  href: Href;
  completed: boolean;
  active: boolean;
};

type CandidateStepperProps = {
  application: CandidateApplicationState;
};

function buildSteps(application: CandidateApplicationState): StepItem[] {
  const hasProfile = Boolean(application.firstName && application.lastName && application.phone);
  const hasMedicalCertificate = application.documents.medicalCertificateUploaded;
  const hasRulesAccepted = application.documents.rulesAccepted;
  const hasPaymentProof = application.documents.paymentProofUploaded;

  return [
    {
      id: "profile",
      title: "Profil",
      description: hasProfile ? "Profil administratif complete." : "Renseignez prenom, nom et telephone.",
      href: "/(candidate)/application-form",
      completed: hasProfile,
      active: true
    },
    {
      id: "medical",
      title: "Certificat medical",
      description: hasMedicalCertificate ? "Document depose pour la saison active." : "Deposez votre certificat medical annuel.",
      href: "/(candidate)/medical-certificate",
      completed: hasMedicalCertificate,
      active: hasProfile
    },
    {
      id: "rules",
      title: "Reglement interieur",
      description: hasRulesAccepted ? "Le reglement a ete accepte." : "Lisez puis acceptez le reglement de la section.",
      href: "/(candidate)/rules",
      completed: hasRulesAccepted,
      active: hasProfile && hasMedicalCertificate
    },
    {
      id: "payment",
      title: "Paiement",
      description: hasPaymentProof
        ? "La preuve de paiement est deposee."
        : `Montant attendu : ${application.membershipFeeLabel}.`,
      href: "/(candidate)/payment-info",
      completed: hasPaymentProof,
      active: hasProfile && hasMedicalCertificate && hasRulesAccepted
    }
  ];
}

function getStepVisual(step: StepItem) {
  if (step.completed) {
    return {
      badge: styles.badgeSuccess,
      badgeText: styles.badgeSuccessText,
      symbol: "OK"
    };
  }

  if (step.active) {
    return {
      badge: styles.badgeWarning,
      badgeText: styles.badgeWarningText,
      symbol: "!"
    };
  }

  return {
    badge: styles.badgeNeutral,
    badgeText: styles.badgeNeutralText,
    symbol: "o"
  };
}

export function CandidateStepper({ application }: CandidateStepperProps) {
  const router = useRouter();
  const steps = buildSteps(application);
  const completedCount = steps.filter((step) => step.completed).length;
  const isReadyToSubmit = steps.every((step) => step.completed);

  return (
    <View style={styles.panel}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Parcours d'adhesion</Text>
        <Text style={styles.title}>Saison {application.seasonLabel}</Text>
        <Text style={styles.subtitle}>
          {completedCount}/4 etapes completees avant soumission au bureau.
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressBar,
            { width: `${(completedCount / steps.length) * 100}%` }
          ]}
        />
      </View>

      <View style={styles.steps}>
        {steps.map((step, index) => {
          const visual = getStepVisual(step);

          return (
            <Pressable
              accessibilityRole="button"
              disabled={!step.active}
              key={step.id}
              onPress={() => {
                if (step.active) {
                  router.push(step.href);
                }
              }}
              style={[
                styles.stepCard,
                step.active ? null : styles.stepCardDisabled
              ]}
            >
              <View style={styles.stepHeader}>
                <View style={[styles.badge, visual.badge]}>
                  <Text style={[styles.badgeText, visual.badgeText]}>{visual.symbol}</Text>
                </View>
                <View style={styles.stepCopy}>
                  <Text style={styles.stepTitle}>
                    {index + 1}. {step.title}
                  </Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.submitPanel}>
        <Text style={styles.submitTitle}>Soumission</Text>
        <Text style={styles.submitText}>
          {isReadyToSubmit
            ? "Votre dossier est complet. Vous pouvez maintenant le soumettre au bureau."
            : "Terminez toutes les etapes avant d'ouvrir la soumission finale."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    gap: 16,
    padding: 20
  },
  hero: {
    gap: 6
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  title: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  progressTrack: {
    backgroundColor: colors.border,
    borderRadius: 999,
    height: 8,
    overflow: "hidden"
  },
  progressBar: {
    backgroundColor: colors.secondary,
    borderRadius: 999,
    height: "100%"
  },
  steps: {
    gap: 10
  },
  stepCard: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16
  },
  stepCardDisabled: {
    opacity: 0.5
  },
  stepHeader: {
    flexDirection: "row",
    gap: 12
  },
  badge: {
    alignItems: "center",
    borderRadius: 999,
    height: 30,
    justifyContent: "center",
    width: 30
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "800"
  },
  badgeSuccess: {
    backgroundColor: colors.successLight
  },
  badgeSuccessText: {
    color: colors.success
  },
  badgeWarning: {
    backgroundColor: colors.warningLight
  },
  badgeWarningText: {
    color: colors.warning
  },
  badgeNeutral: {
    backgroundColor: colors.surface
  },
  badgeNeutralText: {
    color: colors.textMuted
  },
  stepCopy: {
    flex: 1,
    gap: 4
  },
  stepTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700"
  },
  stepDescription: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  submitPanel: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    gap: 6,
    padding: 16
  },
  submitTitle: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: "700"
  },
  submitText: {
    color: colors.surface,
    fontSize: 14,
    lineHeight: 20
  }
});
