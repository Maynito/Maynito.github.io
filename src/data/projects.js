import kamasCover from "../assets/kamas-cover.jpg";

// Source unique des projets. `layers` alimente le schéma d'architecture généré
// (2 à 4 couches, 1 à 3 nœuds, libellés de 20 caractères maximum).
// TODO Lucas : les couches de FedIA, TaskForge, Paint App et PLÉ sont des hypothèses, à corriger.
export const projects = [
  {
    slug: "kamas",
    name: "Kamas",
    num: "01",
    featured: true,
    group: "recent",
    year: "2026",
    summary:
      "Outil de suivi des prix Dofus qui lit les données du jeu par OCR et repère les crafts les plus rentables.",
    role: "Conception et développement, seul",
    type: "Projet personnel",
    stack: ["Python", "FastAPI", "PostgreSQL", "Tesseract", "Docker"],
    cover: {
      src: kamasCover,
      alt: "Tableau de bord Kamas : bénéfices et suivis d'achats",
      caption: "Page Suivis : investissements en cours et bénéfices réalisés",
    },
    layers: [
      { label: "Collector", nodes: ["Capture écran", "Tesseract OCR"] },
      { label: "API", nodes: ["FastAPI", "Calcul crafts"] },
      { label: "Données", nodes: ["PostgreSQL"] },
      { label: "Front", nodes: ["Interface web"] },
    ],
    infra: ["Docker", "OpenAPI"],
  },
  {
    slug: "fedia",
    name: "FedIA",
    num: "02",
    featured: true,
    group: "recent",
    year: "2026",
    summary: "Plateforme d'analyse de radiographies médicales, réalisée chez Capgemini.",
    role: "Développeur full-stack",
    type: "Projet en entreprise",
    stack: ["C#", ".NET", "SolidJS", "TypeScript"],
    cover: null,
    layers: [
      { label: "Front", nodes: ["SolidJS", "TypeScript"] },
      { label: "API", nodes: [".NET"] },
      { label: "Traitement", nodes: ["Analyse d'images"] },
    ],
    infra: [],
  },
  {
    slug: "smokelab",
    name: "SmokeLab",
    num: "03",
    featured: false,
    group: "recent",
    year: "2026",
    href: "https://github.com/Maynito/smokelab",
    summary: "Outil de visualisation et de stratégie pour Counter-Strike 2.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    cover: null,
    layers: [
      { label: "Client", nodes: ["React", "Tailwind CSS"] },
      { label: "Back-end", nodes: ["Supabase"] },
      { label: "Auth", nodes: ["Steam OpenID"] },
    ],
  },
  {
    slug: "taskforge",
    name: "TaskForge",
    num: "04",
    featured: false,
    group: "previous",
    year: "2025",
    href: "https://github.com/Maynito/TaskForge",
    summary: "Plateforme de gestion de projet agile : sprints, Kanban, authentification JWT.",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
    cover: null,
    layers: [
      { label: "Client", nodes: ["Angular", "TypeScript"] },
      { label: "API", nodes: ["Spring Boot", "JWT"] },
      { label: "Données", nodes: ["PostgreSQL"] },
    ],
    infra: ["Docker", "OpenAPI"],
  },
  {
    slug: "paint",
    name: "Paint App",
    num: "05",
    featured: false,
    group: "previous",
    year: "2025",
    href: "https://github.com/Maynito/projet-paint",
    summary: "Application de dessin en Java, support d'apprentissage des design patterns.",
    stack: ["Java", "Design patterns"],
    cover: null,
    layers: [
      { label: "Interface", nodes: ["Swing"] },
      { label: "Domaine", nodes: ["Formes", "Commandes"] },
      { label: "Patterns", nodes: ["Composite", "Command"] },
    ],
  },
  {
    slug: "ple",
    name: "Programmation Large Échelle",
    num: "06",
    featured: false,
    group: "previous",
    year: "2025",
    href: "https://github.com/Decymax/ProjetPLE",
    summary: "Traitement distribué de données Clash Royale avec MapReduce sur cluster Hadoop.",
    stack: ["Java", "Python", "Hadoop", "HDFS"],
    cover: null,
    layers: [
      { label: "Entrée", nodes: ["Jeux de données"] },
      { label: "Traitement", nodes: ["MapReduce", "Hadoop"] },
      { label: "Stockage", nodes: ["HDFS"] },
    ],
  },
];

export const featured = projects.filter((p) => p.featured);
export const indexed = projects.filter((p) => !p.featured);
export const bySlug = (slug) => projects.find((p) => p.slug === slug);

// Lien d'un projet : étude de cas interne si elle existe, sinon dépôt externe.
export const projectHref = (p) => (p.featured ? `/${p.slug}` : p.href);
