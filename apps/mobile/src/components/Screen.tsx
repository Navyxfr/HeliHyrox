import { ReactNode } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { colors } from "@/theme/tokens";

type ScreenProps = {
  children: ReactNode;
};

export function Screen({ children }: ScreenProps) {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    gap: 16,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 32
  }
});

