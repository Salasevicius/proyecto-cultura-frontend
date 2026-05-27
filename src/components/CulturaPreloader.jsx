import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CulturaPreloader.css';

const CulturaPreloader = ({ onComplete }) => {
  const scope = useRef();
  const [textoCarga, setTextoCarga] = useState("SINTONIZANDO CULTURA...");

  const frasesRosarinas = [
    "EL PARANÁ COMO TESTIGO",
    "MÁRMOL, RÍO Y MEMORIA",
    "CUNA DE LA BANDERA"
  ];

  useEffect(() => {
    // Rotación de textos pausada
    const tInterval = setInterval(() => {
      setTextoCarga(frasesRosarinas[Math.floor(Math.random() * frasesRosarinas.length)]);
    }, 3000); // Más tiempo para leer

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // SALIDA FINAL: Muy lenta y elegante, hacia arriba
          gsap.to(scope.current, {
            yPercent: -100,
            duration: 2.5,
            ease: "expo.inOut",
            // Creamos la curva cóncava masiva en la base mientras sube
      clipPath: "polygon(0% 0%, 100% 0%, 100% 15%, 90% 5%, 75% 25%, 55% -5%, 40% 15%, 25% 0%, 12% 20%, 0% 8%)",
            onComplete
          });
          gsap.to(".layout-art", {
      opacity: 0,
      y: -60,
      duration: 0.8,
      ease: "power2.in"
    });
        }
      });

      // Reset inicial: Todo invisible o en posición de 'off'
      tl.set(".letra", { y: 150, opacity: 0 });
      tl.set(".svg-monumento", { opacity: 0, scale: 0.8 });

      // =============================================
      // FASE 1: LA NOCHE TÉCNICA (Fondo Azul Profundo)
      // =============================================
      
      // A. DIBUJO DEL MONUMENTO: Nace en Dorado sobre Azul
      tl.to(".svg-monumento", { opacity: 0.3, scale: 1, duration: 1.5, ease: "power2.out" })
        .fromTo(".path-monumento", 
          { strokeDashoffset: 2000, strokeDasharray: 2000 },
          { strokeDashoffset: 0, duration: 4, ease: "power2.inOut" }, "-=1");

      // B. REVELADO TEXTUAL: Letras masivas emergen en Dorado/Blanco
      tl.to(".letra", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 2.5,
        ease: "cubic-bezier(0.19, 1, 0.22, 1)"
      }, "-=3"); // Solapamiento con el dibujo

      // =============================================
      // FASE 2: EL AMANECER CULTURAL (Cambio a Naranja)
      // =============================================
      
      // C. LA METAMORFOSIS CROMÁTICA (Lenta y Majestuosa)
      tl.to(scope.current, {
        backgroundColor: "#ff6600", // NARANJA ROSARIO
        duration: 4, // MUY LENTO, para contemplar el fundido
        ease: "sine.inOut"
      }, "+=1"); // Pausa tras la aparición del texto

      // D. INVERSIÓN DE COLOR DE TEXTO (Para legibilidad sobre Naranja)
      tl.to([".letra", ".path-monumento", ".dato-tec", ".frase-dinamica"], {
        color: "#ffffff",
        stroke: "#ffffff",
        duration: 3,
        ease: "power2.inOut"
      }, "-=3.5"); // Sincronizado con el cambio de fondo

      tl.to(".linea-guia", {
        backgroundColor: "#ffffff",
        duration: 2
      }, "-=3");

      // 4. PAUSA CONTEMPLATIVA FINAL: El Monumento domina en Blanco sobre Naranja
      tl.to({}, { duration: 2.5 }); 

    }, scope);

    return () => { ctx.revert(); clearInterval(tInterval); };
  }, [onComplete]);

  return (
    <div className="preloader-master" ref={scope}>
      <div className="capa-textura"></div>
      
      <div className="layout-art">
        {/* Datos Técnicos */}
        <div className="panel-info">
          <span className="dato-tec">COORDENADAS: 32° 56′ S / 60° 38′ O</span>
          <span className="dato-tec">ORIGEN: ROSARIO, SANTA FE, ARGENTINA</span>
          <div className="linea-guia"></div>
        </div>

        <div className="centro-monumental">
          {/* Silueta del Monumento - Wireframe Técnico */}
          <svg viewBox="0 0 400 400" className="svg-monumento">
            <path className="path-monumento" d="M200 40 L340 360 L200 310 L60 360 Z" />
          </svg>

          {/* Tipografía de Gran Escala - Masiva */}
          <div className="contenedor-marca">
            <h1 className="titulo-gigante">
              <div className="linea-h">
                {"PROYECTO".split("").map((l, i) => <span key={i} className="letra">{l}</span>)}
              </div>
              <div className="linea-h">
                {"CULTURA".split("").map((l, i) => <span key={i} className="letra letra-naranja">{l}</span>)}
              </div>
            </h1>
          </div>
        </div>

        {/* Footer con Crónica */}
        <div className="panel-footer">
          <p className="frase-dinamica">{textoCarga}</p>
          <div className="barra-progreso">
            <div className="progreso-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturaPreloader;