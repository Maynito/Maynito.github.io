import { Link } from "react-router-dom";

import BuildStamp from "./BuildStamp";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="z-50 pt-20 pb-24 sm:pt-40 sm:pb-60 text-muted page-width">
      <hr className="mb-8 border-t border-border" />
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start text-caption">
        <div className="flex flex-col gap-2 self-start">
          <p>&copy; {year} Lucas Autret</p>
          <BuildStamp />
        </div>

        <nav className="self-start">
          <ul className="flex flex-col space-y-2">
            <li><a href="mailto:lucas.autret@hotmail.com" className="link-underline hover:text-heading">Mail</a></li>
            <li><a href="https://www.linkedin.com/in/lucas-autret-4814b6387/" target="_blank" rel="noopener noreferrer" className="link-underline hover:text-heading">LinkedIn</a></li>
            <li><a href="https://github.com/Maynito" target="_blank" rel="noopener noreferrer" className="link-underline hover:text-heading">Github</a></li>
          </ul>
        </nav>

        <nav className="self-start">
          <ul className="flex flex-col space-y-2">
            <li><Link to="/" className="link-underline hover:text-heading">Work</Link></li>
            <li><Link to="/about" className="link-underline hover:text-heading">About</Link></li>
            <li><Link to="/contact" className="link-underline hover:text-heading">Contact</Link></li>
          </ul>
        </nav>

        <div className="self-start">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
