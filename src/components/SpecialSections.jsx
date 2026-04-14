import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SpecialSections.css';

gsap.registerPlugin(ScrollTrigger);

export default function SpecialSections() {
  const containerRef = useRef();

  // --- Lógica de Micro-interacción: Spotlight ---
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    // Calculamos la posición del mouse relativa al contenedor
    const { clientX, clientY } = e;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Seteamos las variables CSS en el elemento padre
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Animación para que las secciones aparezcan con elegancia al hacer scroll
      gsap.utils.toArray('.special-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="special-hub" 
      ref={containerRef} 
      onMouseMove={handleMouseMove} // Vinculación del evento
    >
      <div className="hub-header">
        <h2 className="hub-subtitle">Exploración Profunda</h2>
        <h1 className="hub-title">SECCIONES ESPECIALES</h1>
      </div>

      <div className="hub-grid">
        {/* 1. CRONOLOGÍA */}
        <div className="special-card cronologia">
          <div className="card-image-wrapper">
             <div className="card-parallax-bg bg-1"></div>
          </div>
          <div className="card-info">
            <span className="card-tag">Interactivo</span>
            <h3>Línea de Tiempo</h3>
            <p>Un recorrido cronológico horizontal por los hitos que forjaron la identidad de Rosario.</p>
            <button className="hub-btn">Iniciar Recorrido</button>
          </div>
        </div>

        {/* 2. ARCHIVO */}
        <div className="special-card archivo">
          <div className="card-image-wrapper">
             <div className="card-parallax-bg bg-2"></div>
          </div>
          <div className="card-info">
            <span className="card-tag">Digitalización</span>
            <h3>Archivo Histórico Digital</h3>
            <p>Acceso a documentos, mapas y fotografías rescatadas de la memoria urbana.</p>
            <button className="hub-btn">Explorar Legajo</button>
          </div>
        </div>

        {/* 3. ENCICLOPEDIA */}
        <div className="special-card enciclopedia">
          <div className="card-image-wrapper">
             <div className="card-parallax-bg bg-3"></div>
          </div>
          <div className="card-info">
            <span className="card-tag">Investigación</span>
            <h3>Enciclopedia Mikiellevich</h3>
            <p>El saber sistemático sobre Rosario, inspirado en la obra del gran historiador local.</p>
            <button className="hub-btn">Consultar Diccionario</button>
          </div>
        </div>
      </div>
    </section>
  );
}