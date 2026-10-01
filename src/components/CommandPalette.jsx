import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const EMAIL = "lucas.autret@hotmail.com";

// Comparaison insensible à la casse et aux accents, sans dépendance.
const normaliser = (texte) =>
  texte.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export default function CommandPalette({ ouvrirRef }) {
  const dialogRef = useRef(null);
  const [requete, setRequete] = useState("");
  const [actifBrut, setActif] = useState(0);
  const [annonce, setAnnonce] = useState("");
  const navigate = useNavigate();

  const commandes = useMemo(
    () => [
      { id: "work", groupe: "Naviguer", label: "Work", run: () => navigate("/") },
      { id: "about", groupe: "Naviguer", label: "About", run: () => navigate("/about") },
      { id: "contact", groupe: "Naviguer", label: "Contact", run: () => navigate("/contact") },
      { id: "kamas", groupe: "Naviguer", label: "Projet Kamas", run: () => navigate("/kamas") },
      { id: "fedia", groupe: "Naviguer", label: "Projet FedIA", run: () => navigate("/fedia") },
      {
        id: "copier",
        groupe: "Actions",
        label: "Copier l'adresse email",
        run: async () => {
          try {
            await navigator.clipboard.writeText(EMAIL);
            setAnnonce("Adresse copiée dans le presse-papiers");
          } catch {
            setAnnonce("La copie a échoué");
          }
        },
      },
      {
        id: "theme",
        groupe: "Actions",
        label: "Basculer le thème",
        run: () => document.documentElement.classList.toggle("light"),
      },
      {
        id: "github",
        groupe: "Liens",
        label: "GitHub ↗",
        run: () => window.open("https://github.com/Maynito", "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        groupe: "Liens",
        label: "LinkedIn ↗",
        run: () =>
          window.open(
            "https://www.linkedin.com/in/lucas-autret-4814b6387/",
            "_blank",
            "noopener,noreferrer",
          ),
      },
    ],
    [navigate],
  );

  const resultats = useMemo(
    () => commandes.filter((c) => normaliser(c.label).includes(normaliser(requete))),
    [commandes, requete],
  );

  // Raccourci clavier global
  useEffect(() => {
    function onKey(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const dialog = dialogRef.current;
        if (dialog.open) dialog.close();
        else dialog.showModal();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Permet à la NavBar d'ouvrir la palette au clic
  useEffect(() => {
    if (ouvrirRef) ouvrirRef.current = () => dialogRef.current?.showModal();
  }, [ouvrirRef]);

  // L'index est borné pendant le rendu : pas d'effet, donc pas de rendu en cascade.
  const actif = Math.min(actifBrut, Math.max(resultats.length - 1, 0));

  function executer(commande) {
    dialogRef.current.close();
    commande.run();
  }

  function onKeyDown(event) {
    if (!resultats.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActif((i) => (i + 1) % resultats.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActif((i) => (i - 1 + resultats.length) % resultats.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      executer(resultats[actif]);
    }
  }

  return (
    <>
      <dialog
        ref={dialogRef}
        className="palette"
        aria-label="Palette de commandes"
        onClose={() => setRequete("")}
        onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
      >
        <input
          autoFocus
          value={requete}
          onChange={(event) => {
            setRequete(event.target.value);
            setActif(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={resultats[actif] ? `cmdk-${resultats[actif].id}` : undefined}
          placeholder="Rechercher une page, une action…"
          className="h-12 w-full border-b border-border bg-transparent px-4 text-body text-heading outline-none placeholder:text-muted"
        />
        <ul id="cmdk-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
          {resultats.map((commande, index) => (
            <li
              key={commande.id}
              id={`cmdk-${commande.id}`}
              role="option"
              aria-selected={index === actif}
              onMouseMove={() => setActif(index)}
              onClick={() => executer(commande)}
              className="flex h-10 cursor-pointer items-center justify-between rounded-md px-3 text-body-sm text-text aria-selected:bg-surface-hover aria-selected:text-heading"
            >
              <span>{commande.label}</span>
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted">{commande.groupe}</span>
                <kbd
                  className={`font-mono text-xs text-galaxy transition-opacity duration-120 ${
                    index === actif ? "" : "opacity-0"
                  }`}
                >
                  ↵
                </kbd>
              </span>
            </li>
          ))}
          {!resultats.length && (
            <li className="px-3 py-6 text-center text-body-sm text-muted">Aucun résultat</li>
          )}
        </ul>
      </dialog>

      <span role="status" aria-live="polite" className="sr-only">
        {annonce}
      </span>
    </>
  );
}
