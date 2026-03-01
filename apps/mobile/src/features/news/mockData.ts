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
    summary: "8 athletes de la section engages sur l'evenement du 15 mars.",
    content:
      "La section HeliHyrox sera representee par 8 athletes lors du HYROX Marseille. Covoiturage prevu depuis Airbus Helicopters a 7h30. Venez soutenir la section.",
    visibility: "members",
    publishedAtLabel: "22 fev 2026"
  },
  {
    id: "news-samedi",
    title: "Nouveau creneau le samedi matin",
    summary: "Ouverture d'une seance de 09:00 a 10:00 a partir du 8 mars.",
    content:
      "Un creneau supplementaire le samedi matin est ouvert afin de fluidifier les demandes de reservation. Capacite identique aux autres seances.",
    visibility: "members",
    publishedAtLabel: "20 fev 2026"
  }
];

export function getNewsById(newsId: string) {
  return mockNews.find((item) => item.id === newsId) ?? null;
}
