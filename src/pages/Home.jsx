import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa6'
import { LuArrowDown, LuArrowUpRight } from 'react-icons/lu'

import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'

import kamas from '../assets/kamas-hdv-merge.png'

const RECENT_PROJECTS = [
  {
    title: "Kamas",
    description: "Outil de suivi des prix Dofus qui repère les crafts les plus rentables.",
    imageUrl: kamas,
    projectUrl: "/kamas",
    techs: ["Python", "FastAPI", "Tesseract", "SQLite", "JavaScript"]
  },
  {
    title: "SmokeLab",
    description: "Outil de visualisation et de stratégie pour le jeu Counter-Strike 2.",
    imageUrl: "",
    projectUrl: "https://github.com/Maynito/smokelab",
    techs: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Steam Auth"]
  },
  {
    title: "FedIA",
    description: "Plateforme d'analyse de radiographies médicales.",
    imageUrl: "",
    projectUrl: "https://labs.sogeti.com/project/fedia/",
    techs: ["C#", ".NET", "SolidJS"]
  }
];

const PREVIOUS_PROJECTS = [
  {
    title: "TaskForge",
    description: "Plateforme de gestion de projet agile : sprints, Kanban, authentification JWT.",
    imageUrl: "",
    projectUrl: "https://github.com/Maynito/TaskForge",
    techs: ["Angular", "TypeScript", "Spring Boot", "PostgreSQL", "Docker", "Swagger / OpenAPI", "JWT"]
  },
  {
    title: "Paint App",
    description: "Application de formes géométriques.",
    imageUrl: "",
    projectUrl: "https://github.com/Maynito/projet-paint",
    techs: ["Java (apprentissage Design Patterns)"]
  },
  {
    title: "Programmation Large Échelle",
    description: "Traitement distribué de données Clash Royale avec MapReduce sur cluster Hadoop.",
    imageUrl: "",
    projectUrl: "https://github.com/Decymax/ProjetPLE",
    techs: ["Java", "Python", "Hadoop", "MapReduce", "HDFS"]
  }
];

// Module : la cascade ne rejoue pas d'une navigation à l'autre, seulement au chargement.
let heroPlayed = false;

export default function Home() {
  const [animate] = useState(() => !heroPlayed);
  useEffect(() => { heroPlayed = true; }, []);

  function scrollToProjects() {
    document
      .getElementById('projets-recents')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section
        id="hero"
        className="flex min-h-[calc(100svh-12rem)] flex-col justify-center gap-8 border-b border-border pb-16 text-text sm:min-h-[calc(100svh-15rem)] sm:gap-10 sm:pb-24"
      >
        <div className="flex flex-col gap-4">
          <h1 className={`text-display-sm sm:text-display text-heading ${animate ? 'animate-enter enter-delay-80' : ''}`}>
            Lucas Autret
          </h1>

          <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${animate ? 'animate-enter enter-delay-160' : ''}`}>
            <p className="text-body text-muted">Développeur full-stack</p>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-caption text-text">
              <span className="relative flex size-2" aria-hidden="true">
                <span className={`absolute inset-0 rounded-full bg-success ${animate ? 'animate-halo' : ''}`} />
                <span className="relative size-2 rounded-full bg-success" />
              </span>
              Disponible en octobre 2026
            </span>
          </div>
        </div>

        <p className={`max-w-[60ch] text-body text-text ${animate ? 'animate-enter enter-delay-240' : ''}`}>
          Diplômé du Master Génie Logiciel de l’Université de Bordeaux, j’ai passé 6 mois chez
          Capgemini sur une application web de santé en C#/.NET et SolidJS/TypeScript. À côté, je
          construis mes propres outils : de l’OCR en Python/FastAPI aux interfaces React.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={scrollToProjects}
            className={`group inline-flex items-center justify-center gap-2 rounded-full bg-heading px-5 py-2.5 text-sm font-medium text-bg transition-opacity duration-160 ease-out-quint hover:opacity-90 motion-safe:active:scale-[0.97] ${animate ? 'animate-enter enter-delay-320' : ''}`}
          >
            Voir mes projets
            <LuArrowDown className="size-4 shrink-0 transition-transform duration-240 ease-out-quint motion-safe:group-hover:translate-y-0.5" aria-hidden="true" />
          </button>

          <Link
            to="/contact"
            className={`group inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors duration-160 ease-out-quint hover:border-border-strong hover:bg-surface-hover hover:text-heading motion-safe:active:scale-[0.97] ${animate ? 'animate-enter enter-delay-380' : ''}`}
          >
            Me contacter
            <LuArrowUpRight className="size-4 shrink-0 transition-transform duration-240 ease-out-quint motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>

          <a
            href="https://github.com/Maynito"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors duration-160 ease-out-quint hover:border-border-strong hover:bg-surface-hover hover:text-heading motion-safe:active:scale-[0.97] ${animate ? 'animate-enter enter-delay-440' : ''}`}
          >
            <FaGithub className="size-4 shrink-0" aria-hidden="true" />
            GitHub
          </a>
        </div>
        <hr className={`mt-auto h-px origin-left border-0 bg-border ${animate ? 'animate-draw' : ''}`} />
      </section>

      <div id="projets-recents" className="scroll-mt-8 space-y-6 pt-16 pb-8 text-lg leading-relaxed text-text sm:pt-24">
        <Reveal as="h2" className="text-section text-heading">Projets récents</Reveal>

        <div className="@container">
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 @md:grid-cols-2">
            {RECENT_PROJECTS.map((projet, index) => (
              <Reveal key={projet.title} col={index % 2}>
                <ProjectCard {...projet} eager={index < 2} />
              </Reveal>
            ))}
          </div>
        </div>

      </div>

      <div id="projets-precedents" className="space-y-6 py-8 text-lg leading-relaxed text-text">
        <Reveal as="h2" className="text-section text-heading">Projets précédents</Reveal>

        <div className="@container">
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 @md:grid-cols-2">
            {PREVIOUS_PROJECTS.map((projet, index) => (
              <Reveal key={`${projet.title}-${index}`} col={index % 2}>
                <ProjectCard {...projet} />
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
