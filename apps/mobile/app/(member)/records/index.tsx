import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { mockRecords } from "@/features/records/mockData";
import { colors } from "@/theme/tokens";

export default function RecordsScreen() {
  return (
    <Screen>
      <StackHeader title="Mes records" />
      <ScrollView contentContainerStyle={styles.content}>
        {mockRecords.map((record) => (
          <View key={record.id} style={styles.card}>
            <Text style={styles.title}>{record.movement}</Text>
            <Text style={styles.value}>{record.valueLabel}</Text>
            <Text style={styles.date}>{record.performedOnLabel}</Text>
          </View>
        ))}
      </ScrollView>
      <Link href="/(member)/records/add" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Ajouter un resultat</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 24
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
    padding: 18
  },
  title: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700"
  },
  value: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800"
  },
  date: {
    color: colors.textMuted,
    fontSize: 12
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  }
});
