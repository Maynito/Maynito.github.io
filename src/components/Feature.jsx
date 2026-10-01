import { Link } from "react-router-dom";

import ArchSchematic from "./ArchSchematic";
import Reveal from "./Reveal";

export default function Feature({ p, index, reverse = false }) {
  const media = p.cover ? (
    <img
      src={p.cover.src}
      alt={p.cover.alt}
      width="1824"
      height="1140"
      className="size-full object-cover object-left-top transition-transform duration-[600ms] ease-out-quint motion-safe:group-hover:scale-[1.02]"
    />
  ) : (
    <ArchSchematic project={p} />
  );

  const meta = [
    ["Rôle", p.role],
    ["Stack", p.stack.join(" · ")],
    ["Type", p.type],
  ].filter(([, valeur]) => valeur);

  return (
    <article className="group site grid-site items-center gap-y-7 [&+&]:mt-[clamp(5rem,9vw,10rem)]">
      <Reveal
        className={`col-span-full sm:col-span-6 lg:row-start-1 ${
          reverse ? "lg:col-start-9 lg:col-end-13" : "lg:col-start-1 lg:col-end-5"
        }`}
      >
        <p className="label flex gap-3">
          <span>{String(index).padStart(2, "0")}</span>
          <span>Étude de cas</span>
        </p>

        <h3 className="my-3.5 text-project text-heading">
          <Link to={`/${p.slug}`}>{p.name}</Link>
        </h3>

        <p className="text-base leading-[26px] text-text">{p.summary}</p>

        <dl className="mt-6 border-t border-border">
          {meta.map(([cle, valeur]) => (
            <div key={cle} className="grid grid-cols-[88px_1fr] gap-4 border-b border-border py-2.5">
              <dt className="label leading-[22px]">{cle}</dt>
              <dd className="text-[13px] leading-[22px] text-text">{valeur}</dd>
            </div>
          ))}
        </dl>

        <Link
          to={`/${p.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-heading"
        >
          Lire l&apos;étude de cas
          <span aria-hidden className="transition-transform duration-240 ease-out-quint group-hover:translate-x-[3px]">
            →
          </span>
        </Link>
      </Reveal>

      <Reveal
        as="figure"
        col={1}
        className={`max-lg:bleed-x col-span-full lg:row-start-1 ${
          reverse ? "lg:col-start-1 lg:col-end-8" : "lg:col-start-6 lg:col-end-13"
        }`}
      >
        <Link
          to={`/${p.slug}`}
          tabIndex={-1}
          aria-label={`Lire l'étude de cas : ${p.name}`}
          className="group/media relative block aspect-[16/10] overflow-hidden border-y border-border bg-surface shadow-frame transition-colors duration-240 ease-out-quint group-hover:border-border-strong max-sm:aspect-auto lg:rounded-xl lg:border-x"
        >
          {media}

          {/* Voile + pastille : signalent que le visuel est cliquable */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-bg/35 opacity-0 transition-opacity duration-240 ease-out-quint group-hover:opacity-100"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg/85 px-3.5 py-2 text-sm font-medium text-heading opacity-0 backdrop-blur-sm transition duration-280 ease-out-quint group-hover:opacity-100 motion-safe:translate-y-2 motion-safe:group-hover:translate-y-0"
          >
            Lire l&apos;étude de cas
            <span className="transition-transform duration-280 ease-out-quint group-hover:translate-x-0.5">→</span>
          </span>
        </Link>
        <figcaption
          className="flex justify-between gap-4 pt-3 font-mono text-xs text-muted max-lg:px-[var(--bleed)]"
        >
          <span>{p.cover?.caption ?? "Architecture, générée depuis projects.js"}</span>
          <span>{p.cover ? "Capture" : "Schéma"}</span>
        </figcaption>
      </Reveal>
    </article>
  );
}
