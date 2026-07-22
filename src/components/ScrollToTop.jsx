import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Resetear el scroll de la ventana principal
    window.scrollTo(0, 0);

    // 2. Si tu contenedor de scroll móvil usa un elemento específico con overflow
    const mobileScrollContainer = document.querySelector('.timeline-mobile-horizontal-scroll');
    if (mobileScrollContainer) {
      mobileScrollContainer.scrollLeft = 0;
    }
  }, [pathname]);

  return null;
}