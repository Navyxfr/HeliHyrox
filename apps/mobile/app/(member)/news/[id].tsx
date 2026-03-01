import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { PlaceholderPanel } from "@/components/PlaceholderPanel";
import { Screen } from "@/components/Screen";
import { StackHeader } from "@/components/StackHeader";
import { useMemberData } from "@/features/member/MemberDataContext";
import { colors } from "@/theme/tokens";

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { news: items } = useMemberData();
  const news = items.find((item) => item.id === id) ?? null;

  if (!news) {
    return (
      <Screen>
        <StackHeader title="Actualite" />
        <PlaceholderPanel
          eyebrow="MEMBER"
          title="NewsDetail"
          body="Actualite introuvable dans les donnees mockees."
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <StackHeader title="Actualite" />
      <PlaceholderPanel
        eyebrow="MEMBER"
        title={news.title}
        body={news.summary}
      />
      <View style={styles.card}>
        <Text style={styles.label}>{news.publishedAtLabel}</Text>
        <Text style={styles.body}>{news.content}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 10,
    padding: 18
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  body: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  }
});
