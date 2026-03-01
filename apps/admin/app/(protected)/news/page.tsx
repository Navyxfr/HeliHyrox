import { createNewsPost } from "@/lib/actions";
import { getNewsPosts } from "@/lib/adminData";

export default async function NewsPage() {
  const { items: posts, error } = await getNewsPosts();

  return (
    <main className="page-shell">
      <h1 className="page-title">Actualites</h1>
      {error ? <p className="form-error">{error}</p> : null}
      <section className="panel">
        <h2>Nouvelle actualite</h2>
        <form action={createNewsPost} className="admin-form">
          <input name="title" placeholder="Titre" required />
          <input name="summary" placeholder="Resume" required />
          <textarea name="content" placeholder="Contenu" required rows={5} />
          <select defaultValue="members" name="visibility">
            <option value="public">public</option>
            <option value="members">members</option>
          </select>
          <button className="primary-action" type="submit">
            Publier
          </button>
        </form>
      </section>
      <div className="stack">
        {posts.map((post) => (
          <section className="panel" key={post.id}>
            <h2>{post.title}</h2>
            <p className="muted">Visibilite: {post.visibility}</p>
            <p className="muted">Publication: {post.publishedAt}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
