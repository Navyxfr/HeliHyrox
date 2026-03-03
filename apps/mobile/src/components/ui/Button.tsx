import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/tokens";

type ButtonProps = {
  label: string;
  onPress?: () => void | Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success" | "warning";
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
  const isSuccess = variant === "success";
  const isWarning = variant === "warning";
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
            : isSuccess
              ? styles.success
              : isWarning
                ? styles.warning
            : isGhost
              ? styles.ghost
              : styles.primary,
        isDisabled ? styles.disabled : null
      ]}
    >
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator
            color={isDanger || isSuccess || isWarning ? colors.background : colors.background}
          />
        ) : null}
        <Text
          style={
            isSecondary || isGhost
              ? styles.secondaryText
              : isDanger
                ? styles.dangerText
                : isSuccess || isWarning
                  ? styles.invertedText
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
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 15
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
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderWidth: 1
  },
  danger: {
    backgroundColor: colors.dangerLight,
    borderColor: colors.danger,
    borderWidth: 1
  },
  success: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
    borderWidth: 1
  },
  warning: {
    backgroundColor: colors.warningLight,
    borderColor: colors.warning,
    borderWidth: 1
  },
  ghost: {
    backgroundColor: "transparent"
  },
  disabled: {
    opacity: 0.6
  },
  primaryText: {
    color: colors.background,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.6,
    textAlign: "center"
  },
  secondaryText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    textAlign: "center"
  },
  dangerText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.6,
    textAlign: "center"
  },
  invertedText: {
    color: colors.background,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center"
  }
});
