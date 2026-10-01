import profile from "../assets/profile.jpg";
import Reveal from "../components/Reveal";

// TODO Lucas : vérifier les dates et l'intitulé exact du poste chez Capgemini.
const PARCOURS = [
  ["2026", "Capgemini — Développeur full-stack · application web de santé (C#/.NET, SolidJS)"],
  ["2024 → 2026", "Master Génie Logiciel — Université de Bordeaux"],
];

const OUTILS = [
  ["Langages", "Python · C# · TypeScript · JavaScript · Java"],
  ["Front", "React · SolidJS · Angular · Tailwind CSS"],
  ["Back", "FastAPI · .NET · Spring Boot"],
  ["Données", "PostgreSQL · SQLite · Hadoop"],
  ["Outils", "Git · Docker · GitHub Actions"],
];

export default function About() {
  return (
    <div className="site grid-site items-start py-section">
      <figure className="col-span-full lg:sticky lg:top-[calc(var(--hdr)+32px)] lg:col-span-4">
        <img
          src={profile}
          alt="Portrait de Lucas Autret"
          className="w-full rounded-xl border border-border bg-surface object-cover max-lg:aspect-square lg:aspect-[4/5]"
        />
      </figure>

      <div className="col-span-full mt-10 lg:col-start-6 lg:col-end-13 lg:mt-0">
        <p className="label">À propos</p>
        <h1 className="mt-4 text-h2 text-heading">Développeur full-stack</h1>

        <div className="prose mt-8 max-w-[40em] space-y-5 text-article text-text">
          <p>
            Je viens de terminer le Master Génie Logiciel de l&apos;Université de Bordeaux. J&apos;y ai
            surtout appris à structurer un projet : découper un problème, choisir une architecture,
            et écrire du code que quelqu&apos;un d&apos;autre pourra reprendre.
          </p>
          <p>
            Pendant six mois chez Capgemini, j&apos;ai travaillé sur une application web de santé, en
            C#/.NET côté serveur et SolidJS/TypeScript côté interface. J&apos;y ai découvert ce que
            change le travail en équipe sur un projet existant : les revues de code, les contraintes
            métier, et l&apos;importance de comprendre l&apos;usage avant de coder.
          </p>
          <p>
            À côté, je construis mes propres outils. Kamas en est le meilleur exemple : il lit les
            prix de l&apos;hôtel des ventes de Dofus par reconnaissance de texte, puis calcule les
            crafts les plus rentables. Ce sont ces projets-là que je préfère, ceux qui me permettent
            de créer quelque chose de concret et d&apos;en découvrir les besoins au fil de l&apos;usage.
          </p>
        </div>

        <Reveal as="section" className="mt-[clamp(3rem,5vw,4.5rem)]">
          <h2 className="label">Parcours</h2>
          <dl className="mt-4 border-t border-border">
            {PARCOURS.map(([date, texte]) => (
              <div key={date} className="grid grid-cols-[104px_1fr] gap-4 border-b border-border py-3">
                <dt className="label leading-[22px]">{date}</dt>
                <dd className="text-sm leading-[22px] text-text">{texte}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal as="section" className="mt-[clamp(3rem,5vw,4.5rem)]">
          <h2 className="label">Outils</h2>
          <dl className="mt-4 border-t border-border">
            {OUTILS.map(([cle, valeur]) => (
              <div key={cle} className="grid grid-cols-[104px_1fr] gap-4 border-b border-border py-3">
                <dt className="label leading-[22px]">{cle}</dt>
                <dd className="text-sm leading-[22px] text-text">{valeur}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>
  );
}
