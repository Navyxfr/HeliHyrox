import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useMemberData } from "@/features/member/MemberDataContext";
import { colors } from "@/theme/tokens";

export default function RecordsScreen() {
  const { error, isLoading, records } = useMemberData();

  return (
    <Screen>
      <StackHeader title="Mes records" />
      <ScrollView contentContainerStyle={styles.content}>
        {isLoading ? <Text style={styles.date}>Chargement...</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {!isLoading && records.length === 0 ? (
          <PlaceholderPanel
            eyebrow="MEMBER"
            title="Aucun record"
            body="Ajoute ton premier resultat pour commencer ton historique personnel."
          />
        ) : null}
        {records.map((record) => (
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
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  }
});
