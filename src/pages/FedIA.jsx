// Volontairement généraliste : FedIA est un projet interne SogetiLabs. On décrit le rôle,
// les compétences et les grands choix d'architecture, sans détailler l'implémentation,
// le schéma de données, les services internes ni les environnements.
import ArchSchematic from "../components/ArchSchematic";
import CaseStudy, { Adr, Figure, QualityTable } from "../components/CaseStudy";
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
  ["Rôle", "Développeur full-stack, back et front"],
  ["Contexte", "Stage de fin d'études — SogetiLabs"],
  ["Durée", "6 mois"],
  ["Stack", ".NET · SolidJS · PostgreSQL · Docker · Kubernetes · Azure DevOps"],
];

const QUALITE = [
  ["Tests", "Tests automatisés côté back et côté front, exécutés à chaque intégration."],
  ["Intégration continue", "Un pipeline par service, construit sur un gabarit commun à l'équipe."],
  ["Déploiement", "Services conteneurisés, orchestrés par Kubernetes sur des environnements internes."],
];

export default function FedIA() {
  return (
    <CaseStudy
      project={projet}
      chapo="Une aide au diagnostic sur radiographies pulmonaires, bâtie autour d'un modèle entraîné sans jamais centraliser les données des patients."
      meta={META}
      sections={SECTIONS}
    >
      <h2 id="contexte">
        <small className="label mb-2 block">01</small>
        Contexte
      </h2>
      <p>
        Le diagnostic des pathologies pulmonaires repose presque entièrement sur l&apos;expertise des
        radiologues. Les services d&apos;imagerie sont chargés, et toutes les structures n&apos;ont
        pas un radiologue disponible en continu. FedIA ne remplace pas le médecin : l&apos;application
        lui fournit une première analyse sur laquelle appuyer son diagnostic, et gère autour le suivi
        des patients et les rapports.
      </p>
      <p>
        Le projet est une initiative de recherche appliquée de{" "}
        <a href="https://labs.sogeti.com/project/fedia/" target="_blank" rel="noopener noreferrer">
          SogetiLabs
        </a>
        , encadrée sur le plan scientifique par deux doctorantes. L&apos;équipe réunit des profils
        variés et sa composition évolue au fil des disponibilités. Le travail suit un rythme agile :
        point quotidien, sprints de deux semaines, démonstration en fin de sprint.
      </p>

      <h2 id="construit">
        <small className="label mb-2 block">02</small>
        Ce que j&apos;ai fait
      </h2>
      <p>
        Je suis intervenu des deux côtés de l&apos;application. Côté back, j&apos;ai fait évoluer le
        modèle de données au fil des besoins métier, développé la génération de rapports destinés aux
        médecins, avec une option d&apos;anonymisation, et travaillé sur la gestion des comptes et
        des notifications.
      </p>
      <p>
        Côté front, j&apos;ai complété l&apos;affichage des prédictions et de leur historique, et
        construit une page de paramètres réservée à certains rôles, avant d&apos;en ouvrir la
        consultation à d&apos;autres profils d&apos;utilisateurs.
      </p>
      <p>
        Mon sujet le plus autonome a été l&apos;intégration d&apos;un annuaire public de
        professionnels de santé, menée de bout en bout : comprendre une API externe, valider son
        comportement réel par des appels de test avant d&apos;écrire la moindre ligne, puis concevoir
        et exposer le service correspondant.
      </p>


      <h2 id="architecture">
        <small className="label mb-2 block">03</small>
        Architecture
      </h2>
      <p>
        L&apos;application est découpée en services indépendants : une interface web en application
        monopage, une API REST, et un service dédié à l&apos;analyse des radiographies. Chacun est
        développé, testé et déployé séparément, et communique avec les autres par des interfaces
        bien définies.
      </p>
      <p>
        Le principe fondateur du projet est l&apos;apprentissage fédéré : chaque établissement
        entraîne le modèle sur ses propres données, et seuls les paramètres du modèle circulent. Mon
        périmètre portait sur l&apos;application qui expose et consomme ce modèle, pas sur
        l&apos;entraînement lui-même.
      </p>

      <Figure num={2} wide caption="Architecture, générée depuis projects.js">
        <ArchSchematic project={projet} W={1000} H={400} />
      </Figure>

      <h2 id="decisions">
        <small className="label mb-2 block">04</small>
        Décisions techniques
      </h2>
      <div className="mt-6 grid gap-4">
        <Adr
          titre="Apprentissage fédéré plutôt que centralisation"
          contexte="Les données de santé relèvent du secret médical et du RGPD : les réunir sur un serveur n'est ni légal, ni éthique."
          decision="Entraîner le modèle localement et ne faire circuler que ses paramètres."
          compromis="Entraînement plus complexe à orchestrer, mais aucune donnée patient ne sort de son établissement."
        />
      </div>

      <h2 id="qualite">
        <small className="label mb-2 block">05</small>
        Qualité &amp; déploiement
      </h2>
      <p>
        La couverture de tests est inégale selon les services : correcte côté back, plus légère
        ailleurs. C&apos;est une limite que j&apos;ai identifiée et documentée plutôt que de la
        passer sous silence.
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
            <li>
              Travailler sur une base de code partagée : respecter des conventions plutôt que
              réinventer les siennes.
            </li>
            <li>
              Coordonner des profils très différents, et faire valider ses choix techniques par une
              équipe plutôt que de les prendre seul.
            </li>
            <li>
              Un choix imparfait n&apos;est pas un problème en soi : ce qui compte, c&apos;est de
              l&apos;identifier et de le corriger.
            </li>
          </ul>
        </div>
        <div>
          <p className="label mb-3">Ce que je referais autrement</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-[22px] text-text">
            <li>
              Formaliser les besoins avant de modéliser : plusieurs allers-retours auraient été
              évités.
            </li>
            <li>Rééquilibrer l&apos;effort de test entre les services dès le départ.</li>
          </ul>
        </div>
      </div>
    </CaseStudy>
  );
}
