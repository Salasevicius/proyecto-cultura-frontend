import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; 
import LazyImage from './LazyImage'; 
import './SpecialSections.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function SpecialSections() {
  const containerRef = useRef();
  const titleRef = useRef();
  const navigate = useNavigate();

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
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray('.special-card');
      cards.forEach((card) => {
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

        ScrollTrigger.create({
          trigger: card,
          start: "top 60%", 
          end: "bottom 20%",
          onToggle: (self) => {
            if (self.isActive) {
              card.classList.add('is-active');
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
    <section className="special-hub" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="special-hub-divider"></div>

      <div className="hub-header">
        <h2 className="hub-subtitle">Exploración Profunda</h2>
        <h1 className="hub-title" ref={titleRef}>SECCIONES ESPECIALES</h1>
      </div>

      <div className="hub-grid">
        {/* Card 1: Línea de Tiempo */}
        <div className="special-card">
          <div className="card-image-wrapper">
             <LazyImage src="/monumento-construccion.webp" alt="Cronología" className="card-parallax-bg" />
          </div>
          <div className="card-info">
            <span className="card-tag">Interactivo</span>
            <h3>Línea de Tiempo</h3>
            <p>Un recorrido cronológico horizontal por los hitos que forjaron la identidad de Rosario.</p>
            <button className="hub-btn" onClick={() => navigate('/cronologia')}>Iniciar Recorrido</button>
          </div>
        </div>

        {/* Card 2: Archivo Histórico */}
        <div className="special-card">
          <div className="card-image-wrapper">
             <LazyImage src="/plano-rosario.webp" alt="Archivo" className="card-parallax-bg" />
          </div>
          <div className="card-info">
            <span className="card-tag">Digitalización</span>
            <h3>Archivo Histórico Digital</h3>
            <p>Acceso a documentos, mapas y fotografías rescatadas de la memoria urbana.</p>
            <button className="hub-btn">Explorar Legajo</button>
          </div>
        </div>

        {/* Card 3: Crónica Inmersiva (Bordabehere) */}
        <div className="special-card inmersive-chronicle-card">
          <div className="card-image-wrapper">
             <LazyImage src="/inmersivo-pichincha.webp" alt="Bordabehere" className="card-parallax-bg" />
          </div>
          <div className="card-info">
            <span className="card-tag">Narrativa Cinematográfica</span>
            <h3>Crónicas Inmersivas</h3>
            <p>Una experiencia inmersiva e interactiva sobre hechos y procesos relacionados a la cultura rosarina.</p>
             <button 
  className="hub-btn" 
  onClick={() => navigate('/cronicas-hub')} // CAMBIO AQUÍ
>
  Explorar Archivo
</button>
          </div>
        </div>

        {/* Card 4: Enciclopedia */}
        <div className="special-card">
          <div className="card-image-wrapper">
             <LazyImage src="/biblioteca-argentina.webp" alt="Enciclopedia" className="card-parallax-bg" />
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