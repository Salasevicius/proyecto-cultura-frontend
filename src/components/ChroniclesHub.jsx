import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ChroniclesHub.css";

const chronicles = [
  {
    id: "enzo-bordabehere",
    title: "El Duelo de Bordabehere",
    subtitle: "Rosario, 1935",
    category: "POLÍTICA",
    excerpt:
      "Una reconstrucción cinematográfica del asesinato que sacudió al Senado de la Nación.",
    image: "/inmersivo-bordabehere.webp",
    duration: "12 min",
    layout: "featured",
  },
  {
    id: "pichincha",
    title: "Pichincha: La Noche Roja",
    subtitle: "Mafia y Prostitución",
    category: "BAJOS FONDOS",
    excerpt:
      "Crónica inmersiva por los pasillos del barrio que nunca dormía bajo el imperio de la Zwi Migdal.",
    image: "/inmersivo-pichincha.webp",
    duration: "15 min",
    layout: "tall",
  },
  {
    id: "arquitectura-ferroviaria",
    title: "Catedrales de Hierro",
    subtitle: "El Legado Inglés",
    category: "URBANISMO",
    excerpt:
      "El auge ferroviario que transformó a Rosario. Un viaje por terminales olvidadas.",
    image: "/inmersivo-ferrocarril.webp",
    duration: "10 min",
    layout: "wide",
  },
  {
    id: "parana-misterioso",
    title: "El Día de la Comuna Rosarina",
    subtitle: "Luchas Obreras",
    category: "LUCHAS OBRERAS",
    excerpt:
      "1921: Obreros y estudiantes anarquistas toman el Palacio de los Leones. Una jornada revolucionaria que desafió al poder municipal de Rosario.",
    image: "/huelga-anarquista-rosario.webp",
    duration: "18 min",
    layout: "wide",
  },
  {
    id: "mafia-rosarina",
    title: "Guerra de Chichos",
    subtitle: "Crimen Organizado",
    category: "HISTORIA NEGRA",
    excerpt:
      "La disputa de poder entre Chicho Grande y Chicho Chico que marcó una era en la Chicago Argentina.",
    image: "/guerra-de-chichos.webp",
    duration: "20 min",
    layout: "tall",
  },
];

const ChroniclesHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="chronicles-hub-container">
      {/* Botón Volver - Respetando tu ruta al Portal */}
      <Link to="/" className="back-portal-btn">
        <span className="btn-line"></span>
        <span className="btn-text">VOLVER AL PORTAL</span>
      </Link>

      <header className="hub-intro">
        <span className="archive-label">ARCHIVO DE LA CIUDAD INVISIBLE</span>
        <h1 className="hub-main-title">
          Crónicas <br />
          <span>Inmersivas</span>
        </h1>
        <div className="hub-description">
          <p>
            Experiencias narrativas diseñadas para ser habitadas. Relatos donde
            el <strong>rigor histórico</strong> converge con la tecnología
            interactiva.
          </p>
        </div>
      </header>

      <section className="chronicles-grid">
        {chronicles.map((item) => {
          const layoutClass = item.layout || "normal";
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

