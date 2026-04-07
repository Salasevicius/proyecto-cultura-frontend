import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './ArticleSlider.css';
import ArticleCard from './ArticleCard';

const ArticleSlider = ({ noticias, loading, isLoggedIn, fetchData, handleEditClick }) => {
  const sliderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Estado para el Dot Nav
  const [activeIndex, setActiveIndex] = useState(0);
  
  const dragData = useRef({
    startX: 0,
    scrollLeft: 0,
    lastX: 0,
    velocity: 0
  });

  const location = useLocation();
  const isFiltered = location.search.length > 0;

  // --- 1. TRIPLICACIÓN CON IDs ÚNICOS (Mantenida) ---
  const noticiasInfinitas = noticias && noticias.length > 0 
    ? [
        ...noticias.map(n => ({ ...n, uniqueKey: `set1-${n._id}` })),
        ...noticias.map(n => ({ ...n, uniqueKey: `set2-${n._id}` })),
        ...noticias.map(n => ({ ...n, uniqueKey: `set3-${n._id}` }))
      ] 
    : [];

  const updateCardScales = useCallback(() => {
    if (!sliderRef.current || noticias.length === 0) return;
    const track = sliderRef.current;
    const cards = track.querySelectorAll('.slider-item');
    const trackCenter = track.offsetWidth / 2;
    const currentScroll = track.scrollLeft;

    // --- LÓGICA DE DOT NAV (Sincronizada con el set central) ---
    const singleSetWidth = track.scrollWidth / 3;
    const cardWidth = cards[0]?.offsetWidth || 340;
    const relativeScroll = (currentScroll - singleSetWidth + (cardWidth / 2));
    const newIndex = Math.floor(relativeScroll / cardWidth) % noticias.length;
    
    if (newIndex >= 0 && newIndex < noticias.length) {
      setActiveIndex(newIndex);
    }

    // Loop Infinito Original (Mantenido)
    if (currentScroll <= 10) {
      track.scrollLeft = singleSetWidth;
    } else if (currentScroll >= (singleSetWidth * 2) - 10) {
      track.scrollLeft = singleSetWidth;
    }

    // --- DETECCIÓN DE MÓVIL PARA BYPASS DE EFECTO 3D ---
    const isMobile = window.innerWidth <= 768;

    cards.forEach((card) => {
      if (isMobile) {
        // En móvil: Limpiamos transformaciones para que sea plano y legible (The New Yorker Style)
        card.style.transform = `scale(1) translateZ(0) rotateY(0)`;
        card.style.opacity = '1';
        card.style.zIndex = '1';
        card.style.transition = 'none'; 
      } else {
        // En Desktop: Tu efecto 3D original de autor (Mantenido)
        const cardCenter = card.offsetLeft + card.offsetWidth / 2 - currentScroll;
        const distanceFromCenter = cardCenter - trackCenter;
        const absDistance = Math.abs(distanceFromCenter);

        const scale = Math.max(0.80, 1.12 - (absDistance / 600));
        const translateZ = Math.max(-150, 100 - (absDistance / 3));
        const rotateY = (distanceFromCenter / 35) * -1;
        const opacity = Math.max(0.6, 1.1 - (absDistance / 1000));

        card.style.transform = `scale(${scale}) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        card.style.opacity = opacity;
        card.style.zIndex = Math.round(100 - absDistance / 10);
      }
    });
  }, [noticias.length]);

  const smoothScrollTo = (target) => {
    if (!sliderRef.current) return;
    gsap.killTweensOf(sliderRef.current);
    gsap.to(sliderRef.current, {
      scrollLeft: target,
      duration: 1.4,
      ease: "power2.inOut",
      overwrite: true,
      onUpdate: updateCardScales
    });
  };

  const handleCardClick = (e) => {
    if (Math.abs(dragData.current.velocity) > 3) return;
    const card = e.currentTarget;
    const track = sliderRef.current;
    const targetScroll = (card.offsetLeft + card.offsetWidth / 2) - (track.offsetWidth / 2);
    smoothScrollTo(targetScroll);
  };

  const onMouseDown = (e) => {
    gsap.killTweensOf(sliderRef.current); 
    setIsDragging(true);
    dragData.current.startX = e.pageX - sliderRef.current.offsetLeft;
    dragData.current.scrollLeft = sliderRef.current.scrollLeft;
    dragData.current.lastX = e.pageX;
    dragData.current.velocity = 0;
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging || !sliderRef.current) return;
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - dragData.current.startX) * 1.4; 
      dragData.current.velocity = e.pageX - dragData.current.lastX;
      dragData.current.lastX = e.pageX;
      sliderRef.current.scrollLeft = dragData.current.scrollLeft - walk;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      gsap.to(sliderRef.current, {
        scrollLeft: sliderRef.current.scrollLeft - (dragData.current.velocity * 12),
        duration: 0.9,
        ease: "power2.out",
        onUpdate: updateCardScales,
        overwrite: "auto"
      });
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, updateCardScales]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    const trigger = document.getElementById('anchor-articulos');
    if (trigger) observer.observe(trigger);

    if (noticias.length > 0) {
      const timer = setTimeout(() => {
        if (sliderRef.current) {
          const track = sliderRef.current;
          const cards = track.querySelectorAll('.slider-item');
          const firstCardSet2 = cards[noticias.length]; 
          if (firstCardSet2) {
            const centerPoint = (firstCardSet2.offsetLeft + firstCardSet2.offsetWidth / 2) - (track.offsetWidth / 2);
            track.scrollLeft = centerPoint;
          } else {
            track.scrollLeft = track.scrollWidth / 3;
          }
          updateCardScales();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
    return () => observer.disconnect();
  }, [noticias, updateCardScales]);

  if (loading) return <div className="slider-loader">Cargando crónicas...</div>;

  return (
    <div className={`slider-container-main ${isFiltered ? 'is-filtered' : 'is-home'} ${isVisible ? 'is-awake' : 'is-sleeping'}`}>
      <div className="slider-wrapper">
        <button className="nav-btn left" onClick={() => smoothScrollTo(sliderRef.current.scrollLeft - 270)}>‹</button>
        <div 
          className={`slider-track ${isDragging ? 'grabbing' : ''}`}
          ref={sliderRef}
          onScroll={updateCardScales}
          onMouseDown={onMouseDown}
        >
          {noticiasInfinitas.map((n) => (
            <div key={n.uniqueKey} className="slider-item" onClick={handleCardClick}>
              <ArticleCard noticia={n} isLoggedIn={isLoggedIn} onActionSuccess={fetchData} onEditClick={handleEditClick} />
            </div>
          ))}
        </div>
        <button className="nav-btn right" onClick={() => smoothScrollTo(sliderRef.current.scrollLeft + 270)}>›</button>

        {/* DOT NAV MÓVIL */}
        <div className="dots-container-mobile">
          {noticias.map((_, idx) => (
            <div 
              key={idx} 
              className={`slider-dot ${activeIndex === idx ? 'is-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleSlider;