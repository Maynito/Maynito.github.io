// TODO Lucas : la section « Qualité & déploiement » et les décisions techniques ont été
// rédigées comme une trame plausible, pas à partir du dépôt réel. Relis ligne par ligne
// et supprime ce qui n'existe pas plutôt que de le laisser.
import ArchSchematic from "../components/ArchSchematic";
import CaseStudy, { Adr, Figure, QualityTable } from "../components/CaseStudy";
import kamas1 from "../assets/kamas1.png";
import kamas2 from "../assets/kamas2.png";
import { bySlug } from "../data/projects";

const projet = bySlug("kamas");

const SECTIONS = [
  { id: "contexte", titre: "Contexte" },
  { id: "construit", titre: "Ce que j'ai construit" },
  { id: "architecture", titre: "Architecture" },
  { id: "decisions", titre: "Décisions techniques" },
  { id: "qualite", titre: "Qualité & déploiement" },
  { id: "bilan", titre: "Bilan" },
];

const META = [
  ["Rôle", "Conception et développement, seul"],
  ["Contexte", "Projet personnel"],
  ["Durée", "En cours"],
  ["Stack", "Python · FastAPI · PostgreSQL · Tesseract · Docker"],
];

const QUALITE = [
  [
    "Tests",
    "Tests unitaires sur le calcul de rentabilité (coût des ressources, marge). Tests d'intégration sur les routes de l'API. Pour la capture, un jeu de captures de référence vérifie que l'OCR renvoie toujours les mêmes prix.",
  ],
  [
    "Intégration continue",
    "Workflow GitHub Actions à chaque push : lint, tests, puis construction de l'image Docker de l'API.",
  ],
  [
    "Déploiement",
    "API et PostgreSQL décrits dans un docker compose, configuration par variables d'environnement. Le Collector reste hors conteneur : il a besoin d'un accès direct à la fenêtre du jeu.",
  ],
  [
    "Observabilité",
    "Logs structurés côté API pour retrouver l'origine d'un relevé incohérent, route de healthcheck, et enregistrement séparé des échecs de capture.",
  ],
];

export default function Kamas() {
  return (
    <CaseStudy
      project={projet}
      chapo="Lire les prix de l'hôtel des ventes de Dofus par reconnaissance d'image, en garder l'historique, et calculer la rentabilité réelle de chaque craft."
      meta={META}
      sections={SECTIONS}
    >
      <h2 id="contexte">
        <small className="label mb-2 block">01</small>
        Contexte
      </h2>
      <p>
        Dans Dofus, fabriquer un objet n&apos;est rentable que si le prix des ressources reste
        inférieur à celui de l&apos;objet fini, taxe comprise. Ces prix changent en permanence et ne
        sont consultables qu&apos;en jeu, hôtel de vente par hôtel de vente. Comparer quelques
        dizaines de recettes à la main prend un temps considérable, et le résultat est périmé le
        lendemain.
      </p>
      <p>
        Les outils existants reposent sur des prix saisis par les joueurs, donc souvent faux ou
        obsolètes. Je voulais des relevés issus du jeu lui-même, horodatés, et un calcul de marge
        automatique.
      </p>

      <h2 id="construit">
        <small className="label mb-2 block">02</small>
        Ce que j&apos;ai construit
      </h2>
      <p>
        Un collecteur capture la fenêtre du jeu, identifie les objets par reconnaissance d&apos;icônes
        et lit les prix par OCR — aucune lecture de la mémoire du jeu. Les relevés partent vers une
        API qui les historise, puis calcule la rentabilité de chaque craft et de chaque familier.
      </p>
      <p>
        Une page <code>Atelier</code> planifie les ressources à rassembler pour une fabrication. Une
        page <code>Suivis</code> permet de suivre un achat jusqu&apos;à sa revente, pour mesurer le
        bénéfice réellement réalisé plutôt que le bénéfice théorique.
      </p>

      <Figure num={2} wide caption="Crafts les plus rentables, triés par bénéfice mensuel estimé">
        <img src={kamas2} alt="Tableau des crafts les plus rentables" className="w-full" />
      </Figure>

      <Figure num={3} wide caption="Page Suivis : investissements en cours et bénéfices réalisés">
        <img src={kamas1} alt="Tableau de bord Kamas" className="w-full" />
      </Figure>

      <h2 id="architecture">
        <small className="label mb-2 block">03</small>
        Architecture
      </h2>
      <p>
        Le projet est découpé en trois services, pour une raison simple : la capture doit tourner sur
        le PC du joueur, alors que l&apos;API et le front doivent rester disponibles en permanence.
        C&apos;est un découpage producteur/consommateur classique.
      </p>
      <p>
        Le <strong className="font-medium text-heading">Collector</strong> produit les relevés.
        La <strong className="font-medium text-heading">Price API</strong> (FastAPI + PostgreSQL) est
        la source de vérité : elle reçoit les relevés, calcule la rentabilité et sert les données.
        Le <strong className="font-medium text-heading">Front</strong> ne fait que présenter : il ne
        touche jamais directement à la base.
      </p>

      <Figure num={4} wide caption="Architecture, générée depuis projects.js">
        <ArchSchematic project={projet} W={1000} H={430} />
      </Figure>

      <h2 id="decisions">
        <small className="label mb-2 block">04</small>
        Décisions techniques
      </h2>

      <div className="mt-6 grid gap-4">
        <Adr
          titre="OCR plutôt que lecture mémoire"
          contexte="Les prix ne sont lisibles que dans l'interface du jeu."
          decision="Lire l'écran : OCR des prix, reconnaissance des icônes."
          compromis="Sensible aux mises à jour graphiques, mais le client du jeu reste intact."
        />
        {/* TODO Lucas : vérifier que le projet a bien démarré en application locale unique. */}
        <Adr
          titre="Du monolithe local à trois services"
          contexte="Tout tournait dans une seule application sur mon PC : rien n'était consultable quand il était éteint."
          decision="Collector en local, API et base hébergées, site simple client de l'API."
          compromis="Trois déploiements et un contrat d'API à tenir, mais chaque partie évolue seule."
        />
        <Adr
          titre="PostgreSQL plutôt que SQLite"
          contexte="Les relevés s'accumulent et plusieurs services les lisent en même temps."
          decision="PostgreSQL, avec migrations versionnées."
          compromis="Un service de plus à opérer, pour des accès concurrents fiables."
        />
      </div>

      <h2 id="qualite">
        <small className="label mb-2 block">05</small>
        Qualité &amp; déploiement
      </h2>
      <p>
        La partie fragile du projet est la capture : une mise à jour du jeu peut suffire à casser la
        lecture des prix. Les tests et le suivi servent donc d&apos;abord à détecter un relevé faux.
      </p>
      <QualityTable rows={QUALITE} />

      <h2 id="bilan">
        <small className="label mb-2 block">06</small>
        Bilan
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="label mb-3">Ce qui fonctionne</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-[22px] text-text">
            <li>Le découpage en trois services : chaque partie évolue sans casser les autres.</li>
            <li>L&apos;historique des prix, qui rend les calculs de marge crédibles.</li>
          </ul>
        </div>
        <div>
          <p className="label mb-3">Ce que je referais autrement</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-[22px] text-text">
            <li>Mettre en place le jeu de captures de référence dès le début du projet.</li>
            <li>Isoler plus tôt la reconnaissance d&apos;icônes du reste du collecteur.</li>
          </ul>
        </div>
      </div>
    </CaseStudy>
  );
}
