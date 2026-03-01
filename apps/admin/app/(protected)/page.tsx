import Link from "next/link";

const adminSections = [
  {
    href: "/applications",
    title: "Demandes d’adhésion",
    copy: "Valider, refuser ou demander une correction sur les dossiers."
  },
  {
    href: "/sessions",
    title: "Séances",
    copy: "Créer et suivre les séances de la saison active."
  },
  {
    href: "/news",
    title: "Actualités",
    copy: "Publier les actus de la section et des événements."
  }
] as const;

export default function AdminHomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">BUREAU HELIHYROX</p>
        <h1>Back-office admin</h1>
        <p className="hero-copy">
          Back-office bureau relié aux données réelles quand Supabase admin est configuré.
        </p>
      </section>

      <section className="grid">
        {adminSections.map((section) => (
          <Link className="panel panel-link" href={section.href} key={section.href}>
            <h2>{section.title}</h2>
            <p>{section.copy}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
