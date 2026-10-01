import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LuMail, LuCopy, LuCheck } from "react-icons/lu";
import profile from "../assets/profile.jpg";
import CommandPalette from "./CommandPalette";

const LIENS = [
  { to: "/", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const EMAIL = "lucas.autret@hotmail.com";

function MailButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (!containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Afficher mon adresse mail"
        aria-expanded={isOpen}
        className="flex items-center rounded-3xl p-2 text-muted hover:bg-surface-hover hover:text-text"
      >
        <LuMail className="size-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-2 flex items-center gap-3 rounded-xl border border-border bg-bg px-3 py-2">
          <span className="text-sm whitespace-nowrap text-text">{EMAIL}</span>
          <button
            onClick={copyEmail}
            aria-label="Copier l'adresse mail"
            className="text-muted hover:text-text"
          >
            {isCopied ? <LuCheck className="size-4" /> : <LuCopy className="size-4" />}
          </button>
        </div>
      )}
    </div>
  );
}

export default function NavBar() {
  const ouvrirPalette = useRef(null);
  const estMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);

  return (
    <header className="inset-x-0 top-0 z-50 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-bg text-text page-width px-4 pt-10 pb-6 sm:pt-20">
      <nav className="flex items-center space-x-4 text-lg font-semibold">
        <img src={profile} alt="Photo de Lucas Autret" className="h-10 w-10 shrink-0 rounded-full bg-white object-contain p-0.5" />
        <div className="flex flex-col">
          <Link to="/" className="text-card text-heading transition-colors duration-160 hover:text-heading">Lucas Autret</Link>
          <span className="text-caption font-normal text-muted">Développeur full-stack</span>
        </div>
      </nav>
      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <nav>
          <ul className="flex space-x-2 border-r border-border pr-3">
            {LIENS.map((lien) => (
              <li key={lien.to}>
                <NavLink
                  to={lien.to}
                  className={({ isActive }) =>
                    `inline-flex h-10 items-center rounded-full px-3 text-body-sm transition-colors duration-160 ease-out-quint hover:bg-surface-hover hover:text-heading motion-safe:active:scale-[0.97] ${
                      isActive ? 'bg-surface-hover text-heading' : 'text-muted'
                    }`
                  }
                >
                  {lien.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Indice de la palette de commandes, masqué sur écran tactile */}
        <button
          type="button"
          onClick={() => ouvrirPalette.current?.()}
          aria-label="Ouvrir la palette de commandes"
          className="hidden rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-muted transition-colors duration-160 hover:bg-surface-hover hover:text-heading [@media(hover:hover)]:inline-block"
        >
          {estMac ? "⌘K" : "Ctrl K"}
        </button>

        <MailButton />
        <CommandPalette ouvrirRef={ouvrirPalette} />
      </div>
    </header>
  );
}
