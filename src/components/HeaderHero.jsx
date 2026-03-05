import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Importamos el hook para leer la URL

// 1. Definimos el diccionario de contenidos fuera del componente
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
    imgLeft: "/felipe-aldana.webp", // Deberás asegurar que estas rutas existan
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
  
  // 2. Lógica para detectar la categoría desde la URL (?category=...)
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const currentCategory = queryParams.get('category') || "Destacados";

  // 3. Obtenemos el contenido correspondiente
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
          <div className="presentation-text">
            {/* 4. Usamos las variables del diccionario */}
            <h1 className="presentation-title">{content.title}</h1>
            <p className="presentation-description">
              {content.description}
            </p>
          </div>

          <img
            ref={leftImageRef}
            src={content.imgLeft} // Imagen dinámica
            alt={`Imagen Izquierda de ${content.title}`}
            className="presentation-image-left"
          />
          <img
            ref={rightImageRef}
            src={content.imgRight} // Imagen dinámica
            alt={`Imagen Derecha de ${content.title}`}
            className="presentation-image-right"
          />
        </div>
      </section>
    </>
  );
};

export default HeaderHero;