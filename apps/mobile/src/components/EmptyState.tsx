import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/tokens";

type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <View style={styles.card}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    gap: 8,
    padding: 20
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800"
  },
  description: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  buttonText: {
    color: colors.background,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.5
  }
});
