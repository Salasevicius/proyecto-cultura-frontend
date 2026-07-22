import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData } from './TimelineConstants';
import LazyImage from './LazyImage';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineMobile({ onOpenHito }) {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.mobile-hito-snap-card');

      cards.forEach((card, i) => {
        // 1. Transición cromática de fondo existente
        const targetColor = i === 0 ? "#050507" : timelineData[i - 1]?.color;

        ScrollTrigger.create({
          scroller: ".timeline-mobile-horizontal-scroll",
          trigger: card,
          horizontal: true,
          start: "left 40%", 
          end: "right 40%",
          onToggle: (self) => {
            if (self.isActive && targetColor) {
              gsap.to('.mobile-bg-layer', {
                backgroundColor: targetColor,
                duration: 0.8,
                ease: "power2.inOut",
                overwrite: "auto"
              });
            }
          }
        });

        // 2. ANIMACIÓN DEL TRACEDO FLUVIAL SVG
        const path = card.querySelector('.river-path');
        if (path) {
          const pathLength = path.getTotalLength();

          // Estado inicial: Ocultar el trazo desplazando el offset al largo total
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });

          // Animación acoplada al scroll horizontal (Scrub)
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              scroller: ".timeline-mobile-horizontal-scroll",
              trigger: card,
              horizontal: true,
              start: "left 85%",
              end: "right 15%",
              scrub: 1, // Suavizado fluido mientras se desliza
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="timeline-mobile-wrapper" ref={containerRef}>
      <div className="mobile-bg-layer"></div>

      <div className="timeline-mobile-horizontal-scroll">
        
        {/* Intro Móvil */}
        <div className="mobile-hito-snap-card mobile-intro-center">
          <span className="eyebrow">Crónica de Rosario</span>
          <h2 className="title">Línea del Tiempo</h2>
          <div className="scroll-hint-v">
            Arrastra hacia la izquierda <i className="fa-solid fa-arrow-right-long ml-1 animate-pulse"></i>
          </div>
        </div>

        {/* Tarjetas de Hito */}
        {timelineData.map((hito, i) => (
          <article key={i} className="mobile-hito-snap-card">
            
            {/* 1. Monolito del Año */}
            <div className="mobile-date-blob">{hito.year}</div>

            {/* 2. Guía fluvial SVG más lineal y atenuada */}
<div className="river-svg-track">
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <path 
      className="river-path"
      /* Trazado con ondas muy suaves (desviación de apenas 3-4% en Y) */
      d="M 0,50 Q 25,47 50,50 T 100,48" 
      fill="none" 
      stroke="rgba(226, 180, 100, 0.45)" 
      strokeWidth="1.2" 
    />
  </svg>
</div>

            {/* 3. Contenido de la Tarjeta */}
            <div className="mobile-card-inner">
              <div className="mobile-visual">
                <LazyImage src={hito.img} alt={hito.title} />
                <div className="visual-overlay"></div>
              </div>
              <div className="mobile-text">
                <span className="mobile-tag">{hito.tag}</span>
                <h3>{hito.title}</h3>
                <p>{hito.desc}</p>
                <button className="mobile-explore-btn" onClick={() => onOpenHito(hito)}>
                  Detalles y Multimedia <i className="fa-solid fa-plus ml-1"></i>
                </button>
              </div>
            </div>

          </article>
        ))}

        {/* Cierre Móvil */}
        <div className="mobile-hito-snap-card mobile-intro-center">
          <p className="font-serif text-2xl" style={{ color: 'var(--gold-primary)' }}>
            El hilo de la historia continúa...
          </p>
        </div>

      </div>
    </div>
  );
}