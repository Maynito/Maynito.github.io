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
    <div className="site grid-site py-section">
      <p className="label col-span-full">Contact</p>

      <h1 className="col-span-full mt-5 text-cta text-heading lg:col-span-10">
        Un poste full-stack à pourvoir ? Parlons-en.
      </h1>

      <ul className="col-span-full mt-[clamp(2.5rem,5vw,4rem)] border-t border-border lg:col-span-8">
        {LIENS.map(({ label, value, href, icon: Icon, externe }) => (
          <li key={label}>
            <a
              href={href}
              target={externe ? "_blank" : undefined}
              rel={externe ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-5 border-b border-border py-6 transition-colors hover:text-heading"
            >
              <Icon className="size-5 shrink-0 text-muted transition-colors group-hover:text-heading" />
              <span className="label w-24 shrink-0">{label}</span>
              <span className="truncate text-row text-heading">{value}</span>
              <LuArrowUpRight className="ml-auto size-5 shrink-0 text-muted transition duration-280 ease-out-quint group-hover:text-heading motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
