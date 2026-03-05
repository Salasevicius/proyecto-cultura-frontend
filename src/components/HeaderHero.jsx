import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const CATEGORY_CONTENT = {
  "Destacados": {
    title: "DESTACADOS",
    description: "Explora contenido único y fascinante a lo largo de nuestro sitio web. Sumérgete en nuestros artículos destacados y descubre más.",
    imgLeft: "/bordabehere-rosario.webp",
    imgRight: "/antonio-berni.webp"
  },
  "Microbiografías": {
    title: "MICROBIOGRAFÍAS",
    description: "Descubre los artículos biográficos que ofrece Proyecto Cultura. Retratos breves de personalidades que forjaron la identidad y el pulso de nuestra ciudad.",
    imgLeft: "/felipe-aldana.webp",
    imgRight: "/cachilo-rosario.webp"
  },
  "Literarios": {
    title: "LITERARIOS",
    description: "Observa nuestra colección de artículos literarios, desde análisis profundos hasta reseñas accesibles. Encuentra información clara y útil sobre textos y autores.",
    imgLeft: "/images/lit-izq.webp",
    imgRight: "/images/lit-der.webp"
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
    imgLeft: "/images/opi-izq.webp",
    imgRight: "/images/opi-der.webp"
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
          {/* Añadimos el key aquí para que toda la caja de texto se anime al cambiar */}
          <div className="presentation-text" key={currentCategory}>
            <h1 className="presentation-title fade-in-text">{content.title}</h1>
            <p className="presentation-description fade-in-text">
              {content.description}
            </p>
          </div>

          <img
            ref={leftImageRef}
            key={`img-left-${currentCategory}`} // Key única para la imagen izquierda
            src={content.imgLeft}
            alt={`Imagen Izquierda de ${content.title}`}
            className="presentation-image-left fade-in-image"
          />
          <img
            ref={rightImageRef}
            key={`img-right-${currentCategory}`} // Key única para la imagen derecha
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