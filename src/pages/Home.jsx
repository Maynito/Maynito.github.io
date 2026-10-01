import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";

import DotGrid from "../components/DotGrid";
import Feature from "../components/Feature";
import ProjectIndex from "../components/ProjectIndex";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import { Dot } from "../components/NavBar";
import { featured, indexed } from "../data/projects";

const GITHUB = "https://github.com/Maynito";

// Fiche technique du hero : uniquement des faits.
const FICHE = [
  ["Formation", "Master Génie Logiciel — Université de Bordeaux"],
  ["Expérience", "6 mois chez Capgemini — application web de santé"],
  ["Front", "React · SolidJS · Angular · TypeScript · Tailwind"],
  ["Back", "Python · FastAPI · C# / .NET · Java · PostgreSQL"],
  ["Statut", "Disponible en octobre 2026"],
];

const PARCOURS = [
  {
    date: "2024 → 2026",
    titre: "Master Génie Logiciel",
    texte: "Université de Bordeaux : conception logicielle, algorithmique, web et données.",
  },
  {
    date: "Stage · 6 mois",
    titre: "Capgemini",
    texte: "Application web de santé en C#/.NET et SolidJS/TypeScript, au sein d'une équipe produit.",
  },
  {
    date: "Octobre 2026",
    titre: "Disponible",
    texte: "À la recherche d'un poste full-stack, plutôt orienté back et traitement de données.",
    disponible: true,
  },
];

let heroPlayed = false;

export default function Home() {
  const [animate] = useState(() => !heroPlayed);
  useEffect(() => {
    heroPlayed = true;
  }, []);

  function versProjets() {
    document.getElementById("projets")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const entree = (delay) => (animate ? `animate-enter enter-delay-${delay}` : "");

  return (
    <>
      {/* Écran 1 · Hero */}
      <section className="relative flex min-h-[max(600px,calc(100svh-var(--hdr)))] items-center overflow-hidden border-b border-border pt-[clamp(3rem,6vw,6rem)] pb-[clamp(2.5rem,5vw,4.5rem)]">
        <DotGrid />

        <div className="site grid-site relative">
          <p
            className={`label col-span-full mb-[clamp(1.5rem,3vw,2.5rem)] flex flex-wrap items-center gap-x-5 gap-y-2 ${entree(80)}`}
          >
            <span>Développeur full-stack</span>
            <span className="inline-flex items-center gap-2.5">
              <Dot /> Disponible en octobre 2026
            </span>
          </p>

          <h1 className="col-span-full text-name text-heading">
            <span className={`block ${entree(160)}`}>Lucas</span>
            <span className={`name-offset block ${entree(240)}`}>Autret</span>
          </h1>

          <div className="col-span-full mt-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-subgrid gap-y-8">
            <p
              className={`col-span-full max-w-[36em] text-lede text-text sm:col-span-6 lg:col-span-5 lg:row-start-1 ${entree(320)}`}
            >
              Je construis des outils qui transforment des données brutes en décisions : OCR,
              API, traitement distribué. Côté interface, je reste là où le back fait le travail.
            </p>

            <dl
              className={`col-span-full border-t border-border lg:col-start-7 lg:col-end-13 lg:row-span-2 lg:row-start-1 ${entree(400)}`}
            >
              {FICHE.map(([cle, valeur]) => (
                <div key={cle} className="grid grid-cols-[104px_1fr] gap-4 border-b border-border py-[11px]">
                  <dt className="label leading-[22px]">{cle}</dt>
                  <dd className="text-sm leading-[22px] text-text">{valeur}</dd>
                </div>
              ))}
            </dl>

            <div
              className={`col-span-full grid grid-cols-2 items-center gap-3 sm:flex sm:flex-wrap lg:col-span-5 lg:row-start-2 lg:self-end ${entree(480)}`}
            >
              <button type="button" onClick={versProjets} className="btn btn-primary col-span-2">
                Voir les projets ↓
              </button>
              <Link to="/contact" className="btn">
                Me contacter
              </Link>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex size-11 items-center justify-center justify-self-center rounded-full border border-border text-muted transition-colors duration-160 ease-out-quint hover:border-border-strong hover:bg-surface-hover hover:text-heading"
              >
                <FaGithub className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Écran 2 · Projets en vedette */}
      <section id="projets" className="scroll-mt-24 py-section">
        <SectionHead num="01" title="Projets" note="Deux projets détaillés, quatre autres en index." />
        {featured.map((p, i) => (
          <Feature key={p.slug} p={p} index={i + 1} reverse={i % 2 === 1} />
        ))}
      </section>

      {/* Écran 3 · Index */}
      <section className="pb-section">
        <SectionHead num="02" title="Index" note="Projets personnels et universitaires." />
        <ProjectIndex items={indexed} />
      </section>

      {/* Écran 4 · Parcours, bande pleine largeur */}
      <section className="border-y border-border bg-surface py-[clamp(4rem,8vw,6.3rem)]">
        <div className="site">
          <p className="label mb-[clamp(2rem,4vw,3rem)]">03 — Parcours</p>
          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-6">
            {PARCOURS.map((etape) => (
              <Reveal as="li" key={etape.titre} className="border-t border-border-strong pt-5 lg:border-t">
                <p className="label flex items-center gap-2.5">
                  {etape.disponible && <Dot />}
                  {etape.date}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-heading">{etape.titre}</h3>
                <p className="mt-2 text-sm text-muted">{etape.texte}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Écran 5 · Appel au contact */}
      <section className="py-section">
        <div className="site grid-site">
          <p className="label col-span-full">04 — Contact</p>
          <h2 className="col-span-full mt-5 text-cta text-heading lg:col-span-10">
            Un poste full-stack à pourvoir ? Parlons-en.
          </h2>
          <div className="col-span-full mt-[clamp(2rem,4vw,3rem)] flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="mailto:lucas.autret@hotmail.com"
              className="text-[clamp(1.2rem,2.4vw,1.75rem)] font-medium text-heading underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-heading"
            >
              lucas.autret@hotmail.com
            </a>
            <span className="flex gap-6 font-mono text-xs text-muted">
              <a
                href="https://www.linkedin.com/in/lucas-autret-4814b6387/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-heading"
              >
                LinkedIn ↗
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-heading">
                GitHub ↗
              </a>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
