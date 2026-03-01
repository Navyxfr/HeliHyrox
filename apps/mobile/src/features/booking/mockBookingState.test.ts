import { describe, expect, it } from "vitest";
import { applyMockCancellation, applyMockReservation } from "./mockBookingState";
import type { SessionItem } from "./mockData";

const baseSessions: SessionItem[] = [
  {
    id: "session-1",
    title: "Hyrox Conditioning",
    sessionType: "hyrox",
    startsAtLabel: "17:30",
    endsAtLabel: "18:30",
    dateLabel: "Mer 4 mars",
    location: "Gymnase CSE",
    capacity: 16,
    bookedCount: 15,
    coachName: "Julie M.",
    isBooked: false
  },
  {
    id: "session-2",
    title: "Strength Circuit",
    sessionType: "strength",
    startsAtLabel: "12:15",
    endsAtLabel: "13:15",
    dateLabel: "Jeu 5 mars",
    location: "Salle cardio",
    capacity: 16,
    bookedCount: 1,
    coachName: "Marc T.",
    isBooked: true
  }
];

describe("mock booking state", () => {
  it("reserve une seance et borne la capacite au maximum", () => {
    const result = applyMockReservation(baseSessions, "session-1");
    expect(result[0].isBooked).toBe(true);
    expect(result[0].bookedCount).toBe(16);

    const fullAgain = applyMockReservation(result, "session-1");
    expect(fullAgain[0].bookedCount).toBe(16);
  });

  it("annule une reservation sans descendre sous zero", () => {
    const result = applyMockCancellation(baseSessions, "session-2");
    expect(result[1].isBooked).toBe(false);
    expect(result[1].bookedCount).toBe(0);

    const zeroAgain = applyMockCancellation(result, "session-2");
    expect(zeroAgain[1].bookedCount).toBe(0);
  });
});
