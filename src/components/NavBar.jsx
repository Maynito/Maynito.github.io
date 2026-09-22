import { useState } from "react";
import profile from "../assets/profile.jpg";

const LIENS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {

  const [actif, setActif] = useState('#work');

  return (
    <header className="inset-x-0 top-0 z-50 flex items-center justify-between bg-background text-primary-text page-width px-4 pt-20 pb-6">
      <nav className="flex items-center space-x-4 text-lg font-semibold">
        <img src={profile} alt="Logo" className="h-10 w-10 shrink-0 rounded-full bg-white object-contain p-0.5" />
        <ul className="flex-col items-center space-x-2">
          <li>
            <a href="#home" className="text-lg font-semibold hover:text-primary-text">Lucas Autret</a>
          </li>
          <li className="text-sm font-normal text-secondary-text">
            <a className="hover:text-primary-text">Software Engineer</a>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className="flex space-x-2">
          {LIENS.map((lien) => (
            <li key={lien.href}>
              <a
                href={lien.href}
                className={`rounded-3xl px-3 py-2 hover:text-primary-text ${actif === lien.href ? 'bg-secondary-text/20 text-primary-text' : ''}`}
                onClick={() => setActif(lien.href)}
              >
                {lien.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
