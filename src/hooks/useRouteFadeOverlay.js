import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useRouteFadeOverlay() {
  const location = useLocation();
  const reduce =
    typeof window !== 'undefined' && 'matchMedia' in window
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    if (reduce) return;
    const el = document.getElementById('route-transition-overlay');
    if (!el) return;

    el.style.backgroundColor = 'rgba(0,0,0,0)';
    el.style.transition = 'background-color 180ms ease-out';

    requestAnimationFrame(() => {
      el.style.backgroundColor = 'rgba(0,0,0,0.6)';
      setTimeout(() => {
        el.style.transition = 'background-color 260ms ease-out';
        el.style.backgroundColor = 'rgba(0,0,0,0)';
      }, 120);
    });
  }, [location.pathname, reduce]);
}
