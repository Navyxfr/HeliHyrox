import { Stack } from "expo-router";
import { BookingProvider } from "@/features/booking/BookingContext";
import { MemberDataProvider } from "@/features/member/MemberDataContext";

export default function MemberLayout() {
  return (
    <MemberDataProvider>
      <BookingProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </BookingProvider>
    </MemberDataProvider>
  );
}
