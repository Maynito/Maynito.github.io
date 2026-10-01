import { useEffect, useRef } from 'react';

// Un seul IntersectionObserver partagé par toute l'application.
let io;
function observer() {
  io ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
  );
  return io;
}

/**
 * Révèle son contenu (opacité + légère montée) à son entrée dans l'écran, une seule fois.
 * `col` : index de colonne dans une grille (décale la colonne de droite de 80ms).
 * `delay` : décalage explicite en ms.
 */
export default function Reveal({ as: Tag = 'div', col, delay, style, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observer().observe(el);
    return () => observer().unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-reveal-col={col}
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style}
      {...props}
    />
  );
}
