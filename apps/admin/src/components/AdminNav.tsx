import Link from "next/link";
import { signOutAdmin } from "@/lib/authActions";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/applications", label: "Adhesions" },
  { href: "/news", label: "Actualites" },
  { href: "/sessions", label: "Seances" }
] as const;

export function AdminNav() {
  return (
    <nav className="admin-nav">
      {links.map((link) => (
        <Link className="nav-link" href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
      <form action={signOutAdmin}>
        <button className="nav-link nav-button" type="submit">
          Deconnexion
        </button>
      </form>
    </nav>
  );
}
