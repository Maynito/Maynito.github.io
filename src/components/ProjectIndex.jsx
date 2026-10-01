import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import ArchSchematic from "./ArchSchematic";
import { projectHref } from "../data/projects";

const GROUPES = [
  ["recent", "Récent"],
  ["previous", "Précédents"],
];

export default function ProjectIndex({ items }) {
  const [active, setActive] = useState(items[0].slug);
  const current = items.find((p) => p.slug === active) ?? items[0];

  return (
    <div className="site grid-site items-start">
      <ul className="col-span-full lg:col-span-7 [&>li:last-child>a]:border-b">
        {GROUPES.map(([groupe, libelle]) => {
          const lignes = items.filter((p) => p.group === groupe);
          if (!lignes.length) return null;
          return (
            <Fragment key={groupe}>
              <li aria-hidden className="label pb-2.5 pt-7 first:pt-0">
                {libelle}
              </li>
              {lignes.map((p) => {
                const href = projectHref(p);
                const interne = href.startsWith("/");
                const Wrapper = interne ? Link : "a";
                const props = interne
                  ? { to: href }
                  : { href, target: "_blank", rel: "noopener noreferrer" };

                return (
                  <li key={p.slug}>
                    <Wrapper
                      {...props}
                      onMouseEnter={() => setActive(p.slug)}
                      onFocus={() => setActive(p.slug)}
                      data-active={active === p.slug || undefined}
                      className="group grid grid-cols-[36px_1fr_auto] gap-x-4 gap-y-1 border-t border-border py-5"
                    >
                      <span className="font-mono text-xs leading-[30px] text-muted transition-colors group-hover:text-heading group-data-active:text-heading">
                        {p.num}
                      </span>
                      <div>
                        <h3 className="text-row text-heading transition-transform duration-400 ease-out-quint motion-safe:group-hover:translate-x-1.5 motion-safe:group-focus-visible:translate-x-1.5">
                          {p.name}
                        </h3>
                        <p className="mt-0.5 text-sm text-muted">{p.summary}</p>
                        <p className="mt-2 font-mono text-xs text-muted">{p.stack.join(" · ")}</p>
                      </div>
                      <span className="flex gap-4 font-mono text-xs leading-[30px] text-muted">
                        <span className="max-sm:hidden">{p.year}</span>
                        <span aria-hidden>↗</span>
                      </span>
                    </Wrapper>
                  </li>
                );
              })}
            </Fragment>
          );
        })}
      </ul>

      <figure
        aria-hidden
        className="sticky top-[calc(var(--hdr)+32px)] col-start-9 col-end-13 hidden lg:block"
      >
        <div
          key={active}
          className="aspect-[16/10] overflow-hidden rounded-xl border border-border animate-[enter_200ms_var(--ease-out-quint)_both]"
        >
          {current.cover ? (
            <img src={current.cover.src} alt="" className="size-full object-cover object-left-top" />
          ) : (
            <ArchSchematic project={current} W={480} H={300} fs={13} variant="horizontal" />
          )}
        </div>
        <figcaption className="mt-3 flex justify-between font-mono text-xs text-muted">
          <span>{current.name}</span>
          <span>{current.cover ? "Capture" : "Schéma généré"}</span>
        </figcaption>
      </figure>
    </div>
  );
}
