// TODO Lucas : tous les textes marqués [À compléter] sont des placeholders.
// FedIA a été réalisé chez Capgemini : vérifie ce que tu as le droit de publier
// avant de détailler quoi que ce soit (reste au niveau de ce qui est public sur
// labs.sogeti.com, pas de nom de client, pas de donnée patient, pas d'archi interne).
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
  ["Contexte", "Capgemini — équipe produit"],
  ["Durée", "6 mois"],
  ["Stack", "C# · .NET · SolidJS · TypeScript"],
];

const QUALITE = [
  ["Tests", "[À compléter] types de tests écrits et outils utilisés."],
  ["Intégration continue", "[À compléter] chaîne de build et de vérification."],
  ["Déploiement", "[À compléter] environnement et procédure de mise en production."],
];

export default function FedIA() {
  return (
    <CaseStudy
      project={projet}
      chapo="[À compléter] Une à deux phrases : à qui s'adresse FedIA, quel problème la plateforme résout, et ce que la solution apporte."
      meta={META}
      sections={SECTIONS}
    >
      <h2 id="contexte">
        <small className="label mb-2 block">01</small>
        Contexte
      </h2>
      <p>
        [À compléter] Qui utilise la plateforme, quel problème elle traite, pourquoi l&apos;existant
        ne suffisait pas. Reste au niveau de ce qui est déjà public sur{" "}
        <a href="https://labs.sogeti.com/project/fedia/" target="_blank" rel="noopener noreferrer">
          labs.sogeti.com
        </a>
        .
      </p>

      <h2 id="construit">
        <small className="label mb-2 block">02</small>
        Ce que j&apos;ai fait
      </h2>
      <p>
        [À compléter] Tes contributions concrètes, en compétences et en technologies : écrans
        développés côté SolidJS, services .NET, sujets transverses (tests, revues de code, suivi des
        demandes).
      </p>

      <Figure num={2} wide ratio="auto" caption="[À compléter] légende de la capture">
        <Placeholder />
      </Figure>

      <h2 id="architecture">
        <small className="label mb-2 block">03</small>
        Architecture
      </h2>
      <p>
        [À compléter] Une phrase par flèche du schéma : ce que fait chaque couche et pourquoi elle
        est séparée des autres. Corrige les couches dans <code>projects.js</code> si elles ne
        correspondent pas.
      </p>

      <Figure num={3} wide ratio="auto" caption="Architecture, générée depuis projects.js">
        <ArchSchematic project={projet} W={1000} H={400} />
      </Figure>

      <h2 id="decisions">
        <small className="label mb-2 block">04</small>
        Décisions techniques
      </h2>
      <div className="mt-6 grid gap-4">
        <Adr
          titre="[À compléter] une décision marquante"
          contexte="[À compléter] la contrainte de départ."
          decision="[À compléter] ce qui a été choisi."
          compromis="[À compléter] ce que ce choix a coûté."
        />
        <Adr
          titre="[À compléter] une deuxième décision"
          contexte="[À compléter]"
          decision="[À compléter]"
          compromis="[À compléter]"
        />
      </div>

      <h2 id="qualite">
        <small className="label mb-2 block">05</small>
        Qualité &amp; déploiement
      </h2>
      <QualityTable rows={QUALITE} />

      <h2 id="bilan">
        <small className="label mb-2 block">06</small>
        Bilan
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="label mb-3">Ce que j&apos;en retire</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-[22px] text-text">
            <li>[À compléter]</li>
            <li>[À compléter]</li>
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
