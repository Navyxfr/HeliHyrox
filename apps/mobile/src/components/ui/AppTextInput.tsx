import { Text, TextInput, View, StyleSheet, type TextInputProps } from "react-native";
import { colors } from "@/theme/tokens";

type AppTextInputProps = TextInputProps & {
  label?: string;
  error?: string | null;
};

export function AppTextInput({
  accessibilityLabel,
  error,
  label,
  style,
  ...props
}: AppTextInputProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        accessibilityLabel={accessibilityLabel ?? label ?? props.placeholder}
        placeholderTextColor={colors.textMuted}
        {...props}
        style={[styles.input, error ? styles.inputError : null, style]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8
  },
  label: {
    color: colors.textDim,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  input: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.text,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  inputError: {
    borderColor: colors.danger
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "600"
  }
});
