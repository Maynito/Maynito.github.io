import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[max(520px,calc(100svh-var(--hdr)))] items-center">
      <div className="site relative">
        <p className="label">Erreur 404</p>
        <p className="mt-4 text-name text-heading">404</p>
        <p className="mt-6 text-lede text-text">Cette page n&apos;existe pas.</p>
        <Link to="/" className="btn mt-8">
          Retour aux projets
        </Link>
      </div>
    </div>
  );
}
