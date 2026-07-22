import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData } from './TimelineConstants';
import LazyImage from './LazyImage';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineDesktop({ onOpenHito }) {
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.desktop-slide');
      if (!slides.length || !sectionRef.current) return;

      // 1. DESPLAZAMIENTO HORIZONTAL PRINCIPAL
      const scrollTween = gsap.to(slides, {
        x: () => -(sectionRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1.5,
          start: "top top",
          end: () => `+=${sectionRef.current.scrollWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      // 2. ANIMACIÓN CINEMÁTICA DE ELEMENTOS INTERNOS
      slides.forEach((slide, i) => {
        // Interpolación fluida de fondos cromáticos de época
        const color = i === 0 ? "#050507" : timelineData[i - 1]?.color;
        if (color) {
          gsap.to(triggerRef.current, {
            backgroundColor: color,
            overwrite: "auto",
            scrollTrigger: {
              trigger: slide,
              containerAnimation: scrollTween,
              start: "left center",
              end: "right center",
              scrub: true,
            }
          });
        }

        // Efectos avanzados para los hitos históricos
        if (i > 0) {
          const yearBg = slide.querySelector('.year-large');
          const contentBox = slide.querySelector('.content-box');
          const textReveal = slide.querySelector('.text-side-reveal');
          const mediaReveal = slide.querySelector('.media-frame-wrapper');
          const epigraph = slide.querySelector('.hito-epigraph');

          // Parallax dramático para el Año Gigante de Fondo
          if (yearBg) {
            gsap.fromTo(yearBg, 
              { opacity: 0, scale: 0.7, x: 200 },
              {
                opacity: 0.14,
                scale: 1.15,
                x: -120,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                }
              }
            );
          }

          // Revelación del contenedor principal con rotación sutil en perspectiva
          if (contentBox) {
            gsap.fromTo(contentBox,
              { y: 60, opacity: 0, rotationX: 2 },
              {
                y: 0,
                opacity: 1,
                rotationX: 0,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: scrollTween,
                  start: "left right-=150",
                  end: "left center+=100",
                  scrub: true,
                }
              }
            );
          }

          // Desplazamiento disociado para la imagen (Efecto lente)
          if (mediaReveal) {
            gsap.fromTo(mediaReveal,
              { scale: 0.93, x: -30 },
              {
                scale: 1,
                x: 0,
                ease: "sine.out",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "left left",
                  scrub: true,
                }
              }
            );
          }

          // Aparición escalonada del bloque de texto descriptivo
          if (textReveal) {
            gsap.fromTo(textReveal,
              { y: 20, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: scrollTween,
                  start: "left right-=100",
                  end: "left center",
                  scrub: true,
                }
              }
            );
          }

          // Entrada retrasada de la cita o epígrafe lírico
          if (epigraph) {
            gsap.fromTo(epigraph,
              { opacity: 0, x: 40 },
              {
                opacity: 1,
                x: 0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: scrollTween,
                  start: "left center+=100",
                  end: "left center-=100",
                  scrub: true,
                }
              }
            );
          }
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  // Generador de morfologías de maquetación asimétrica
  const getLayoutClass = (index) => {
    const layouts = ['layout-standard', 'layout-reverse', 'layout-cinematic', 'layout-compact-tall'];
    return layouts[index % layouts.length];
  };

  return (
    <div className="timeline-desktop-wrapper" ref={triggerRef} style={{ backgroundColor: '#050507' }}>
      
      {/* Guía fluvial o trazado de fondo decorativo */}
      <div className="river-svg-track">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 0,50 Q 25,35 50,60 T 100,45" fill="none" stroke="rgba(226, 180, 100, 0.08)" strokeWidth="0.5" strokeDasharray="2 1" />
        </svg>
      </div>

      <div className="timeline-horizontal-track" ref={sectionRef}>
        
        {/* Pantalla del Prólogo (Intro) */}
        <section className="desktop-slide intro">
          <div className="intro-content-luxurious">
            <div className="crest-ornament">
              <i className="fa-solid fa-ellipsis-vertical decoration-dot"></i>
            </div>
            <span className="eyebrow-monumental">Rosario: Crónica de una Identidad</span>
            <h1 className="main-title-cinematic">El Hilo de la Memoria</h1>
            <div className="divider-filigree">
              <span className="line-left"></span>
              <i className="fa-regular fa-compass core-icon"></i>
              <span className="line-right"></span>
            </div>
            <p className="scroll-hint-artistic">
              <i className="fa-solid fa-computer-mouse animate-pulse mr-2"></i>
              Desliza la rueda para desplegar el tapiz histórico
            </p>
          </div>
        </section>

        {/* Mapeo Artístico de los Sucesos Históricos */}
        {timelineData.map((hito, i) => {
          const layoutClass = getLayoutClass(i);
          const finalClass = hito.customClass || layoutClass; 

          return (
            <section key={i} className={`desktop-slide hito-variant ${finalClass}`}>
              {/* Monolito numérico de fondo para el parallax */}
              <div className="year-large">{hito.year}</div>
              
              {/* Contenedor con estructura neoclásica interna adaptable */}
              <div className="content-box">
                
                {/* Esquinas ornamentales para el renderizado de marcos por CSS */}
                <span className="ornament-corner top-left"></span>
                <span className="ornament-corner top-right"></span>
                <span className="ornament-corner bottom-left"></span>
                <span className="ornament-corner bottom-right"></span>

                {/* Bloque Visual: Enmarcado artístico de la iconografía histórica */}
                <div className="media-frame-wrapper media-side">
                  <div className="inner-image-lens">
                    <LazyImage src={hito.img} alt={hito.title} />
                  </div>
                  <div className="image-overlay-ambiance"></div>
                  {/* Etiqueta flotante integrada al marco de la imagen */}
                  <div className="media-floating-tag">
                    <span className="index-indicator">N° {(i + 1).toString().padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Bloque Narrativo: Tipografías y micro-estructuras de datos */}
                <div className="text-side text-side-reveal">
                  <header className="text-header-node">
                    <div className="meta-context">
                      <span className="hito-tag">{hito.tag}</span>
                      {hito.location && (
                        <span className="hito-location-meta">
                          <i className="fa-solid fa-location-dot mr-1"></i> {hito.location}
                        </span>
                      )}
                    </div>
                    <h2>{hito.title}</h2>
                    <div className="underline-accent-gold"></div>
                  </header>

                  <div className="narrative-body">
                    <p>{hito.desc}</p>
                    
                    {/* Epígrafe o cita evocativa opcional */}
                    {hito.quote && (
                      <blockquote className="hito-epigraph">
                        <p>“{hito.quote}”</p>
                        {hito.quoteAuthor && <cite>— {hito.quoteAuthor}</cite>}
                      </blockquote>
                    )}
                  </div>

                  <footer className="action-footer-node">
                    <button className="explore-btn" onClick={() => onOpenHito(hito)}>
                      <span className="btn-label-text">Abrir Archivo Histórico</span>
                      <div className="btn-arrow-container">
                        <i className="fa-solid fa-arrow-right-long arrow-icon"></i>
                      </div>
                    </button>
                  </footer>
                </div>

              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}