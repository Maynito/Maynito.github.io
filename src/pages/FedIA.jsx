// TODO Lucas : les sections « Ce que j'ai fait », « Qualité & déploiement » et « Bilan »
// attendent tes contributions réelles — je ne les connais pas. Le reste vient de ton rapport
// de stage. Vérifie avant publication ce que tu as le droit de rendre public : j'ai retiré
// les noms des personnes et je suis resté au niveau de ce qui est public sur labs.sogeti.com.
import ArchSchematic from "../components/ArchSchematic";
import CaseStudy, { Adr, Figure, Placeholder, QualityTable } from "../components/CaseStudy";
import { bySlug } from "../data/projects";

const projet = bySlug("fedia");

const SECTIONS = [
  { id: "contexte", titre: "Contexte" },
  { id: "construit", titre: "Ce que j'ai fait" },
  { id: "architecture", titre: "Architecture" },
  { id: "decisions", titre: "Décisions techniques" },
  { id: "qualite", titre: "Qualité & déploiement" },
  { id: "bilan", titre: "Bilan" },
];

const META = [
  ["Rôle", "Développeur full-stack"],
  ["Contexte", "Stage chez Sogeti — initiative de recherche SogetiLabs"],
  ["Durée", "6 mois"],
  ["Stack", "C# · .NET · SolidJS · TypeScript · Azure DevOps"],
];

const QUALITE = [
  ["Tests", "[À compléter] types de tests écrits et outils utilisés."],
  [
    "Intégration continue",
    "Pipelines Azure DevOps : le code, les versions et les déploiements sont suivis dans le même outil que les tâches du sprint.",
  ],
  ["Déploiement", "[À compléter] environnements et procédure de mise en production."],
];

export default function FedIA() {
  return (
    <CaseStudy
      project={projet}
      chapo="Une aide au diagnostic sur radiographies pulmonaires, entraînée sans jamais centraliser les données des patients."
      meta={META}
      sections={SECTIONS}
    >
      <h2 id="contexte">
        <small className="label mb-2 block">01</small>
        Contexte
      </h2>
      <p>
        Le diagnostic des pathologies pulmonaires à partir de radiographies repose presque
        entièrement sur l&apos;expertise des radiologues. Les services d&apos;imagerie sont chargés,
        la relecture d&apos;un examen est souvent nécessaire, et toutes les structures n&apos;ont pas
        un radiologue spécialisé disponible en continu. L&apos;objectif de FedIA n&apos;est pas de
        remplacer le médecin, mais de lui donner une première analyse rapide sur laquelle appuyer
        son diagnostic.
      </p>
      <p>
        Le projet est une initiative de recherche appliquée de{" "}
        <a href="https://labs.sogeti.com/project/fedia/" target="_blank" rel="noopener noreferrer">
          SogetiLabs
        </a>
        , encadrée par deux doctorantes sur les aspects scientifiques. L&apos;équipe est
        majoritairement composée de consultants en intermission, donc à géométrie variable :
        développeurs, Product Owners, testeurs et architectes s&apos;y relaient au fil des
        disponibilités. Le travail suit un rythme agile, avec un point quotidien, des sprints de deux
        semaines et une démonstration en fin de sprint devant toute l&apos;équipe.
      </p>

      <h2 id="construit">
        <small className="label mb-2 block">02</small>
        Ce que j&apos;ai fait
      </h2>
      <p>
        L&apos;application doit servir plusieurs profils d&apos;utilisateurs : les médecins et
        radiologues, qui consultent les prédictions du modèle en appui de leur diagnostic ; les
        secrétaires médicales, qui gèrent les dossiers et la logistique des examens ; et les
        patients, qui suivent leurs résultats.
      </p>
      <p>
        [À compléter] Mes contributions concrètes : écrans développés côté SolidJS, services .NET,
        et sujets transverses (tests, revues de code, suivi des tâches dans Azure DevOps).
      </p>

      <Figure num={2} wide caption="[À compléter] légende de la capture">
        <Placeholder />
      </Figure>

      <h2 id="architecture">
        <small className="label mb-2 block">03</small>
        Architecture
      </h2>
      <p>
        Un modèle performant a besoin de beaucoup de données, variées. Or les données de santé sont
        protégées par le secret médical et par le RGPD : les réunir sur un serveur unique n&apos;est
        envisageable ni réglementairement, ni éthiquement.
      </p>
      <p>
        L&apos;architecture repose donc sur l&apos;<strong className="font-medium text-heading">apprentissage fédéré</strong> :
        le modèle est entraîné chez chaque établissement, sur ses propres données, et seuls les{" "}
        <strong className="font-medium text-heading">paramètres</strong> du modèle circulent pour
        être agrégés. Aucune radiographie ne sort de son environnement d&apos;origine. Côté
        application, le front en SolidJS consomme une API .NET, qui sert les prédictions et la
        gestion des dossiers.
      </p>

      <Figure num={3} wide caption="Architecture, générée depuis projects.js">
        <ArchSchematic project={projet} W={1000} H={400} />
      </Figure>

      <h2 id="decisions">
        <small className="label mb-2 block">04</small>
        Décisions techniques
      </h2>
      <div className="mt-6 grid gap-4">
        <Adr
          titre="Apprentissage fédéré plutôt que centralisation"
          contexte="Les données de santé relèvent du secret médical et du RGPD : impossible de les regrouper."
          decision="Entraîner le modèle localement dans chaque établissement et ne faire circuler que ses paramètres."
          compromis="Entraînement plus complexe à orchestrer, mais aucune donnée patient ne quitte son établissement."
        />
        <Adr
          titre="Une aide à la décision, pas un diagnostic"
          contexte="La responsabilité du diagnostic reste au médecin, et l'outil s'insère dans un parcours de soin existant."
          decision="Présenter la prédiction comme un appui, consultable aux côtés du dossier patient."
          compromis="Moins spectaculaire qu'une annonce automatique, mais acceptable pour les professionnels de santé."
        />
      </div>

      <h2 id="qualite">
        <small className="label mb-2 block">05</small>
        Qualité &amp; déploiement
      </h2>
      <p>
        Le projet s&apos;appuie sur Azure DevOps pour le suivi des tâches, la gestion des versions et
        les pipelines d&apos;intégration et de déploiement, sur des serveurs distants fournis par
        l&apos;entreprise.
      </p>
      <QualityTable rows={QUALITE} />

      <h2 id="bilan">
        <small className="label mb-2 block">06</small>
        Bilan
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="label mb-3">Ce que j&apos;en retire</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-[22px] text-text">
            <li>Travailler sur un projet existant, dans une équipe dont la composition change.</li>
            <li>[À compléter] ce que la contrainte réglementaire t&apos;a appris côté conception.</li>
          </ul>
        </div>
        <div>
          <p className="label mb-3">Ce que je referais autrement</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-[22px] text-text">
            <li>[À compléter]</li>
            <li>[À compléter]</li>
          </ul>
        </div>
      </div>
    </CaseStudy>
  );
}
