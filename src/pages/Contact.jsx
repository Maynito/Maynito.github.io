import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";

const LIENS = [
  {
    label: "Email",
    value: "lucas.autret@hotmail.com",
    href: "mailto:lucas.autret@hotmail.com",
    icon: FaEnvelope,
    externe: false,
  },
  {
    label: "LinkedIn",
    value: "lucas-autret",
    href: "https://www.linkedin.com/in/lucas-autret-4814b6387/",
    icon: FaLinkedin,
    externe: true,
  },
  {
    label: "GitHub",
    value: "Maynito",
    href: "https://github.com/Maynito",
    icon: FaGithub,
    externe: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="space-y-6 py-8 leading-relaxed text-primary-text">
      <h2 className="text-sm font-bold text-secondary-text">Contact</h2>
      <p>Vous pouvez me contacter via les moyens suivants :</p>

      <ul className="divide-y divide-secondary-text/15 border-y border-secondary-text/15">
        {LIENS.map(({ label, value, href, icon: Icon, externe }) => (
          <li key={label}>
            <a
              href={href}
              target={externe ? "_blank" : undefined}
              rel={externe ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 py-4 transition-colors hover:text-primary-text"
            >
              <Icon className="size-5 shrink-0 text-secondary-text group-hover:text-primary-text" />
              <span className="w-24 shrink-0 text-sm text-secondary-text">{label}</span>
              <span className="truncate text-sm">{value}</span>
              <LuArrowUpRight className="ml-auto size-4 shrink-0 text-secondary-text group-hover:text-primary-text" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
