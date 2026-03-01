import { Stack } from "expo-router";
import { CandidateProvider } from "@/features/candidate/CandidateContext";

export default function CandidateLayout() {
  return (
    <CandidateProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CandidateProvider>
  );
}
