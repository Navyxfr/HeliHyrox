import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/theme/tokens";

type ButtonProps = {
  label: string;
  onPress?: () => void | Promise<void>;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export function Button({
  label,
  onPress,
  disabled = false,
  variant = "primary"
}: ButtonProps) {
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.base,
        isSecondary ? styles.secondary : styles.primary,
        disabled ? styles.disabled : null
      ]}
    >
      <Text style={isSecondary ? styles.secondaryText : styles.primaryText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  primary: {
    backgroundColor: colors.accent
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1
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
  }
});
