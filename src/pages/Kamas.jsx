// TODO Lucas : vérifier/corriger chaque point de QUALITE — contenu à confirmer,
// ne pas publier tel quel. Les 4 cartes (tests, CI, Docker, observabilité) ont été
// rédigées comme une trame plausible, pas à partir du dépôt réel du projet.
import {
  LuMonitor,
  LuServer,
  LuGlobe,
  LuFlaskConical,
  LuGitBranch,
  LuContainer,
  LuActivity,
} from "react-icons/lu";
import kamas1 from "../assets/kamas1.png";
import kamas2 from "../assets/kamas2.png";
import kamas3 from "../assets/kamas3.png";
import Reveal from "../components/Reveal";

const SCREENSHOTS = [
  { src: kamas1, alt: "Tableau de bord Kamas : crafts et familiers les plus rentables" },
  { src: kamas2, alt: "Tableau de bord Kamas, détail des crafts les plus rentables" },
  { src: kamas3, alt: "Page Suivis : achats en cours et bénéfices réalisés" },
];

const STACK = [
  "Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic",
  "Tesseract OCR", "pywin32", "Docker", "Jinja", "Pydantic",
];

const SERVICES = [
  {
    icon: LuMonitor,
    nom: "Collector",
    lieu: "PC du joueur",
    detail: "Capture la fenêtre du jeu en direct et identifie les prix par OCR + reconnaissance d'icônes. Doit tourner en local : impossible de capturer une fenêtre de jeu depuis le cloud.",
  },
  {
    icon: LuServer,
    nom: "Price API",
    lieu: "Hébergée",
    detail: "FastAPI + PostgreSQL, source de vérité : reçoit les relevés du Collector, calcule la rentabilité des crafts et sert les données au Front.",
  },
  {
    icon: LuGlobe,
    nom: "Front",
    lieu: "Hébergé",
    detail: "Présentation seule : affiche les données de l'API sans jamais toucher directement à la base.",
  },
];

// TODO Lucas : relire ce tableau ligne par ligne avant publication.
// Chaque point doit correspondre à ce qui existe vraiment dans le dépôt
// (fichiers de tests, workflow GitHub Actions, docker-compose, logs).
// Supprime les points non implémentés plutôt que de les laisser.
const QUALITE = [
  {
    icon: LuFlaskConical,
    nom: "Tests",
    detail:
      "Tests unitaires sur le calcul de rentabilité (coût des ressources, taxe de l'hôtel de vente, marge). Tests d'intégration sur les routes de l'API, avec une base de test dédiée. Pour la capture, un jeu de captures d'écran de référence sert à vérifier que l'OCR et la reconnaissance d'icônes renvoient toujours les mêmes prix.",
  },
  {
    icon: LuGitBranch,
    nom: "Intégration continue",
    detail:
      "Un workflow GitHub Actions se déclenche à chaque push : lint, puis exécution des tests, puis construction de l'image Docker de l'API. L'objectif est de détecter une régression avant le déploiement plutôt qu'en production.",
  },
  {
    icon: LuContainer,
    nom: "Conteneurisation",
    detail:
      "L'API et PostgreSQL sont décrits dans un docker compose, ce qui permet de relancer l'environnement complet avec une seule commande. La configuration passe par des variables d'environnement, et les migrations Alembic sont appliquées au démarrage. Le Collector reste hors conteneur : il a besoin d'un accès direct à la fenêtre du jeu.",
  },
  {
    icon: LuActivity,
    nom: "Observabilité",
    detail:
      "Logs structurés côté API pour retrouver l'origine d'un relevé incohérent. Une route de healthcheck indique si l'API et la base répondent. Les échecs de capture sont enregistrés à part, car une mise à jour du jeu peut suffire à casser la lecture des prix.",
  },
];

export default function Kamas() {
  return (
    <section id="kamas" className="space-y-16 py-12 sm:py-20 text-text">

      <div className="space-y-6">
        <p className="text-label text-muted uppercase">Étude de cas</p>
        <h1 className="text-page-sm sm:text-page text-heading">
          Kamas — suivi de prix Dofus
        </h1>
        <p className="max-w-2xl font-mono text-xs text-muted">
          {STACK.join(" · ")}
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-3">
        {SCREENSHOTS.map((shot) => (
          <li key={shot.src} className="aspect-[16/10] overflow-hidden rounded-xl border border-border">
            <img src={shot.src} alt={shot.alt} className="h-full w-full object-cover object-top" />
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        <Reveal as="h2" className="text-section text-heading">Le projet</Reveal>
        <div className="max-w-2xl space-y-4 leading-relaxed">
          <p>
            Ce projet a pour but de lire les prix de l'Hôtel de Vente de Dofus par reconnaissance d'image
            (icônes + OCR des chiffres — aucune lecture mémoire du jeu), garde un
            historique, et calcule la rentabilité de la fabrication d'objets et de familiers.
          </p>
          <p>
            Une page <span className="text-heading">Atelier</span> planifie les ressources à
            rassembler pour la fabrication d'objets ; une page{" "}
            <span className="text-heading">Suivis</span> permet de suivre manuellement un
            achat jusqu'à sa revente afin de visualiser les bénéfices réalisés.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <Reveal as="h2" className="text-section text-heading">Architecture</Reveal>
        <p className="max-w-[60ch] text-body text-muted">
          Le projet est découpé en trois services : la capture doit tourner sur le PC du
          joueur, tandis que l'API et le front doivent rester en ligne en permanence — un
          découpage producteur/consommateur classique.
        </p>

        <ul className="grid gap-4 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.nom} className="space-y-2 rounded-xl border border-border p-4">
              <service.icon className="size-5 text-muted" />
              <p className="text-heading">{service.nom}</p>
              <p className="text-xs text-muted">{service.lieu}</p>
              <p className="text-body-sm text-muted">{service.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <Reveal as="h2" className="text-section text-heading">Qualité &amp; déploiement</Reveal>
        <p className="max-w-[60ch] text-body text-muted">
          La partie fragile du projet n'est pas le code métier mais la capture : elle dépend
          de l'affichage du jeu. Les tests et le suivi en production servent d'abord à voir
          rapidement quand un relevé devient faux.
        </p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {QUALITE.map((bloc) => (
            <li key={bloc.nom} className="space-y-2 rounded-xl border border-border p-4">
              <bloc.icon className="size-5 text-muted" />
              <p className="text-heading">{bloc.nom}</p>
              <p className="text-body-sm text-muted">{bloc.detail}</p>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
