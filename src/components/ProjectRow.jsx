import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";

/**
 * Projet mis en avant : une ligne pleine largeur, image d'un côté, texte de l'autre.
 * L'alternance gauche/droite crée le rythme de la page.
 */
export default function ProjectRow({ index, title, description, imageUrl, projectUrl, techs = [], eager = false }) {
  const isInternal = projectUrl.startsWith("/") && !projectUrl.startsWith("//");
  const Wrapper = isInternal ? Link : "a";
  const linkProps = isInternal
    ? { to: projectUrl }
    : { href: projectUrl, target: "_blank", rel: "noopener noreferrer" };

  const imageADroite = index % 2 === 0;

  return (
    <Wrapper
      {...linkProps}
      className="group grid items-center gap-8 border-t border-border py-12 outline-none sm:grid-cols-2 sm:gap-12 lg:py-16"
    >
      {/* Visuel */}
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface shadow-frame transition duration-400 ease-out-quint group-hover:border-border-strong group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-galaxy ${
          imageADroite ? "sm:order-2" : ""
        }`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading={eager ? "eager" : "lazy"}
            className="h-full w-full object-cover object-top transition duration-700 ease-out-quint motion-safe:group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--border)_0,var(--border)_1px,transparent_1px,transparent_14px)] opacity-[0.12]" />
            <span className="relative font-mono text-caption tracking-[0.3em] text-muted uppercase">
              capture à venir
            </span>
          </div>
        )}
      </div>

      {/* Texte */}
      <div className={`flex flex-col gap-4 ${imageADroite ? "sm:order-1" : ""}`}>
        <span className="font-mono text-xs text-muted tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="flex items-start gap-3 text-page-sm text-heading sm:text-page">
          {title}
          <LuArrowUpRight className="mt-2 size-5 shrink-0 text-muted transition duration-280 ease-out-quint group-hover:text-heading motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1" />
        </h3>

        <p className="max-w-[48ch] text-body text-text">{description}</p>

        {techs.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {techs.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Wrapper>
  );
}
