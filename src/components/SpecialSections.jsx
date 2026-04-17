import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LazyImage from './LazyImage'; 
import './SpecialSections.css';

gsap.registerPlugin(ScrollTrigger);

export default function SpecialSections() {
  const containerRef = useRef();
  const titleRef = useRef(); // Ref específica para el título

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. FADE-IN ELEGANTE PARA EL TÍTULO (H1)
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%", // Comienza la animación un poco antes de que sea totalmente visible
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray('.special-card');

      cards.forEach((card) => {
        // 2. Efecto de aparición para las tarjetas
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 80,
          duration: 1.6,
          ease: "power4.out",
        });

        // 3. ACTIVACIÓN AUTOMÁTICA Y MOVIMIENTO DE SPOTLIGHT
        ScrollTrigger.create({
          trigger: card,
          start: "top 60%", 
          end: "bottom 20%",
          onToggle: (self) => {
            if (self.isActive) {
              card.classList.add('is-active');
              
              const rect = card.getBoundingClientRect();
              const containerRect = containerRef.current.getBoundingClientRect();
              const centerX = (rect.left + rect.width / 2) - containerRect.left;
              const centerY = (rect.top + rect.height / 2) - containerRect.top;

              gsap.to(containerRef.current, {
                "--mouse-x": `${centerX}px`,
                "--mouse-y": `${centerY}px`,
                duration: 1.5,
                ease: "power2.out"
              });
            } else {
              card.classList.remove('is-active');
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="special-hub" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
    >
      <div className="special-hub-divider"></div>

      <div className="hub-header">
        <h2 className="hub-subtitle">Exploración Profunda</h2>
        <h1 className="hub-title" ref={titleRef}>SECCIONES ESPECIALES</h1>
      </div>

      <div className="hub-grid">
        {/* Card 1 */}
        <div className="special-card">
          <div className="card-image-wrapper">
             <LazyImage 
                src="/monumento-construccion.webp" 
                alt="Cronología"
                className="card-parallax-bg"
             />
          </div>
          <div className="card-info">
            <span className="card-tag">Interactivo</span>
            <h3>Línea de Tiempo</h3>
            <p>Un recorrido cronológico horizontal por los hitos que forjaron la identidad de Rosario.</p>
            <button className="hub-btn">Iniciar Recorrido</button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="special-card">
          <div className="card-image-wrapper">
             <LazyImage 
                src="/plano-rosario.webp" 
                alt="Archivo"
                className="card-parallax-bg"
             />
          </div>
          <div className="card-info">
            <span className="card-tag">Digitalización</span>
            <h3>Archivo Histórico Digital</h3>
            <p>Acceso a documentos, mapas y fotografías rescatadas de la memoria urbana.</p>
            <button className="hub-btn">Explorar Legajo</button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="special-card">
          <div className="card-image-wrapper">
             <LazyImage 
                src="/biblioteca-argentina.webp" 
                alt="Enciclopedia"
                className="card-parallax-bg"
             />
          </div>
          <div className="card-info">
            <span className="card-tag">Investigación</span>
            <h3>Enciclopedia Mikiellevich</h3>
            <p>El saber sistemático sobre Rosario, inspirado en la obra del gran historiador local.</p>
            <button className="hub-btn">Consultar Diccionario</button>
          </div>
        </div>
      </div>

      <div className="background-watermark">HISTORIA</div>
    </section>
  );
}