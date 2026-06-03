import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './ChroniclesHub.css';

const chronicles = [
  {
    id: 'enzo-bordabehere',
    title: 'El Duelo de Bordabehere',
    subtitle: 'Rosario, 1935',
    category: 'POLÍTICA',
    excerpt:
      'Una reconstrucción cinematográfica del asesinato que sacudió al Senado de la Nación.',
    image: '/inmersivo-bordabehere.webp',
    duration: '12 min',
    layout: 'xlarge',
  },
  {
    id: 'pichincha',
    title: 'Pichincha: La Noche Roja',
    subtitle: 'Mafia y Prostitución',
    category: 'BAJOS FONDOS',
    excerpt:
      'Crónica inmersiva por los pasillos del barrio que nunca dormía bajo el imperio de la Zwi Migdal.',
    image: '/inmersivo-pichincha.webp',
    duration: '15 min',
    layout: 'xlarge',
  },
  {
    id: 'arquitectura-ferroviaria',
    title: 'Catedrales de Hierro',
    subtitle: 'El Legado Inglés',
    category: 'URBANISMO',
    excerpt:
      'El auge ferroviario que transformó a Rosario. Un viaje por terminales olvidadas.',
    image: '/inmersivo-ferrocarril.webp',
    duration: '10 min',
    layout: 'xlarge',
  },
  {
    id: 'parana-misterioso',
    title: 'El Día de la Comuna Rosarina',
    subtitle: 'Luchas Obreras',
    category: 'LUCHAS OBRERAS',
    excerpt:
      '1921: Obreros y estudiantes anarquistas toman el Palacio de los Leones. Una jornada revolucionaria que desafió al poder municipal de Rosario.',
    image: '/huelga-anarquista-rosario.webp',
    duration: '18 min',
    layout: 'large',
  },
  {
    id: 'mafia-rosarina',
    title: 'Guerra de Chichos',
    subtitle: 'Crimen Organizado',
    category: 'HISTORIA NEGRA',
    excerpt:
      'La disputa de poder entre Chicho Grande y Chicho Chico que marcó una era en la Chicago Argentina.',
    image: '/guerra-de-chichos.webp',
    duration: '20 min',
    layout: 'xlarge',
  },
  {
    id: 'campeon-rosarino',
    title: 'Candidato a Maestro',
    subtitle: 'Pase a los 2000 de elo',
    category: 'HISTORIA NEGRA',
    excerpt:
      'La disputa entre Alan y un brazuca Candidato a Maestro, y el paso a 2000 de elo.',
    image: '/equipo-ñuls.webp',
    duration: '20 min',
    layout: 'xlarge',
  },
  {
    id: 'el-trinche',
    title: 'El trinche Carlovich',
    subtitle: 'El inmortal doble caño',
    category: 'HISTORIA NEGRA',
    excerpt: 'Máximo exponente del arco lírico del fútbol argentino',
    image: '/ferrocarril-central.webp',
    duration: '20 min',
    layout: 'large',
  },
];

const ChroniclesHub = () => {
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  // Usamos Refs para persistir valores entre renders sin provocar re-renders
  const lastScrollY = useRef(0);
  const timeoutId = useRef(null);

  // Creamos Refs para los elementos que vamos a animar
  const archiveLabelRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.fromTo(
      archiveLabelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, delay: 0.2 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        '-=0.7' // "Overlap": empieza 0.7 segundos antes de que termine la anterior para mayor fluidez
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        '-=0.6'
      );

    // Limpieza opcional de GSAP al desmontar para evitar animaciones huérfanas
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Margen de seguridad: No activar si estamos muy arriba (en el header)
      if (currentScrollY < 150) {
        setIsBtnVisible(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Determinar dirección: ¿El usuario está scrolleando hacia arriba?
      const isScrollingUp = currentScrollY < lastScrollY.current;

      if (isScrollingUp) {
        // Limpiamos cualquier temporizador previo para que no se oculte mientras siga subiendo
        if (timeoutId.current) clearTimeout(timeoutId.current);

        setIsBtnVisible(true);

        // Setear el temporizador para ocultarlo después de 2.5 segundos de inactividad
        timeoutId.current = setTimeout(() => {
          setIsBtnVisible(false);
        }, 2500);
      } else {
        // Si empieza a bajar de nuevo, lo ocultamos inmediatamente
        setIsBtnVisible(false);
        if (timeoutId.current) clearTimeout(timeoutId.current);
      }

      // Actualizamos la posición del scroll en la Ref
      lastScrollY.current = currentScrollY;
    };

    // Escuchamos el evento de scroll nativo
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Limpieza imperativa de trinchera (Evita memory leaks y timers huérfanos)
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <main className="chronicles-hub-container">
      {/* Botón Volver - Respetando tu ruta al Portal */}
      <Link
        to="/"
        className={`back-portal-btn ${isBtnVisible ? 'is-visible' : ''}`}
      >
        <span className="btn-line"></span>
        <span className="btn-text">VOLVER AL PORTAL</span>
      </Link>

      <header className="hub-intro">
        <span className="archive-label" ref={archiveLabelRef}>
          ARCHIVO DE LA CIUDAD INVISIBLE
        </span>
        <h1 className="hub-main-title" ref={titleRef}>
          Crónicas <br />
          <span>Inmersivas</span>
        </h1>
        <div className="hub-description" ref={descriptionRef}>
          <p>
            Experiencias narrativas diseñadas para ser habitadas. Relatos donde
            el <strong>rigor histórico</strong> converge con la tecnología
            interactiva.
          </p>
        </div>
      </header>

      <section className="chronicles-grid">
        {chronicles.map((item) => {
          const layoutClass = item.layout || 'normal';
          return (
            <div key={item.id} className={`chronicle-card-item ${layoutClass}`}>
              {/* NUEVA UBICACIÓN: El texto ahora se renderiza arriba de la tarjeta */}
              <div className="card-text-content">
                <span className="card-subtitle">{item.subtitle}</span>
                <h2 className="card-title">{item.title}</h2>
              </div>

              {/* El contenedor visual y los overlays se mantienen debajo del texto */}
              <div className="card-visual-container">
                <img src={item.image} alt={item.title} className="card-img" />
                <div className="card-category-tag">{item.category}</div>

                <div className="card-overlay-info">
                  <span className="duration-tag">
                    {item.duration} DE LECTURA
                  </span>
                  <p className="card-excerpt">{item.excerpt}</p>
                  {/* Ruta dinámica respetada */}
                  <Link
                    to={`/cronica/${item.id}`}
                    className="enter-experience-btn"
                  >
                    INICIAR EXPERIENCIA
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <footer className="hub-footer-decoration">
        <span className="decor-line"></span>
        <p>PROYECTO CULTURA — ROSARIO, ARGENTINA</p>
      </footer>
    </main>
  );
};

export default ChroniclesHub;
