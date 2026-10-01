import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[max(520px,calc(100svh-var(--hdr)))] items-center">
      <div
        aria-hidden
        className="gridlines site grid-site pointer-events-none absolute inset-x-0 inset-y-0 max-sm:[&>:nth-child(n+5)]:hidden sm:max-lg:[&>:nth-child(n+9)]:hidden"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            style={{ animation: `grid-draw 900ms var(--ease-out-quint) ${i * 30}ms both` }}
            className="origin-top border-x border-border"
          />
        ))}
      </div>

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
