import { useState } from "react";
import { flushSync } from "react-dom";
import { LuMoon, LuSun } from "react-icons/lu";

// Synchronise la barre d'adresse des navigateurs mobiles avec le thème courant.
function majThemeColor() {
  const couleurFond = getComputedStyle(document.documentElement)
    .getPropertyValue("--bg")
    .trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", couleurFond);
}

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  function toggleTheme() {
    const appliquer = () =>
      flushSync(() => {
        document.documentElement.classList.toggle("light");
        setIsLight((valeur) => !valeur);
        majThemeColor();
      });

    const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || mouvementReduit) return appliquer();
    document.startViewTransition(appliquer);
  }

  const label = isLight ? "Passer en mode sombre" : "Passer en mode clair";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="relative grid size-9 place-items-center rounded-full border border-border text-muted transition-colors duration-160 ease-out-quint hover:bg-surface-hover hover:text-heading"
    >
      <LuMoon
        className={`absolute size-4 transition duration-320 ease-out-quint ${
          isLight ? "opacity-0 motion-safe:-rotate-90 motion-safe:scale-50" : ""
        }`}
      />
      <LuSun
        className={`absolute size-4 transition duration-320 ease-out-quint ${
          isLight ? "" : "opacity-0 motion-safe:rotate-90 motion-safe:scale-50"
        }`}
      />
    </button>
  );
}
