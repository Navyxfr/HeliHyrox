import { Stack } from "expo-router";
import { BookingProvider } from "@/features/booking/BookingContext";

export default function MemberLayout() {
  return (
    <BookingProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </BookingProvider>
  );
}
