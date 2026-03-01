const adminSections = [
  "Demandes d'adhesion",
  "Membres",
  "Seances",
  "Coachs",
  "Actualites",
  "Saisons"
];

export default function AdminHomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">BUREAU HELIHYROX</p>
        <h1>Back-office admin</h1>
        <p className="hero-copy">
          Base de travail pour la validation des adhesions, la gestion des seances
          et le pilotage de la saison.
        </p>
      </section>

      <section className="grid">
        {adminSections.map((section) => (
          <article className="panel" key={section}>
            <h2>{section}</h2>
            <p>Module a implementer dans les prochains lots.</p>
          </article>
        ))}
      </section>
    </main>
  );
}

