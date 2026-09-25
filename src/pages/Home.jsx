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
    description: "Ceci est un exemple de description pour le projet portfolio.",
    imageUrl: "",
    projectUrl: "https://github.com/Maynito/smokelab",
    techs: ["React", "Tailwind CSS"]
  },
  {
    title: "FedIA",
    description: "Ceci est un exemple de description pour le projet portfolio.",
    imageUrl: "",
    projectUrl: "https://labs.sogeti.com/project/fedia/",
    techs: ["C#", ".NET", "SolidJS"]
  }
];

const PREVIOUS_PROJECTS = [
  {
    title: "TaskForge",
    description: "Ceci est un exemple de description pour le projet portfolio.",
    imageUrl: "",
    projectUrl: "https://github.com/Maynito/TaskForge",
    techs: ["React", "Tailwind CSS"]
  },
  {
    title: "Paint App",
    description: "Ceci est un exemple de description pour le projet portfolio.",
    imageUrl: "",
    projectUrl: "https://github.com/Maynito/smokelab",
    techs: ["React", "Tailwind CSS"]
  },
  {
    title: "Programmation Large Échelle",
    description: "Ceci est un exemple de description pour le projet portfolio.",
    imageUrl: "",
    projectUrl: "https://github.com/Decymax/ProjetPLE",
    techs: ["React", "Tailwind CSS"]
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
