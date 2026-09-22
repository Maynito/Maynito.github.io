import { TiAdjustContrast } from "react-icons/ti"
import { FR, GB } from 'country-flag-icons/react/3x2'

import { useState } from "react";

const DRAPEAUX = { fr: FR, gb: GB };

function LangueSwitcher() {
  const [selectedLang, setSelectedLang] = useState('fr');
  const [isOpen, setIsOpen] = useState(false);

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
  };

  const SelectedFlag = DRAPEAUX[selectedLang];
  const otherLangs = Object.keys(DRAPEAUX).filter((lang) => lang !== selectedLang);

  return (
    <div className="relative flex items-center">
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Changer la langue" aria-expanded={isOpen} className="group relative p-2">
        <SelectedFlag className="w-5 rounded-sm" />
        {!isOpen && (
          <span className="pointer-events-none absolute top-full right-0 z-10 mt-2 whitespace-nowrap rounded-md bg-secondary-text/20 px-2 py-1 text-xs text-primary-text opacity-0 group-hover:opacity-100">
            Changer la langue
          </span>
        )}
      </button>

      {isOpen && (
        <ul className="absolute top-full left-2 mt-2 flex flex-col gap-2">
          {otherLangs.map((lang) => {
            const Flag = DRAPEAUX[lang];
            return (
              <li key={lang}>
                <button onClick={() => handleLangChange(lang)} aria-label={lang}>
                  <Flag className="w-5 rounded-sm" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Footer() {
    const year = new Date().getFullYear();
  const [isLightMode, setIsLightMode] = useState(false);

  function toggleTheme() {
    document.documentElement.classList.toggle('light');
    setIsLightMode(!isLightMode);
  }

  const themeLabel = isLightMode ? "Mode clair" : "Mode sombre";

  return (
    <footer className="z-50 px-4 pt-40 pb-60 text-secondary-text page-width">
      <hr className="mb-4 border-t border-secondary-text" />
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start text-secondary-text text-sm">
        <div className="flex flex-col gap-2 py-4 self-start">
          <p>&copy; {year} Lucas Autret</p>
        </div>

        <nav className="py-4 self-start">
          <ul className="flex flex-col space-y-2 underline underline-offset-4">
            <li><a href="mailto:lucas.autret@hotmail.com" className="hover:text-primary-text">Mail</a></li>
            <li><a href="https://www.linkedin.com/in/lucas-autret-4814b6387/" className="hover:text-primary-text">LinkedIn</a></li>
            <li><a href="https://github.com/Maynito" className="hover:text-primary-text">Github</a></li>
          </ul>
        </nav>
        <nav className="py-4 self-start">
          <ul className="flex flex-col space-y-2 underline underline-offset-4">
            <li><a href="#work" className="hover:text-primary-text">Work</a></li>
            <li><a href="#about" className="hover:text-primary-text">About</a></li>
            <li><a href="#contact" className="hover:text-primary-text">Contact</a></li>
          </ul>
        </nav>
        <nav className="py-4 self-start ">
          <ul className="flex items-center space-x-4">
            <li><button aria-label={themeLabel} className="group relative flex items-center gap-2 rounded-lg bg-secondary-text p-2 text-background hover:bg-primary-text"
            onClick={toggleTheme}>
              <TiAdjustContrast className="w-5 h-5" />
              <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-secondary-text/20 px-2 py-1 text-xs text-primary-text opacity-0 group-hover:opacity-100">
                {themeLabel}
              </span>
            </button></li>
            <li><LangueSwitcher /></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}