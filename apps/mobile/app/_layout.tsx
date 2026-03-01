import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthGate, AuthProvider } from "@/features/auth/AuthContext";
import { colors } from "@/theme/tokens";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background }
          }}
        />
      </AuthGate>
    </AuthProvider>
  );
}
