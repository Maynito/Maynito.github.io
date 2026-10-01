/* global __BUILD__ */

const REPO = "https://github.com/Maynito/Maynito.github.io";

export default function BuildStamp() {
  const build = __BUILD__;
  const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(build.date));
  const court = build.sha.slice(0, 7);

  return (
    <p className="font-mono text-xs tabular-nums text-muted">
      v{build.version}
      {build.sha !== "inconnu" && (
        <>
          {" · "}
          <a
            href={`${REPO}/commit/${build.sha}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-galaxy [--underline:var(--galaxy)]"
          >
            {court}
          </a>
        </>
      )}
      {" · déployé le "}
      {date}
    </p>
  );
}
