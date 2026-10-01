// TODO Lucas : tous les textes de cette page sont des placeholders à remplir — ne pas publier en l'état
// Rappel : projet réalisé en entreprise. Vérifier ce qui peut être publié avant mise en ligne
// (pas de nom de client, pas de données patients, pas de détail interne).

import { LuArrowUpRight, LuCode, LuServer, LuTestTube } from "react-icons/lu";
import Reveal from "../components/Reveal";

const STACK = [
  "C#", ".NET", "SolidJS", "TypeScript",
  // TODO Lucas : compléter / corriger la stack réellement utilisée
];

// TODO Lucas : remplacer chaque valeur par la réalité du projet
const CONTEXTE = [
  { label: "Cadre", valeur: "[À compléter] Stage / alternance de 6 mois chez Capgemini" },
  { label: "Durée", valeur: "[À compléter] 6 mois" },
  { label: "Rôle", valeur: "[À compléter] Développeur full-stack au sein d'une équipe de N personnes" },
];

// TODO Lucas : décrire 3 à 5 contributions concrètes et vérifiables (verbe d'action + résultat)
const CONTRIBUTIONS = [
  {
    icon: LuCode,
    titre: "[À compléter] Interface",
    detail:
      "[À compléter] Décrire une contribution côté front SolidJS/TypeScript : écran développé, composant, interaction.",
  },
  {
    icon: LuServer,
    titre: "[À compléter] Back-end",
    detail:
      "[À compléter] Décrire une contribution côté API C#/.NET : endpoint, service, traitement de données.",
  },
  {
    icon: LuTestTube,
    titre: "[À compléter] Fiabilité",
    detail:
      "[À compléter] Décrire une contribution liée à la qualité : tests, correction de bug, refactoring.",
  },
];

// TODO Lucas : ne garder que les pratiques réellement en place sur le projet
const QUALITE = [
  { label: "Tests", valeur: "[À compléter] Type de tests écrits et outils utilisés." },
  { label: "Intégration continue", valeur: "[À compléter] Pipeline CI et étapes automatisées." },
  { label: "Conteneurisation", valeur: "[À compléter] Usage de Docker en développement et/ou au déploiement." },
];

// TODO Lucas : remplacer ces emplacements par de vraies captures si la publication est autorisée,
// sinon supprimer complètement le bloc "Aperçu".
const APERCUS = [
  "Capture à ajouter",
  "Capture à ajouter",
  "Capture à ajouter",
];

export default function FedIA() {
  return (
    <section id="fedia" className="space-y-16 py-12 sm:py-20 text-text">

      <div className="space-y-6">
        <p className="text-label text-muted uppercase">Étude de cas</p>
        <h1 className="text-page-sm sm:text-page text-heading">
          FedIA — analyse de radiographies médicales
        </h1>
        <p className="max-w-2xl font-mono text-xs text-muted">
          {STACK.join(" · ")}
        </p>
      </div>

      <div className="space-y-6">
        <Reveal as="h2" className="text-section text-heading">Aperçu</Reveal>
        <ul className="grid gap-4 sm:grid-cols-3">
          {APERCUS.map((legende, index) => (
            <li
              key={`apercu-${index}`}
              className="flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-border"
            >
              <p className="text-xs text-muted">{legende}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <Reveal as="h2" className="text-section text-heading">Contexte &amp; rôle</Reveal>
        <p className="max-w-[60ch] text-body text-muted">
          [À compléter] Résumer en deux phrases le cadre de la mission, l&apos;équipe dans laquelle
          le projet a été mené et la place occupée dans cette équipe.
        </p>

        <ul className="grid gap-4 sm:grid-cols-3">
          {CONTEXTE.map((item) => (
            <li key={item.label} className="space-y-2 rounded-xl border border-border p-4">
              <p className="text-heading">{item.label}</p>
              <p className="text-body-sm text-muted">{item.valeur}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <Reveal as="h2" className="text-section text-heading">Le projet</Reveal>
        <div className="max-w-2xl space-y-4 leading-relaxed">
          <p>
            [À compléter] <span className="text-heading">Le problème</span> : expliquer le besoin
            auquel la plateforme répond, en restant au niveau du domaine (analyse de
            radiographies médicales) et sans détail confidentiel.
          </p>
          <p>
            [À compléter] <span className="text-heading">La solution</span> : décrire ce que fait la
            plateforme, les grandes briques et ce qu&apos;elle apporte à ses utilisateurs.
          </p>
          <p>
            [À compléter] Préciser éventuellement les contraintes techniques marquantes du projet
            (volumétrie, performance, compatibilité) sans exposer d&apos;information interne.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <Reveal as="h2" className="text-section text-heading">Ce que j&apos;ai fait</Reveal>
        <p className="max-w-[60ch] text-body text-muted">
          [À compléter] Introduire en une phrase le périmètre confié et la façon de travailler de
          l&apos;équipe.
        </p>

        <ul className="grid gap-4 sm:grid-cols-3">
          {CONTRIBUTIONS.map((item) => (
            <li key={item.titre} className="space-y-2 rounded-xl border border-border p-4">
              <item.icon className="size-5 text-muted" />
              <p className="text-heading">{item.titre}</p>
              <p className="text-body-sm text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <Reveal as="h2" className="text-section text-heading">Qualité &amp; déploiement</Reveal>
        <p className="max-w-[60ch] text-body text-muted">
          [À compléter] Résumer en une phrase la façon dont la qualité était assurée et comment le
          projet était livré.
        </p>

        <ul className="max-w-2xl divide-y divide-border rounded-xl border border-border">
          {QUALITE.map((item) => (
            <li key={item.label} className="space-y-1 p-4">
              <p className="text-heading">{item.label}</p>
              <p className="text-body-sm text-muted">{item.valeur}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <Reveal as="h2" className="text-section text-heading">En savoir plus</Reveal>
        <p className="max-w-[60ch] text-body text-muted">
          Le projet est présenté publiquement sur le site de Sogeti Labs.
        </p>
        <a
          href="https://labs.sogeti.com/project/fedia/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-heading"
        >
          Voir la page du projet FedIA
          <LuArrowUpRight className="size-4 text-muted" />
        </a>
      </div>

    </section>
  );
}
