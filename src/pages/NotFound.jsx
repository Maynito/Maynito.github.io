import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="space-y-6 py-20 text-text">
      <p className="text-label text-muted uppercase">Erreur 404</p>
      <h1 className="text-page-sm sm:text-page text-heading">
        Cette page n'existe pas.
      </h1>
      <p className="text-muted">
        Le lien est peut-être incorrect, ou la page a été déplacée.
      </p>
      <Link
        to="/"
        className="inline-block rounded-3xl bg-surface-hover px-4 py-2 text-sm hover:text-text"
      >
        Retour à l'accueil
      </Link>
    </section>
  );
}
