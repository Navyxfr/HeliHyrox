export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string;
  visibility: "public" | "members";
  publishedAtLabel: string;
};

export const mockNews: NewsItem[] = [
  {
    id: "news-marseille",
    title: "HeliHyrox sera au HYROX Marseille",
    summary: "8 athlètes de la section engagés sur l’événement du 15 mars.",
    content:
      "La section HeliHyrox sera représentée par 8 athlètes lors du HYROX Marseille. Covoiturage prévu depuis Airbus Helicopters à 7h30. Venez soutenir la section.",
    visibility: "members",
    publishedAtLabel: "22 fév. 2026"
  },
  {
    id: "news-samedi",
    title: "Nouveau créneau le samedi matin",
    summary: "Ouverture d’une séance de 09:00 à 10:00 à partir du 8 mars.",
    content:
      "Un créneau supplémentaire le samedi matin est ouvert afin de fluidifier les demandes de réservation. Capacité identique aux autres séances.",
    visibility: "members",
    publishedAtLabel: "20 fév. 2026"
  }
];

export function getNewsById(newsId: string) {
  return mockNews.find((item) => item.id === newsId) ?? null;
}
