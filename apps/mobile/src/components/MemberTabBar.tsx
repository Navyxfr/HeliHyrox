import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/theme/tokens";

const iconByRoute: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home-outline",
  planning: "calendar-outline",
  news: "newspaper-outline",
  profile: "person-outline",
  coach: "people-outline"
};

export function MemberTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.outer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.inner}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : typeof options.title === "string"
                ? options.title
                : route.name;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              onPress={() => navigation.navigate(route.name)}
              style={styles.item}
            >
              <Ionicons
                color={isFocused ? colors.accent : colors.textDim}
                name={iconByRoute[route.name] ?? "ellipse-outline"}
                size={18}
              />
              <Text style={[styles.label, isFocused ? styles.labelActive : null]}>
                {label}
              </Text>
              <View style={[styles.dot, isFocused ? styles.dotActive : null]} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 6
  },
  inner: {
    flexDirection: "row",
    minHeight: 62
  },
  item: {
    alignItems: "center",
    flex: 1,
    gap: 4,
    justifyContent: "center"
  },
  label: {
    color: colors.textDim,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase"
  },
  labelActive: {
    color: colors.accent
  },
  dot: {
    backgroundColor: "transparent",
    borderRadius: 999,
    height: 4,
    width: 4
  },
  dotActive: {
    backgroundColor: colors.accent
  }
});
