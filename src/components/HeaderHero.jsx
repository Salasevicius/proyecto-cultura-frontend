import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// 1. Importamos Helmet para el manejo de metadatos dinámicos
import { Helmet } from 'react-helmet-async';

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
      {/* 2. Implementación de Helmet para SEO Dinámico en el <head> */}
      <Helmet>
        <title>{`${content.title} | Proyecto Cultura Rosario`}</title>
        <meta name="description" content={content.description} />
        {/* Open Graph para redes sociales (opcional pero recomendado) */}
        <meta property="og:title" content={`${content.title} | Proyecto Cultura Rosario`} />
        <meta property="og:description" content={content.description} />
      </Helmet>

      <section className="highlighted-news">
        <article>
          {/* EL H1 PRINCIPAL: Marca + Objeto + Localización (SEO Master) */}
          <h1 className="h1-seo-main">
            BIENVENIDOS A LOS ARTÍCULOS DE 
            <span className="h2negronaranjanegro"> PROYECTO </span>
            <span className="h2negronaranja">CULTURA </span>
            <span className="sr-only"> EN ROSARIO</span>
          </h1>
          <h2 className="h3articulos">ARTÍCULOS</h2>
        </article>
      </section>

      <section className="presentation-section">
        <div className="presentation-content">
          <div className="presentation-text" key={currentCategory}>
            
            {/* TÍTULO DE CATEGORÍA: Pasa a ser H2 (Sub-tema del H1) */}
            <h2 className="presentation-title fade-in-text" style={{ display: 'inline-flex', justifyContent: 'center' }}>
              {content.title.split("").map((char, i) => {
                const total = content.title.length;
                const center = (total - 1) / 2;
                const dist = i - center;
                
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
            </h2>

            <p className="presentation-description fade-in-text">
              {content.description}
            </p>
          </div>

          <img
            ref={leftImageRef}
            key={`img-left-${currentCategory}`}
            src={content.imgLeft}
            alt={`Imagen Izquierda de ${content.title} - Proyecto Cultura Rosario`}
            className="presentation-image-left fade-in-image"
          />
          <img
            ref={rightImageRef}
            key={`img-right-${currentCategory}`}
            src={content.imgRight}
            alt={`Imagen Derecha de ${content.title} - Proyecto Cultura Rosario`}
            className="presentation-image-right fade-in-image"
          />
        </div>
      </section>
    </>
  );
};

export default HeaderHero;