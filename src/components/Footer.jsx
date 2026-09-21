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
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Choisir la langue" aria-expanded={isOpen}>
        <SelectedFlag className="w-5 rounded-sm" />
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 mt-2 flex flex-col gap-2">
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <footer className="z-50 px-4 pt-4 pb-16 text-slate-100 page-width">
      <hr className="mb-4 border-t border-secondary-text" />
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start text-secondary-text">
        <div className="flex flex-col gap-2 py-4 self-start">
          <p>&copy; {year} Lucas Autret</p>
        </div>

        <nav className="py-4 self-start">
          <ul className="flex flex-col space-y-2 underline underline-offset-4">
            <li><a href="#mail" className="hover:text-primary-text">Mail</a></li>
            <li><a href="#about" className="hover:text-primary-text">LinkedIn</a></li>
            <li><a href="#contact" className="hover:text-primary-text">Github</a></li>
          </ul>
        </nav>
        <nav className="py-4 self-start">
          <ul className="flex flex-col space-y-2 underline underline-offset-4">
            <li><a href="#home" className="hover:text-primary-text">Home</a></li>
            <li><a href="#about" className="hover:text-primary-text">About</a></li>
            <li><a href="#contact" className="hover:text-primary-text">Contact</a></li>
          </ul>
        </nav>
        <nav className="py-4 self-start ">
          <ul className="flex items-center space-x-4">
            <li><button className="flex items-center gap-2" onClick={toggleDarkMode}>
              <TiAdjustContrast className="w-5 h-5" />
            </button></li>
            <li><LangueSwitcher /></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}