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
        const targetColor = i === 0 ? "#050507" : timelineData[i - 1]?.color;

        // 1. Transición de color de fondo (Optimizada)
        ScrollTrigger.create({
          scroller: ".timeline-mobile-horizontal-scroll",
          trigger: card,
          horizontal: true,
          start: "left 50%", 
          end: "right 50%",
          onToggle: (self) => {
            if (self.isActive && targetColor) {
              gsap.to('.mobile-bg-layer', {
                backgroundColor: targetColor,
                duration: 0.4,
                ease: "power1.out",
                overwrite: "auto"
              });
            }
          }
        });

        // 2. Trazo SVG Animado (Optimizado sin scrub pesado)
        const path = card.querySelector('.river-path');
        if (path) {
          const pathLength = path.getTotalLength();
          gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              scroller: ".timeline-mobile-horizontal-scroll",
              trigger: card,
              horizontal: true,
              start: "left 80%",
              toggleActions: "play none none reverse"
            }
          });
        }

        // 3. Aparición de elementos (Disparo único en lugar de scrub)
        if (i > 0) {
          const visual = card.querySelector('.mobile-visual');
          const textBlock = card.querySelector('.mobile-text');
          const dateBlob = card.querySelector('.mobile-date-blob');

          if (visual) {
            gsap.fromTo(visual,
              { opacity: 0, scale: 0.95 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                force3D: true,
                scrollTrigger: {
                  scroller: ".timeline-mobile-horizontal-scroll",
                  trigger: card,
                  horizontal: true,
                  start: "left 75%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }

          if (textBlock) {
            gsap.fromTo(textBlock,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.1,
                ease: "power2.out",
                force3D: true,
                scrollTrigger: {
                  scroller: ".timeline-mobile-horizontal-scroll",
                  trigger: card,
                  horizontal: true,
                  start: "left 70%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }

          if (dateBlob) {
            gsap.fromTo(dateBlob,
              { opacity: 0.1 },
              {
                opacity: 0.8,
                duration: 0.6,
                ease: "power1.out",
                scrollTrigger: {
                  scroller: ".timeline-mobile-horizontal-scroll",
                  trigger: card,
                  horizontal: true,
                  start: "left 85%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="timeline-mobile-wrapper" ref={containerRef}>
      <div className="mobile-bg-layer"></div>

      <div className="timeline-mobile-horizontal-scroll">
        <div className="mobile-hito-snap-card mobile-intro-center">
          <span className="eyebrow">Crónica de Rosario</span>
          <h2 className="title">Línea del Tiempo</h2>
          <div className="scroll-hint-v">
            Arrastra hacia la izquierda <i className="fa-solid fa-arrow-right-long ml-1 animate-pulse"></i>
          </div>
        </div>

        {timelineData.map((hito, i) => (
          <article key={i} className="mobile-hito-snap-card">
            <div className="mobile-date-blob">{hito.year}</div>

            <div className="river-svg-track">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <marker
                    id="river-arrow"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="rgba(226, 180, 100, 0.85)" />
                  </marker>
                </defs>

                <path 
                  className="river-path"
                  d="M 0,50 Q 25,47 50,50 T 100,48" 
                  fill="none" 
                  stroke="rgba(226, 180, 100, 0.45)" 
                  strokeWidth="1.2" 
                  markerEnd="url(#river-arrow)"
                />
              </svg>
            </div>

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

        <div className="mobile-hito-snap-card mobile-intro-center">
          <p className="font-serif text-2xl" style={{ color: 'var(--gold-primary)' }}>
            El hilo de la historia continúa...
          </p>
        </div>
      </div>
    </div>
  );
}