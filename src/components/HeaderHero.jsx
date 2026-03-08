import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const CATEGORY_CONTENT = {
  "Destacados": {
    title: "DESTACADOS",
    description: "Explora contenido único y fascinante a lo largo de nuestro sitio web. Sumérgete en nuestros artículos destacados y descubre más sobre Rosario.",
    imgLeft: "/bordabehere-rosario.webp",
    imgRight: "/antonio-berni.webp"
  },
  "Biografías": {
    title: "BIOGRAFÍAS",
    description: "Descubre los artículos biográficos que ofrece Proyecto Cultura. Retratos breves de personalidades que forjaron la identidad de nuestra ciudad.",
    imgLeft: "/felipe-aldana.webp",
    imgRight: "/cachilo-rosario.webp"
  },
  "Literarios": {
    title: "LITERARIOS",
    description: "Observa nuestra colección de artículos literarios, desde análisis profundos hasta reseñas accesibles. Encuentra información clara y útil sobre textos y autores.",
    imgLeft: "/biblioteca-argentina.webp",
    imgRight: "monte-caballero.webp"
  },
  "Periodísticos": {
    title: "PERIODÍSTICOS",
    description: "Encuentra artículos periodísticos con análisis claros y directos sobre las noticias y eventos que han atravesado la ciudad a lo largo de su historia.",
    imgLeft: "/mafia1930-rosario.webp",
    imgRight: "castagnino-museo-rosario.webp"
  },
  "Opinión": {
    title: "OPINIÓN",
    description: "Reflexiones y perspectivas sobre el acontecer cultural y social de Rosario.",
    imgLeft: "/cementerio-trenes-rosario.webp",
    imgRight: "inundaciones-rosario.webp"
  }
};

const HeaderHero = () => {
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const currentCategory = queryParams.get('category') || "Destacados";

  const content = CATEGORY_CONTENT[currentCategory] || CATEGORY_CONTENT["Destacados"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (leftImageRef.current && rightImageRef.current) {
        const leftX = -50 + scrollPosition * 0.05;
        const rightX = 50 - scrollPosition * 0.05;

        leftImageRef.current.style.transform = `translate(${leftX}%, -50%) rotate(-10deg)`;
        rightImageRef.current.style.transform = `translate(${rightX}%, -50%) rotate(10deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  return (
    <>
      <section className="highlighted-news">
        <article>
          <h2 className="h2articulos">
            BIENVENIDOS A LOS ARTÍCULOS DE <span className="h2negronaranjanegro">PROYECTO </span>
            <span className="h2negronaranja">CULTURA</span>
          </h2>
          <h3 className="h3articulos">ARTÍCULOS</h3>
        </article>
      </section>

      <section className="presentation-section">
        <div className="presentation-content">
          <div className="presentation-text" key={currentCategory}>
            
            {/* TÍTULO CON BÓVEDA LEVE Y PROFESIONAL */}
            <h1 className="presentation-title fade-in-text" style={{ display: 'inline-flex', justifyContent: 'center' }}>
              {content.title.split("").map((char, i) => {
                const total = content.title.length;
                const center = (total - 1) / 2;
                const dist = i - center;
                
                // --- AJUSTES DE CURVATURA SUAVIZADA ---
                // Bajamos la rotación a 1.5 grados por letra
                // El multiplicador de caída bajó de 1.2 a 0.4 para ser muy leve
                const rotate = dist * 1.5; 
                const translateY = Math.pow(Math.abs(dist), 2) * 0.4; 

                return (
                  <span 
                    key={i} 
                    style={{ 
                      display: 'inline-block',
                      transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
                      transformOrigin: 'bottom center',
                      whiteSpace: 'pre'
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </h1>

            <p className="presentation-description fade-in-text">
              {content.description}
            </p>
          </div>

          <img
            ref={leftImageRef}
            key={`img-left-${currentCategory}`}
            src={content.imgLeft}
            alt={`Imagen Izquierda de ${content.title}`}
            className="presentation-image-left fade-in-image"
          />
          <img
            ref={rightImageRef}
            key={`img-right-${currentCategory}`}
            src={content.imgRight}
            alt={`Imagen Derecha de ${content.title}`}
            className="presentation-image-right fade-in-image"
          />
        </div>
      </section>
    </>
  );
};

export default HeaderHero;