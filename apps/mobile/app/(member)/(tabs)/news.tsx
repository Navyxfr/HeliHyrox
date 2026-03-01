import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { mockNews } from "@/features/news/mockData";
import { colors } from "@/theme/tokens";

export default function NewsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Actualites</Text>
      <ScrollView contentContainerStyle={styles.content}>
        {mockNews.map((item) => (
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
    color: colors.primary,
    fontSize: 28,
    fontWeight: "800"
  },
  content: {
    gap: 12,
    paddingBottom: 32
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
    padding: 18
  },
  cardTitle: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "700"
  },
  summary: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12
  },
  button: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  buttonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center"
  }
});
