import React, { useEffect, useRef } from 'react';

const HeaderHero = () => {
  // Creamos las referencias para las imágenes
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);

  useEffect(() => {
    // Función optimizada para el efecto Parallax
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Solo aplicamos el efecto si estamos en pantallas de escritorio (opcional)
      // y si las referencias existen para evitar errores
      if (leftImageRef.current && rightImageRef.current) {

        // Calculamos las posiciones basadas en tu lógica original
        const leftX = -50 + scrollPosition * 0.05;
        const rightX = 50 - scrollPosition * 0.05;

        // Aplicamos el transform directamente al estilo del elemento
        // Esto es mucho más eficiente que usar estados de React para el scroll
        leftImageRef.current.style.transform = `translate(${leftX}%, -50%) rotate(-10deg)`;
        rightImageRef.current.style.transform = `translate(${rightX}%, -50%) rotate(10deg)`;
      }
    };

    // Escuchamos el evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Limpieza: eliminamos el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // El array vacío asegura que esto solo se ejecute al montar el componente

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
            <h1 className="presentation-title">Destacados</h1>
            <p className="presentation-description">
              Explora contenido único y fascinante a lo largo de nuestro sitio web.
              Sumérgete en nuestros artículos destacados y descubre más.
            </p>
          </div>

          {/* Asignamos las Refs a las imágenes correspondientes */}
          <img
            ref={leftImageRef}
            src="/bordabehere-rosario.webp"
            alt="Imagen Izquierda"
            className="presentation-image-left"
          />
          <img
            ref={rightImageRef}
            src="/antonio-berni.webp"
            alt="Imagen Derecha"
            className="presentation-image-right"
          />
        </div>
      </section>
    </>
  );
};

export default HeaderHero;