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
          reverse ? "lg:col-start-1 lg:col-end-9 lg:bleed-l" : "lg:col-start-5 lg:col-end-13 lg:bleed-r"
        }`}
      >
        <div
          className={`relative aspect-[16/10] overflow-hidden border-y border-border bg-surface shadow-frame max-sm:aspect-auto ${
            reverse ? "lg:rounded-r-xl lg:border-r" : "lg:rounded-l-xl lg:border-l"
          }`}
        >
          {media}
        </div>
        <figcaption
          className={`flex justify-between gap-4 pt-3 font-mono text-xs text-muted max-lg:px-[var(--bleed)] ${
            reverse ? "lg:pl-[var(--bleed)]" : "lg:pr-[var(--bleed)]"
          }`}
        >
          <span>{p.cover?.caption ?? "Architecture, générée depuis projects.js"}</span>
          <span>{p.cover ? "Capture" : "Schéma"}</span>
        </figcaption>
      </Reveal>
    </article>
  );
}
