import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ArchSchematic from "./ArchSchematic";
import DotGrid from "./DotGrid";
import { projects } from "../data/projects";

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function TableOfContents({ sections, className = "" }) {
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);

  // Avec HashRouter, un lien #id changerait de route : on défile en JS.
  function versSection(id) {
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduit ? "auto" : "smooth", block: "start" });
  }

  return (
    <nav aria-label="Sommaire" className={className}>
      <p className="label mb-3">Sommaire</p>
      <ul>
        {sections.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => versSection(s.id)}
              aria-current={active === s.id ? "true" : undefined}
              className="flex w-full items-center gap-3 py-1.5 text-left text-[13px] text-muted transition-colors hover:text-heading aria-[current]:text-heading"
            >
              <span className="h-px w-3 shrink-0 origin-left bg-border-strong transition-transform duration-240 ease-out-quint" />
              {String(i + 1).padStart(2, "0")} {s.titre}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * `ratio` fixe le format du cadre pour que toutes les figures aient la même hauteur,
 * quelle que soit la taille de la capture. "auto" laisse le contenu décider (schémas).
 */
export function Figure({ children, caption, num, wide = false, ratio = "16/10" }) {
  return (
    <figure className={wide ? "wide" : ""}>
      <div
        className={`overflow-hidden rounded-xl border border-border bg-surface [&>img]:size-full [&>img]:object-contain ${
          ratio === "auto" ? "" : "aspect-[16/10]"
        }`}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-xs leading-[18px] text-muted">
          Fig. {num} — {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Placeholder({ label = "Capture à venir" }) {
  return (
    <div className="grid aspect-[16/10] place-items-center bg-[repeating-linear-gradient(135deg,var(--border)_0,var(--border)_1px,transparent_1px,transparent_14px)]">
      <span className="label">{label}</span>
    </div>
  );
}

export function Adr({ titre, contexte, decision, compromis }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-card text-heading">{titre}</p>
      <dl className="mt-4">
        {[
          ["Contexte", contexte],
          ["Décision", decision],
          ["Compromis", compromis],
        ].map(([cle, valeur]) => (
          <div key={cle} className="grid gap-1 border-t border-border py-3 sm:grid-cols-[120px_1fr] sm:gap-4">
            <dt className="label">{cle}</dt>
            <dd className="text-sm leading-[22px] text-text">{valeur}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function QualityTable({ rows }) {
  return (
    <table className="w-full border-collapse text-left">
      <tbody>
        {rows.map(([cle, valeur]) => (
          <tr key={cle} className="border-t border-border last:border-b">
            <th scope="row" className="label w-[34%] py-4 pr-4 align-top">
              {cle}
            </th>
            <td className="py-4 text-sm leading-[22px] text-text">{valeur}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function CaseStudy({ project, chapo, meta, sections, children }) {
  const total = projects.filter((p) => p.featured).length;
  const featuredList = projects.filter((p) => p.featured);
  const position = featuredList.findIndex((p) => p.slug === project.slug);
  const next = featuredList[(position + 1) % featuredList.length];

  return (
    <article>
      <div className="relative overflow-hidden pb-[clamp(2rem,4vw,3rem)]">
      <DotGrid />
      <header className="site grid-site relative pt-[clamp(3rem,6vw,6rem)]">
        <nav aria-label="Fil d'Ariane" className="label col-span-full mb-[clamp(2.5rem,6vw,5rem)] flex justify-between">
          <Link to="/" className="transition-colors hover:text-heading">
            ← Projets
          </Link>
          <span>
            {String(position + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </nav>

        <p className="label col-span-full">Étude de cas</p>
        <h1 className="col-span-full mt-4 text-case-title text-heading">{project.name}</h1>
        <p className="col-span-full mt-[clamp(1.5rem,3vw,2.5rem)] max-w-[34em] text-chapo text-text lg:col-span-9">
          {chapo}
        </p>

        <dl className="col-span-full mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-subgrid gap-y-6">
          {meta.map(([cle, valeur]) => (
            <div key={cle} className="col-span-2 border-t border-border pt-3 lg:col-span-3">
              <dt className="label">{cle}</dt>
              <dd className="mt-1.5 text-sm text-text">{valeur}</dd>
            </div>
          ))}
        </dl>
      </header>
      </div>

      <figure className="mt-[clamp(3rem,6vw,5rem)] border-y border-border bg-surface py-[clamp(1.5rem,4vw,3rem)]">
        <div className="site">
          {project.cover ? (
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              className="w-full rounded-xl border border-border object-cover object-left-top"
            />
          ) : (
            <ArchSchematic project={project} W={1200} H={440} />
          )}
          <figcaption className="mt-3 font-mono text-xs text-muted">
            Fig. 1 — {project.cover?.caption ?? "Architecture, générée depuis projects.js"}
          </figcaption>
        </div>
      </figure>

      <div className="site grid-site items-start pt-[clamp(4rem,7vw,7rem)]">
        <TableOfContents
          sections={sections}
          className="sticky top-[calc(var(--hdr)+32px)] col-span-2 hidden lg:block"
        />
        <div className="prose-cs col-span-full grid grid-cols-subgrid lg:col-start-4 lg:col-end-13 [&>*]:col-span-full lg:[&>*]:col-span-7 lg:[&>.wide]:col-span-full lg:[&>.wide]:bleed-r max-lg:[&>.wide]:bleed-x">
          {children}
        </div>
      </div>

      <Link
        to={`/${next.slug}`}
        className="group site mt-section block border-t border-border py-[clamp(3rem,6vw,5rem)]"
      >
        <span className="label">Projet suivant · {next.num}</span>
        <span className="mt-3.5 flex items-baseline gap-5 text-[clamp(2.5rem,1rem+5vw,5.5rem)] font-semibold leading-none tracking-[-0.045em] text-heading">
          {next.name}
          <span aria-hidden className="font-normal transition-transform duration-400 ease-out-quint group-hover:translate-x-3">
            →
          </span>
        </span>
      </Link>
    </article>
  );
}
