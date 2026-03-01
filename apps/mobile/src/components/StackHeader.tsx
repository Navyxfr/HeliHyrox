import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/tokens";

type StackHeaderProps = {
  title: string;
};

export function StackHeader({ title }: StackHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Retour</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600"
  },
  title: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "800"
  }
});
