import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { useMemberData } from "@/features/member/MemberDataContext";
import { colors } from "@/theme/tokens";

export default function NewsScreen() {
  const { error, isLoading, news } = useMemberData();

  return (
    <Screen>
      <Text style={styles.title}>Actualites</Text>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {isLoading ? <Text style={styles.meta}>Chargement...</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {!isLoading && news.length === 0 ? (
          <EmptyState
            eyebrow="Member"
            title="Aucune actualite"
            description="Les prochaines informations de la section apparaitront ici."
          />
        ) : null}
        {news.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
            <Text style={styles.meta}>{item.publishedAtLabel}</Text>
            <Link href={`/(member)/news/${item.id}`} asChild>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Lire l'actualite</Text>
              </Pressable>
            </Link>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "900"
  },
  content: {
    gap: 12,
    paddingBottom: 32
  },
  card: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    gap: 8,
    padding: 18
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "800"
  },
  summary: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20
  },
  meta: {
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 0.3
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "600"
  },
  button: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  buttonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center"
  }
});
