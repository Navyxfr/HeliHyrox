import { Tabs } from "expo-router";
import { useAuth } from "@/features/auth/AuthContext";
import { colors } from "@/theme/tokens";

export default function MemberTabsLayout() {
  const { roles } = useAuth();
  const isCoach = roles.includes("coach");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.surface
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Accueil" }} />
      <Tabs.Screen name="planning" options={{ title: "Planning" }} />
      <Tabs.Screen name="news" options={{ title: "News" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
      <Tabs.Screen
        name="coach"
        options={{
          title: "Coach",
          href: isCoach ? "/(member)/(tabs)/coach" : null
        }}
      />
    </Tabs>
  );
}
