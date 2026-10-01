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

export default function ProjectCard({ title, description, imageUrl, projectUrl, techs = [] }) {
  const isInternal = projectUrl.startsWith("/") && !projectUrl.startsWith("//");
  const Wrapper = isInternal ? Link : "a";
  const linkProps = isInternal
    ? { to: projectUrl }
    : { href: projectUrl, target: "_blank", rel: "noopener noreferrer" };

  const monogramme = construireMonogramme(title);

  return (
    <Wrapper
      {...linkProps}
      className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-secondary-text/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-secondary-text/20 bg-secondary-text/5 transition duration-300 group-hover:scale-[0.97] group-hover:border-secondary-text/35">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-opacity duration-300 group-hover:opacity-80"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-br from-secondary-text/20 via-secondary-text/5 to-secondary-text/15"
          >
            {/* Hachures diagonales très discrètes, dérivées du token de thème */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--color-secondary-text)_0,var(--color-secondary-text)_1px,transparent_1px,transparent_12px)] opacity-[0.07]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="select-none font-semibold tracking-[0.18em] text-5xl text-secondary-text/40 transition-colors duration-300 sm:text-6xl group-hover:text-secondary-text/60">
                {monogramme}
              </span>
            </div>
          </div>
        )}

        {/* Léger liseré intérieur : donne de la profondeur au cadre */}
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-title/5" />
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-primary-text">{title}</h3>
          <p className="text-sm leading-snug text-secondary-text">{description}</p>
          {techs.length > 0 && (
            <p className="text-xs text-secondary-text">{techs.join(" · ")}</p>
          )}
        </div>
        <LuArrowUpRight className="mt-0.5 size-4 shrink-0 text-secondary-text transition-colors group-hover:text-primary-text" />
      </div>
    </Wrapper>
  );
}
