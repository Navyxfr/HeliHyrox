import type { ReactNode } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
  type RefreshControlProps
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/tokens";

type ScreenProps = {
  children: ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  refreshControlProps?: RefreshControlProps;
};

export function Screen({
  children,
  scrollable = false,
  contentContainerStyle,
  refreshControlProps
}: ScreenProps) {
  return (
    <SafeAreaView style={styles.screen}>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          refreshControl={
            refreshControlProps ? <RefreshControl {...refreshControlProps} /> : undefined
          }
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    backgroundColor: colors.background,
    gap: 16,
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 32
  },
  scrollContent: {
    flexGrow: 1,
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 32
  }
});
