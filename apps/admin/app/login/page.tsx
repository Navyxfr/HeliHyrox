import { signInAdmin } from "@/lib/authActions";

export default function LoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const errorMessage = searchParams?.error ?? null;

  return (
    <main className="page-shell auth-shell">
      <section className="hero-card">
        <p className="eyebrow">BUREAU HELIHYROX</p>
        <h1>Connexion admin</h1>
        <p className="hero-copy">
          Authentification requise pour acceder aux outils bureau.
        </p>
      </section>

      <section className="panel auth-panel">
        <form action={signInAdmin} className="admin-form">
          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
          <input name="email" placeholder="Email" required type="email" />
          <input name="password" placeholder="Mot de passe" required type="password" />
          <button className="primary-action" type="submit">
            Se connecter
          </button>
        </form>
      </section>
    </main>
  );
}
