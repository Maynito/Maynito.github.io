import { Link } from "react-router-dom";

import BuildStamp from "./BuildStamp";
import ThemeToggle from "./ThemeToggle";

const GITHUB = "https://github.com/Maynito";
const SOURCE = "https://github.com/Maynito/Maynito.github.io";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pt-[clamp(2.5rem,5vw,4rem)] pb-[clamp(2.5rem,5vw,4rem)]">
      <div className="site grid-site gap-y-10">
        <div className="col-span-full flex flex-col gap-2 lg:col-span-4">
          <p className="text-caption text-muted">&copy; {year} Lucas Autret</p>
          <BuildStamp />
        </div>

        <nav aria-label="Réseaux" className="col-span-2 lg:col-start-5 lg:col-end-7">
          <p className="label mb-3">Réseaux</p>
          <ul className="flex flex-col gap-2 text-caption text-muted">
            <li>
              <a href="mailto:lucas.autret@hotmail.com" className="link-underline hover:text-heading">Mail</a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lucas-autret-4814b6387/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-heading"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-heading">
                GitHub ↗
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Pages" className="col-span-2 lg:col-start-7 lg:col-end-9">
          <p className="label mb-3">Pages</p>
          <ul className="flex flex-col gap-2 text-caption text-muted">
            <li><Link to="/" className="link-underline hover:text-heading">Projets</Link></li>
            <li><Link to="/about" className="link-underline hover:text-heading">Parcours</Link></li>
            <li><Link to="/contact" className="link-underline hover:text-heading">Contact</Link></li>
          </ul>
        </nav>

        <div className="col-span-full flex items-start justify-between gap-6 lg:col-start-9 lg:col-end-13">
          <p className="max-w-[28ch] text-caption text-muted">
            React 19, Vite, Tailwind v4, sans librairie d&apos;animation ·{" "}
            <a
              href={SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-heading"
            >
              code source ↗
            </a>
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
