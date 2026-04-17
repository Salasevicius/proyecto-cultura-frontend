import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData } from './TimelineConstants';
import LazyImage from './LazyImage';


gsap.registerPlugin(ScrollTrigger);

export default function TimelineMobile() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.mobile-hito-card');
      
      cards.forEach((card, i) => {
        const targetColor = timelineData[i]?.color || "#050507";

        ScrollTrigger.create({
          trigger: card,
          start: "top 60%", 
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) {
              // CAMBIO: Ahora animamos la capa de fondo, no el wrapper
              gsap.to('.mobile-bg-layer', {
                backgroundColor: targetColor,
                duration: 0.8,
                ease: "power1.inOut",
                overwrite: "auto"
              });
            }
          }
        });

        gsap.fromTo(card, 
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 75%",
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="timeline-mobile-wrapper" ref={containerRef}>
      {/* CAPA DE FONDO DEDICADA PARA GSAP */}
      <div className="mobile-bg-layer"></div>

      <header className="mobile-timeline-header">
        <span className="eyebrow">Crónica de Rosario</span>
        <h2 className="title">Línea del Tiempo</h2>
        <div className="scroll-hint-v">↓ Desliza para explorar ↓</div>
      </header>

      <div className="mobile-timeline-path">
        {timelineData.map((hito, i) => (
          <article key={i} className="mobile-hito-card">
            <div className="mobile-date-blob">{hito.year}</div>
            <div className="mobile-card-inner">
              <div className="mobile-visual">
                <LazyImage src={hito.img} alt={hito.title} />
                <div className="visual-overlay"></div>
              </div>
              <div className="mobile-text">
                <span className="mobile-tag">{hito.tag}</span>
                <h3>{hito.title}</h3>
                <p>{hito.desc}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <footer className="mobile-timeline-footer">
        <p>El hilo de la historia continúa...</p>
      </footer>
    </div>
  );
}