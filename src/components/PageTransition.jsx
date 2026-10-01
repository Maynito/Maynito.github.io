import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Au tout premier rendu, c'est la cascade du hero qui joue : on ne superpose pas d'animation.
let firstRender = true;

export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [skip] = useState(() => firstRender);

  useEffect(() => { firstRender = false; }, []);
  useLayoutEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div key={pathname} className={skip ? '' : 'animate-page'}>
      {children}
    </div>
  );
}
