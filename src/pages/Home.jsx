import ProjectCard from '../components/ProjectCard'

import kamas from '../assets/kamas3.png'

const RECENT_PROJECTS = [
  {
    title: "Kamas",
    description: "Outil de suivi des prix Dofus qui repère les crafts les plus rentables.",
    imageUrl: kamas,
    projectUrl: "https://github.com/Maynito/kamas",
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
    projectUrl: "https://github.com/Maynito/smokelab",
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
  return (
    <>
      <section id="hero" className="flex-col flex py-12 sm:py-20 text-primary-text gap-6">
        <h2 className="text-sm font-bold text-secondary-text">Présentation</h2>
        <p className="text-primary-text text-md leading-relaxed">
          Développeur full-stack diplômé du Master Génie Logiciel de l’Université de Bordeaux, avec 6 mois d’expérience chez Capgemini sur une
          application web de santé en C#/.NET et SolidJS/TypeScript. Je recherche un CDI, disponible dès octobre 2026.
        </p>
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
