import { createSession } from "@/lib/actions";
import { getSessions } from "@/lib/adminData";

export default async function SessionsPage() {
  const sessions = await getSessions();

  return (
    <main className="page-shell">
      <h1 className="page-title">Seances</h1>
      <section className="panel">
        <h2>Nouvelle seance</h2>
        <form action={createSession} className="admin-form">
          <input name="title" placeholder="Titre" required />
          <select defaultValue="hyrox" name="sessionType">
            <option value="hyrox">hyrox</option>
            <option value="strength">strength</option>
            <option value="conditioning">conditioning</option>
            <option value="mobility">mobility</option>
            <option value="open_gym">open_gym</option>
            <option value="other">other</option>
          </select>
          <input name="startsAt" required type="datetime-local" />
          <input name="endsAt" required type="datetime-local" />
          <input min="1" name="capacity" placeholder="Capacite" required type="number" />
          <input name="location" placeholder="Lieu" required />
          <button className="primary-action" type="submit">
            Creer la seance
          </button>
        </form>
      </section>
      <div className="stack">
        {sessions.map((session: Awaited<ReturnType<typeof getSessions>>[number]) => (
          <section className="panel" key={session.id}>
            <h2>{session.title}</h2>
            <p className="muted">Type: {session.sessionType}</p>
            <p className="muted">Debut: {session.startsAt}</p>
            <p className="muted">Lieu: {session.location}</p>
            <p className="muted">Capacite: {session.capacity}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
