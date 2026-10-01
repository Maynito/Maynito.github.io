/**
 * Trame de points très discrète, posée derrière le contenu pour donner du volume.
 * Le masque radial la fait disparaître avant d'atteindre le texte.
 * Le parent doit être en `relative overflow-hidden`.
 */
export default function DotGrid({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border-strong)_1px,transparent_1px)] bg-[length:24px_24px] opacity-60 [mask-image:radial-gradient(120%_90%_at_70%_15%,#000_0%,transparent_75%)] ${className}`}
    />
  );
}
