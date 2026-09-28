import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="space-y-6 py-20 text-primary-text">
      <h2 className="text-sm font-bold text-secondary-text">Erreur 404</h2>
      <h1 className="text-3xl leading-snug font-medium text-title">
        Cette page n'existe pas.
      </h1>
      <p className="text-secondary-text">
        Le lien est peut-être incorrect, ou la page a été déplacée.
      </p>
      <Link
        to="/"
        className="inline-block rounded-3xl bg-secondary-text/20 px-4 py-2 text-sm hover:text-primary-text"
      >
        Retour à l'accueil
      </Link>
    </section>
  );
}
