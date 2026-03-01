import Link from "next/link";

const adminSections = [
  {
    href: "/applications",
    title: "Demandes d'adhesion",
    copy: "Valider, refuser ou demander une correction sur les dossiers."
  },
  {
    href: "/sessions",
    title: "Seances",
    copy: "Creer et suivre les seances de la saison active."
  },
  {
    href: "/news",
    title: "Actualites",
    copy: "Publier les actus de la section et des evenements."
  }
] as const;

export default function AdminHomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">BUREAU HELIHYROX</p>
        <h1>Back-office admin</h1>
        <p className="hero-copy">
          Back-office bureau relie aux donnees reelles quand Supabase admin est configure.
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
