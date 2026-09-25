import { TiAdjustContrast } from "react-icons/ti"

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    const year = new Date().getFullYear();
  const [isLightMode, setIsLightMode] = useState(false);

  function toggleTheme() {
    document.documentElement.classList.toggle('light');
    setIsLightMode(!isLightMode);
  }

  const themeLabel = isLightMode ? "Mode clair" : "Mode sombre";

  return (
    <footer className="z-50 px-4 pt-20 pb-24 sm:pt-40 sm:pb-60 text-secondary-text page-width">
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
            <li><Link to="/" className="hover:text-primary-text">Work</Link></li>
            <li><Link to="/about" className="hover:text-primary-text">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary-text">Contact</Link></li>
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
          </ul>
        </nav>
      </div>
    </footer>
  );
}