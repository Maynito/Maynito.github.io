import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LuMail, LuCopy, LuCheck } from "react-icons/lu";
import profile from "../assets/profile.jpg";

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
        className="flex items-center rounded-3xl p-2 text-secondary-text hover:bg-secondary-text/20 hover:text-primary-text"
      >
        <LuMail className="size-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-2 flex items-center gap-3 rounded-xl border border-secondary-text/20 bg-background px-3 py-2">
          <span className="text-sm whitespace-nowrap text-primary-text">{EMAIL}</span>
          <button
            onClick={copyEmail}
            aria-label="Copier l'adresse mail"
            className="text-secondary-text hover:text-primary-text"
          >
            {isCopied ? <LuCheck className="size-4" /> : <LuCopy className="size-4" />}
          </button>
        </div>
      )}
    </div>
  );
}

export default function NavBar() {

  return (
    <header className="inset-x-0 top-0 z-50 flex items-center justify-between bg-background text-primary-text page-width px-4 pt-20 pb-6">
      <nav className="flex items-center space-x-4 text-lg font-semibold">
        <img src={profile} alt="Logo" className="h-10 w-10 shrink-0 rounded-full bg-white object-contain p-0.5" />
        <ul className="flex-col items-center space-x-2">
          <li>
            <Link to="/" className="text-lg font-semibold hover:text-primary-text">Lucas Autret</Link>
          </li>
          <li className="text-sm font-normal text-secondary-text">
            <a className="hover:text-primary-text">Software Engineer</a>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-3">
        <nav>
          <ul className="flex space-x-2 border-r border-secondary-text/20 pr-3">
            {LIENS.map((lien) => (
              <li key={lien.to}>
                <NavLink
                  to={lien.to}
                  className={({ isActive }) =>
                    `rounded-3xl px-3 py-2 hover:text-primary-text ${isActive ? 'bg-secondary-text/20 text-primary-text' : ''}`
                  }
                >
                  {lien.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <MailButton />
      </div>
    </header>
  );
}
