import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/tokens";

type ButtonProps = {
  label: string;
  onPress?: () => void | Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

export function Button({
  label,
  onPress,
  disabled = false,
  isLoading = false,
  variant = "primary"
}: ButtonProps) {
  const isSecondary = variant === "secondary";
  const isDanger = variant === "danger";
  const isGhost = variant === "ghost";
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.base,
        isSecondary
          ? styles.secondary
          : isDanger
            ? styles.danger
            : isGhost
              ? styles.ghost
              : styles.primary,
        isDisabled ? styles.disabled : null
      ]}
    >
      <View style={styles.content}>
        {isLoading ? <ActivityIndicator color={isDanger ? colors.surface : colors.primary} /> : null}
        <Text
          style={
            isSecondary || isGhost
              ? styles.secondaryText
              : isDanger
                ? styles.dangerText
                : styles.primaryText
          }
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center"
  },
  primary: {
    backgroundColor: colors.accent
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1
  },
  danger: {
    backgroundColor: colors.danger
  },
  ghost: {
    backgroundColor: "transparent"
  },
  disabled: {
    opacity: 0.6
  },
  primaryText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  secondaryText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center"
  },
  dangerText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  }
});
