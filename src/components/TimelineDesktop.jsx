import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData } from './TimelineConstants';
import LazyImage from './LazyImage';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineDesktop() {
  const triggerRef = useRef();
  const sectionRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.desktop-slide');
      const totalSlides = slides.length;
      const scrollDistance = totalSlides * 600; // Un poco más de aire para el scroll

      // 1. ANIMACIÓN HORIZONTAL
      const scrollTween = gsap.to(slides, {
        x: () => -(sectionRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 2, // Bajamos un poco el scrub para mayor respuesta
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
        }
      });

      // 2. CAMBIO DE COLOR (La lógica que estaba fallando)
      slides.forEach((slide, i) => {
        // Obtenemos el color: i=0 es la intro, i > 0 son los hitos
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
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="timeline-desktop-wrapper" ref={triggerRef} style={{ backgroundColor: '#050507' }}>
      <div className="timeline-horizontal-track" ref={sectionRef}>
        <section className="desktop-slide intro">
          <div className="intro-content">
            <span className="eyebrow">Rosario: Crónica de una Identidad</span>
            <h1>El Hilo de la Memoria</h1>
            <p className="scroll-hint">Utiliza la rueda del ratón para navegar</p>
          </div>
        </section>

        {timelineData.map((hito, i) => (
          <section key={i} className="desktop-slide hito">
            <div className="year-large">{hito.year}</div>
            <div className="content-box">
              <div className="media-side">
                <LazyImage src={hito.img} alt={hito.title} />
              </div>
              <div className="text-side">
                <span className="hito-tag">{hito.tag}</span>
                <h2>{hito.title}</h2>
                <p>{hito.desc}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}