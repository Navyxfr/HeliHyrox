export const mockApplications = [
  {
    id: "mock-app-1",
    applicantName: "Tom Martin",
    email: "tom@helihyrox.test",
    status: "pending_review",
    seasonLabel: "2025-2026",
    rulesAccepted: true,
    medicalCertificate: true,
    paymentProof: true
  },
  {
    id: "mock-app-2",
    applicantName: "Julie Robert",
    email: "julie@helihyrox.test",
    status: "changes_requested",
    seasonLabel: "2025-2026",
    rulesAccepted: true,
    medicalCertificate: false,
    paymentProof: true
  }
];

export const mockNewsPosts = [
  {
    id: "mock-news-1",
    title: "Nouveau creneau samedi",
    visibility: "members",
    publishedAt: "2026-03-01"
  }
];

export const mockSessions = [
  {
    id: "mock-session-1",
    title: "Hyrox Conditioning",
    sessionType: "hyrox",
    startsAt: "2026-03-04T17:30:00.000Z",
    location: "Gymnase CSE",
    capacity: 16
  }
];
