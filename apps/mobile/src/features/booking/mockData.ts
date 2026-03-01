import type { SessionType } from "@helihyrox/shared";

export type SessionItem = {
  id: string;
  title: string;
  sessionType: SessionType;
  startsAtLabel: string;
  endsAtLabel: string;
  dateLabel: string;
  location: string;
  capacity: number;
  bookedCount: number;
  coachName: string;
  isBooked?: boolean;
};

export const mockSessions: SessionItem[] = [
  {
    id: "session-mer-1730",
    title: "Hyrox Conditioning",
    sessionType: "hyrox",
    startsAtLabel: "17:30",
    endsAtLabel: "18:30",
    dateLabel: "Mer 4 mars",
    location: "Gymnase CSE",
    capacity: 16,
    bookedCount: 13,
    coachName: "Julie M.",
    isBooked: true
  },
  {
    id: "session-jeu-1215",
    title: "Strength Circuit",
    sessionType: "strength",
    startsAtLabel: "12:15",
    endsAtLabel: "13:15",
    dateLabel: "Jeu 5 mars",
    location: "Salle cardio",
    capacity: 16,
    bookedCount: 9,
    coachName: "Marc T."
  },
  {
    id: "session-ven-0700",
    title: "Open Gym Hyrox",
    sessionType: "open_gym",
    startsAtLabel: "07:00",
    endsAtLabel: "08:00",
    dateLabel: "Ven 6 mars",
    location: "Zone fonctionnelle",
    capacity: 16,
    bookedCount: 15,
    coachName: "Sophie R.",
    isBooked: true
  }
];

export const myBookings = mockSessions.filter((session) => session.isBooked);

export function getSessionById(sessionId: string) {
  return mockSessions.find((session) => session.id === sessionId) ?? null;
}
