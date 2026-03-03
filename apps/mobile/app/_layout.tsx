import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "@/components/Toast";
import { AuthGate, AuthProvider } from "@/features/auth/AuthContext";
import { colors } from "@/theme/tokens";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AuthGate>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background }
            }}
          />
        </AuthGate>
      </ToastProvider>
    </AuthProvider>
  );
}
