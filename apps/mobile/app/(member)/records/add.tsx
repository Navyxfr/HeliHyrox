import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useMemberData } from "@/features/member/MemberDataContext";
import { colors } from "@/theme/tokens";

export default function AddRecordScreen() {
  const router = useRouter();
  const { addRecord, error, isLoading, movements } = useMemberData();
  const [selectedMovementId, setSelectedMovementId] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [valueLabel, setValueLabel] = useState("");
  const [performedOn, setPerformedOn] = useState(new Date().toISOString().slice(0, 10));

  const selectedMovement = useMemo(
    () => movements.find((movement) => movement.id === selectedMovementId) ?? null,
    [movements, selectedMovementId]
  );

  async function handleSubmit() {
    if (!selectedMovementId || !value || !valueLabel) {
      return;
    }

    await addRecord({
      movementId: selectedMovementId,
      value: Number(value),
      valueLabel,
      performedOn
    });
    router.back();
  }

  return (
    <Screen>
      <StackHeader title="Ajouter un resultat" />
      <View style={styles.stack}>
        <Text style={styles.label}>Mouvement</Text>
        <View style={styles.choiceWrap}>
          {movements.map((movement) => (
            <Pressable
              key={movement.id}
              onPress={() => setSelectedMovementId(movement.id)}
              style={[
                styles.choice,
                selectedMovementId === movement.id ? styles.choiceActive : null
              ]}
            >
              <Text
                style={[
                  styles.choiceText,
                  selectedMovementId === movement.id ? styles.choiceTextActive : null
                ]}
              >
                {movement.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Valeur brute ({selectedMovement?.unit ?? "numeric"})</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={setValue}
          placeholder="198"
          style={styles.input}
          value={value}
        />

        <Text style={styles.label}>Libelle affiche</Text>
        <TextInput
          onChangeText={setValueLabel}
          placeholder="3:18"
          style={styles.input}
          value={valueLabel}
        />

        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <TextInput onChangeText={setPerformedOn} style={styles.input} value={performedOn} />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          disabled={isLoading || !selectedMovementId || !value || !valueLabel}
          onPress={() => void handleSubmit()}
          style={[
            styles.button,
            isLoading || !selectedMovementId || !value || !valueLabel
              ? styles.buttonDisabled
              : null
          ]}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Enregistrement..." : "Enregistrer le resultat"}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  choiceWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  choice: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  choiceActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent
  },
  choiceText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600"
  },
  choiceTextActive: {
    color: colors.primary
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600"
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  }
});
