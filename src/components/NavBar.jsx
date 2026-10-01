import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import CommandPalette from "./CommandPalette";

const LIENS = [
  { to: "/", label: "Projets" },
  { to: "/about", label: "Parcours" },
  { to: "/contact", label: "Contact" },
];

export function Dot() {
  return (
    <span className="relative flex size-2" aria-hidden="true">
      <span className="absolute inset-0 rounded-full bg-success opacity-40" />
      <span className="relative size-2 rounded-full bg-success" />
    </span>
  );
}

export default function NavBar() {
  const ouvrirPalette = useRef(null);
  const estMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);

  return (
    <header className="sticky top-0 z-20 h-14 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="site flex h-full items-center gap-6">
        <Link to="/" className="mr-auto text-[15px] font-semibold tracking-[-0.01em] text-heading">
          Lucas Autret
        </Link>

        <nav aria-label="Principale" className="flex gap-5 text-sm text-muted">
          {LIENS.map((lien) => (
            <NavLink
              key={lien.to}
              to={lien.to}
              end={lien.to === "/"}
              className={({ isActive }) =>
                `transition-colors duration-160 hover:text-heading ${
                  isActive ? "text-heading underline decoration-1 underline-offset-[6px]" : ""
                }`
              }
            >
              {lien.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 font-mono text-xs text-muted lg:flex">
          <span className="flex items-center gap-2">
            <Dot /> Dispo. oct. 2026
          </span>
          <button
            type="button"
            onClick={() => ouvrirPalette.current?.()}
            aria-label="Ouvrir la palette de commandes"
            className="rounded-md border border-border bg-surface px-1.5 py-1 transition-colors duration-160 hover:text-heading"
          >
            {estMac ? "⌘K" : "Ctrl K"}
          </button>
        </div>
      </div>

      <CommandPalette ouvrirRef={ouvrirPalette} />
    </header>
  );
}
