import Reveal from "../components/Reveal";
// Premier jet : les dates et les intitulés sont à vérifier / compléter.
const EXPERIENCES = [
  {
    structure: "Capgemini",
    poste: "Développeur full-stack",
    detail: "Application web de santé · C#/.NET, SolidJS/TypeScript",
    periode: "2026",
  },
  {
    structure: "Université de Bordeaux",
    poste: "Master Génie Logiciel",
    detail: "Conception logicielle, algorithmique, développement web et données",
    periode: "2024 → 2026",
  },
];

const OUTILS = [
  "Python", "C#", ".NET", "TypeScript", "JavaScript",
  "React", "Angular", "SolidJS", "Java", "SQLite",
  "PostgreSQL", "Git", "Docker",
];

export default function About() {
  return (
    <section id="about" className="space-y-16 py-12 sm:py-20 text-text">

      <div className="space-y-6">
        <p className="text-label text-muted uppercase">À propos</p>
        <h1 className="text-page-sm sm:text-page text-heading">
          Développeur full-stack
        </h1>

        <div className="space-y-4 leading-relaxed">
          <p>
            Je viens de terminer le Master Génie Logiciel de l'Université de Bordeaux. J'y ai
            surtout appris à structurer un projet : découper un problème, choisir une
            architecture, et écrire du code que quelqu'un d'autre pourra reprendre.
          </p>
          <p>
            Pendant six mois chez Capgemini, j'ai travaillé sur une application web de santé, en
            C#/.NET côté serveur et SolidJS/TypeScript côté interface. J'y ai découvert ce que
            change le travail en équipe sur un projet existant : les revues de code, les
            contraintes métier, et l'importance de comprendre l'usage avant de coder.
          </p>
          <p>
            À côté, je construis mes propres outils. <span className="text-heading">Kamas</span> en
            est le meilleur exemple : il lit les prix de l'hôtel des ventes de Dofus par
            reconnaissance de texte, puis calcule les crafts les plus rentables. Ce sont ces
            projets-là que je préfère, ceux qui me permettent de créer quelque chose de concret
            et qui créer un cercle vertueux où j'implémente mes besoins et où je découvre les besoins
            au fur et à mesure de mon utilisation.
          </p>
          <p>
            Je recherche un CDI, disponible dès octobre 2026.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <Reveal as="h2" className="text-section text-heading">Parcours</Reveal>
        <ul className="divide-y divide-border border-y border-border">
          {EXPERIENCES.map((experience) => (
            <li key={experience.structure} className="flex items-start justify-between gap-6 py-4">
              <div className="space-y-1">
                <p className="text-heading">{experience.structure}</p>
                <p className="text-sm text-muted">{experience.poste}</p>
                <p className="text-sm text-muted">{experience.detail}</p>
              </div>
              <p className="shrink-0 text-sm text-muted">{experience.periode}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <Reveal as="h2" className="text-section text-heading">Outils</Reveal>
        <p className="leading-relaxed text-muted">
          {OUTILS.join(" · ")}
        </p>
      </div>

    </section>
  );
}
