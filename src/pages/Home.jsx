import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa6'
import { LuArrowDown, LuArrowUpRight } from 'react-icons/lu'

import ProjectCard from '../components/ProjectCard'

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

export default function Home() {
  function scrollToProjects() {
    document
      .getElementById('projets-recents')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section
        id="hero"
        className="flex min-h-[60vh] flex-col justify-center gap-8 py-16 text-primary-text sm:min-h-[70vh] sm:gap-10 sm:py-24"
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-medium tracking-tight text-title sm:text-5xl">
            Lucas Autret
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="text-lg text-primary-text sm:text-xl">Développeur full-stack</p>
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary-text/25 px-3 py-1 text-xs text-secondary-text">
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              Disponible en octobre 2026
            </span>
          </div>
        </div>

        <p className="max-w-xl leading-relaxed text-primary-text sm:text-lg">
          Diplômé du Master Génie Logiciel de l’Université de Bordeaux, j’ai passé 6 mois chez
          Capgemini sur une application web de santé en C#/.NET et SolidJS/TypeScript. À côté, je
          construis mes propres outils : de l’OCR en Python/FastAPI aux interfaces React.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={scrollToProjects}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-text px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Voir mes projets
            <LuArrowDown className="size-4 shrink-0" aria-hidden="true" />
          </button>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary-text/25 px-5 py-2.5 text-sm transition-colors hover:bg-secondary-text/10 hover:text-primary-text"
          >
            Me contacter
            <LuArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>

          <a
            href="https://github.com/Maynito"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary-text/25 px-5 py-2.5 text-sm transition-colors hover:bg-secondary-text/10 hover:text-primary-text"
          >
            <FaGithub className="size-4 shrink-0" aria-hidden="true" />
            GitHub
          </a>
        </div>
      </section>

      <div id="projets-recents" className="space-y-6 py-8 text-lg leading-relaxed text-primary-text">
        <h2 className="text-sm font-bold text-secondary-text">Projets récents</h2>

        <div className="@container">
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 @md:grid-cols-2">
            {RECENT_PROJECTS.map((projet) => (
              <ProjectCard key={projet.title} {...projet} />
            ))}
          </div>
        </div>

      </div>

      <div id="projets-precedents" className="space-y-6 py-8 text-lg leading-relaxed text-primary-text">
        <h2 className="text-sm font-bold text-secondary-text">Projets précédents</h2>

        <div className="@container">
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 @md:grid-cols-2">
            {PREVIOUS_PROJECTS.map((projet, index) => (
              <ProjectCard key={`${projet.title}-${index}`} {...projet} />
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
