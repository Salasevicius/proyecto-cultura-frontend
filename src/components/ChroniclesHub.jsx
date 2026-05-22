import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChroniclesHub.css';

const chronicles = [
  {
    id: 'enzo-bordabehere',
    title: 'El Duelo de Bordabehere',
    subtitle: 'Rosario, 1935',
    category: 'POLÍTICA',
    excerpt: 'Una reconstrucción cinematográfica del asesinato que sacudió al Senado de la Nación.',
    image: '/inmersivo-bordabehere.png',
    duration: '12 min',
    featured: true
  },
  {
    id: 'pichincha',
    title: 'Pichincha: La Noche Roja',
    subtitle: 'Mafia y Prostitución',
    category: 'BAJOS FONDOS',
    excerpt: 'Crónica inmersiva por los pasillos del barrio que nunca dormía bajo el imperio de la Zwi Migdal.',
    image: '/inmersivo-pichincha.png',
    duration: '15 min',
    featured: false
  },
  {
    id: 'arquitectura-ferroviaria',
    title: 'Catedrales de Hierro',
    subtitle: 'El Legado Inglés',
    category: 'URBANISMO',
    excerpt: 'El auge ferroviario que transformó a Rosario. Un viaje por terminales olvidadas.',
    image: '/inmersivo-ferrocarril.png',
    duration: '10 min',
    featured: false
  },
  {
    id: 'parana-misterioso',
    title: 'Secretos del Gran Río',
    subtitle: 'Leyendas del Agua',
    category: 'MITOLOGÍA',
    excerpt: 'Desde naufragios fantasmales hasta las islas que cambian de forma. El río cuenta su historia.',
    image: '/assets/images/river-secrets.jpg',
    duration: '18 min',
    featured: true
  },
  {
    id: 'mafia-rosarina',
    title: 'Guerra de Chichos',
    subtitle: 'Crimen Organizado',
    category: 'HISTORIA NEGRA',
    excerpt: 'La disputa de poder entre Chicho Grande y Chicho Chico que marcó una era en la Chicago Argentina.',
    image: '/assets/images/mafia.jpg',
    duration: '20 min',
    featured: false
  }
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
        <h1 className="hub-main-title">Crónicas <br/><span>Inmersivas</span></h1>
        <div className="hub-description">
          <p>Experiencias narrativas diseñadas para ser habitadas. Relatos donde el <strong>rigor histórico</strong> converge con la tecnología interactiva.</p>
        </div>
      </header>

      <section className="chronicles-grid">
        {chronicles.map((item) => (
          <div key={item.id} className={`chronicle-card-item ${item.featured ? 'featured' : ''}`}>
            <div className="card-visual-container">
              <img src={item.image} alt={item.title} className="card-img" />
              <div className="card-category-tag">{item.category}</div>
              
              <div className="card-overlay-info">
                <span className="duration-tag">{item.duration} DE LECTURA</span>
                <p className="card-excerpt">{item.excerpt}</p>
                {/* Ruta dinámica respetada */}
                <Link to={`/cronica/${item.id}`} className="enter-experience-btn">
                  INICIAR EXPERIENCIA
                </Link>
              </div>
            </div>
            
            <div className="card-text-content">
              <span className="card-subtitle">{item.subtitle}</span>
              <h2 className="card-title">{item.title}</h2>
            </div>
          </div>
        ))}
      </section>

      <footer className="hub-footer-decoration">
        <span className="decor-line"></span>
        <p>PROYECTO CULTURA — ROSARIO, ARGENTINA</p>
      </footer>
    </main>
  );
};

export default ChroniclesHub;