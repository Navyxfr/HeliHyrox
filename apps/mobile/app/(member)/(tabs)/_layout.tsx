import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { MemberTabBar } from "@/components/MemberTabBar";
import { useAuth } from "@/features/auth/AuthContext";

export default function MemberTabsLayout() {
  const { roles } = useAuth();
  const isCoach = roles.includes("coach");

  return (
    <Tabs
      tabBar={(props) => <MemberTabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: "Planning",
          tabBarLabel: "Planning",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "Actus",
          tabBarLabel: "Actus",
          tabBarIcon: ({ color, size }) => <Ionicons name="newspaper-outline" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: "Coach",
          tabBarLabel: "Coach",
          href: isCoach ? "/(member)/(tabs)/coach" : null,
          tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
