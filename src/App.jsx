import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ProjectCard from './components/ProjectCard'

import kamas from './assets/kamas3.png'

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
    techs: ["React", "Tailwind CSS"]
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

function App() {
  return (
    <div className="App bg-background min-h-screen flex flex-col">
      <NavBar />
      <main className="page-width flex-1">

        <section id="hero" className="flex-col bottom-0 z-50 flex py-20 text-primary-text gap-6">
          <h2 className="text-sm font-bold text-secondary-text">Présentation</h2>
          <p className="text-primary-text text-md leading-relaxed">
            Ceci est un exemple de contenu pour la section d'accueil.
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

      </main>
      <Footer />
    </div>
  )
}

export default App
