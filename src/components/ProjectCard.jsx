import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";

const MOTS_IGNORES = ["de", "du", "des", "la", "le", "les", "et", "à", "en", "sur", "pour"];

/**
 * Construit un monogramme sobre à partir du titre du projet.
 * "Paint App" -> "PA", "SmokeLab" -> "SL", "Kamas" -> "KA"
 */
function construireMonogramme(titre = "") {
  const mots = titre.trim().split(/\s+/).filter(Boolean);

  if (mots.length > 1) {
    const motsUtiles = mots.filter((mot) => !MOTS_IGNORES.includes(mot.toLowerCase()));
    const retenus = (motsUtiles.length > 0 ? motsUtiles : mots).slice(0, 3);
    return retenus.map((mot) => mot[0]).join("").toUpperCase();
  }

  const mot = mots[0] ?? "";
  const majuscules = mot.match(/[A-ZÀ-ÞĀ-Ž]/g) ?? [];
  if (majuscules.length >= 2) return majuscules.slice(0, 2).join("");
  return mot.slice(0, 2).toUpperCase();
}

export default function ProjectCard({ title, description, imageUrl, projectUrl, techs = [], eager = false }) {
  const isInternal = projectUrl.startsWith("/") && !projectUrl.startsWith("//");
  const Wrapper = isInternal ? Link : "a";
  const linkProps = isInternal
    ? { to: projectUrl }
    : { href: projectUrl, target: "_blank", rel: "noopener noreferrer" };

  const monogramme = construireMonogramme(title);

  return (
    <Wrapper
      {...linkProps}
      className="group block rounded-xl outline-none"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-surface shadow-frame transition duration-400 ease-out-quint group-hover:border-border-strong motion-safe:group-hover:scale-[0.97] motion-safe:group-active:scale-[0.96] group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-galaxy">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading={eager ? "eager" : "lazy"}
            className="h-full w-full object-cover object-top transition-opacity duration-400 ease-out-quint group-hover:opacity-80"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-br from-border-strong via-border to-border"
          >
            {/* Hachures diagonales très discrètes, dérivées du token de thème */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--border)_0,var(--border)_1px,transparent_1px,transparent_12px)] opacity-[0.07]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="select-none font-semibold tracking-[0.18em] text-5xl text-muted/60 transition duration-400 ease-out-quint sm:text-6xl motion-safe:group-hover:scale-[1.04]">
                {monogramme}
              </span>
            </div>
          </div>
        )}

        {/* Léger liseré intérieur : donne de la profondeur au cadre */}
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-heading/5" />
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-card text-heading">{title}</h3>
          <p className="text-body-sm text-muted">{description}</p>
          {techs.length > 0 && (
            <p className="font-mono text-xs text-muted">{techs.join(" · ")}</p>
          )}
        </div>
        {/* Deux flèches : la première sort en haut à droite, la seconde entre par le bas à gauche */}
        <span
          aria-hidden="true"
          className="relative mt-0.5 size-4 shrink-0 overflow-hidden text-muted transition-colors duration-200 group-hover:text-heading group-focus-visible:text-heading"
        >
          <LuArrowUpRight className="absolute inset-0 size-4 transition duration-280 ease-out-quint group-hover:opacity-0 motion-safe:group-hover:translate-x-3.5 motion-safe:group-hover:-translate-y-3.5" />
          <LuArrowUpRight className="absolute inset-0 size-4 opacity-0 transition delay-40 duration-280 ease-out-quint motion-safe:-translate-x-3.5 motion-safe:translate-y-3.5 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </span>
      </div>
    </Wrapper>
  );
}
