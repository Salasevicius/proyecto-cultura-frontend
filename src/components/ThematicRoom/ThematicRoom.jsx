import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Search, ArrowLeft } from 'lucide-react';
import { thematicRoomData } from './mockData';
import './ThematicRoom.css';

gsap.registerPlugin(ScrollTrigger);

export const ThematicRoom = ({ onReturn }) => {
  const { header, categorias } = thematicRoomData;
  const [categoriaActivaId, setCategoriaActivaId] = useState(categorias[0].id);
  const [articuloActivoIdx, setArticuloActivoIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const cardRef = useRef(null);

  const catSeleccionada = categorias.find(cat => cat.id === categoriaActivaId) || categorias[0];
  const articuloActual = catSeleccionada?.articulos[articuloActivoIdx] || catSeleccionada?.articulos[0];

  // 1. Animaciones iniciales GSAP (Entrada y Parallax)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(heroTitleRef.current, 
        { y: 45, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.1 }
      )
      .fromTo(heroSubtitleRef.current, 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        "-=0.6"
      );

      // Parallax sutil en el Hero
      gsap.to(heroImageRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Animación al cambiar de categoría
  useEffect(() => {
    if (heroImageRef.current) {
      gsap.fromTo(
        heroImageRef.current,
        { opacity: 0.2, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [categoriaActivaId]);

  const handleCambioCategoria = (cat) => {
    if (cat.id === categoriaActivaId) return;

    setCategoriaActivaId(cat.id);
    setArticuloActivoIdx(0);

    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleAbrirLectura = (titulo) => {
    alert(`Navegando al expediente completo: "${titulo}"`);
  };

  const handleScrollToContent = () => {
    const contentSection = document.getElementById('editorial-content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <section className="thematic-room-container">
        
      {/* 1. HERO COMPACTO & HEADER AISLADO */}
      <header className="hero-viewport-header" ref={heroRef} style={{ '--theme-color': catSeleccionada.temaColor }}>
        
        {/* HEADER SUPERIOR EXCLUSIVO */}
        <div className="visor-orbital-header">
          <div className="visor-orbital-brand">
            <Sparkles size={16} color="#e2b464" />
            <div className="visor-brand-text">
              <span className="visor-brand-title">PROYECTO CULTURA</span>
              <span className="visor-brand-sub">ENCICLOPEDIA DIGITAL</span>
            </div>
          </div>

          <form className="visor-orbital-search-bar" onSubmit={handleSearch}>
            <Search size={15} color="#e2b464" />
            <input 
              type="text" 
              placeholder="Buscar en el acervo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <div className="visor-orbital-header-actions">
            <button className="visor-orbital-back-btn" onClick={onReturn}>
              <ArrowLeft size={15} color="#e2b464" />
              <span>Volver al Atlas</span>
            </button>
          </div>
        </div>

        <div className="hero-bg-wrapper">
          <img 
            ref={heroImageRef}
            src={catSeleccionada.imagenFondo} 
            alt={`Fondo ${catSeleccionada.nombre}`} 
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content-floating">
          <h1 className="hero-monumental-title" ref={heroTitleRef}>{header.title}</h1>
          <p className="hero-monumental-subtitle" ref={heroSubtitleRef}>{header.subtitle}</p>
        </div>

        {/* 1.1. SISTEMA ORBITAL MÓVIL FLOTANTE */}
        <div className="mobile-orbital-container-wrapper">
          <div className="orbital-system-large">
            <div className="orbital-ring-outer"></div>
            <div className="orbital-ring-inner"></div>

            <div className="orbital-center-interactive" onClick={handleScrollToContent}>
              <div className="center-glow"></div>
              <span className="center-tag">ACERVO</span>
              <span className="center-title">{catSeleccionada.numeroRomano}</span>
              <span className="center-sub">EXPLORAR</span>
            </div>

            {categorias.map((cat, index) => {
              const angleDeg = index * (360 / categorias.length) - 90; 
              const isActivo = categoriaActivaId === cat.id;

              return (
                <div
                  key={cat.id}
                  className={`node-orbital-item ${isActivo ? 'active' : ''}`}
                  style={{ 
                    '--angle': `${angleDeg}deg`,
                    '--theme-color': cat.temaColor 
                  }}
                  onClick={() => handleCambioCategoria(cat)}
                >
                  <div className="node-orbital-circle">
                    <span className="nav-btn-romano">{cat.numeroRomano}</span>
                  </div>
                  <span className="node-orbital-label">{cat.nombre}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* INDICADOR SOFISTICADO (Desktop) */}
        <button className="hero-sophisticated-scroll-trigger" onClick={handleScrollToContent}>
          <span className="scroll-trigger-label">Explorar nuestra</span>
          <span className="scroll-trigger-theme">{catSeleccionada.nombre}</span>
          <span className="scroll-trigger-glyph">↓</span>
        </button>
      </header>

      {/* 2. BUTTON NAV (Desktop) */}
      <nav className="full-width-nav-bar" aria-label="Navegación por disciplinas">
        <div className="nav-grid-container">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              style={{ '--theme-color': cat.temaColor }}
              className={`nav-item-btn ${categoriaActivaId === cat.id ? 'active' : ''}`}
              onClick={() => handleCambioCategoria(cat)}
            >
              <div className="nav-btn-header">
                <span className="nav-btn-romano">{cat.numeroRomano}</span>
                <span className="nav-btn-nombre">{cat.nombre}</span>
              </div>
              <span className="nav-btn-disciplina">{cat.disciplina}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 3. CONTENIDO PRINCIPAL */}
      <main id="editorial-content-section" className="thematic-content-area">
        {articuloActual && (
          <div className="asymmetric-grid" ref={cardRef}>
            
            {/* Columna Editorial Principal */}
            <article 
              className="main-editorial-card" 
              style={{ '--theme-color': catSeleccionada.temaColor }}
            >
              <div className="editorial-border-inner">
                <div className="editorial-corner-bottom"></div>
                
                <div className="card-header-badge">
                  <span className="badge-lacre">{catSeleccionada.disciplina}</span>
                  <span className="badge-count">{catSeleccionada.obrasContadas}</span>
                </div>

                <h2 className="editorial-title">{articuloActual.titulo}</h2>

                <div className="editorial-text-wrapper">
                  <span className="capitular-letter">{articuloActual.capitular}</span>
                  {articuloActual.textoIntroductorio}
                </div>

                <div className="editorial-media-container">
                  <img 
                    src={articuloActual.imagen} 
                    alt={articuloActual.titulo} 
                  />
                </div>

                <div className="hero-quote-box">
                  <span className="quote-watermark">“</span>
                  <p className="quote-text">"{articuloActual.citaTextual}"</p>
                  <span className="quote-author">— {articuloActual.autorCita}</span>
                </div>

                <div className="read-action-container">
                  <button 
                    className="btn-read-article"
                    onClick={() => handleAbrirLectura(articuloActual.titulo)}
                  >
                    <span>Explorar Expediente Completo</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>

                <footer className="editorial-footer-meta">
                  <span>FECHA: {articuloActual.fecha}</span>
                  <span>UBICACIÓN: {articuloActual.coordenadas}</span>
                </footer>

              </div>
            </article>

            {/* Sidebar con Ficha Técnica y Artículos Relacionados */}
            <aside className="sidebar-archive">
              <div className="sidebar-block">
                <h3 className="sidebar-title">Ficha Técnica</h3>
                <ul className="marginal-list">
                  {articuloActual.notasMarginales?.map((nota, idx) => (
                    <li key={idx} className="marginal-item">{nota}</li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-block">
                <h3 className="sidebar-title">Lecturas Vinculadas</h3>
                <div className="related-articles-list">
                  {articuloActual.relacionados?.map((rel) => (
                    <div 
                      key={rel.id} 
                      className="related-article-card"
                      onClick={() => handleAbrirLectura(rel.titulo)}
                    >
                      <div className="related-img-wrapper">
                        <img src={rel.imagen} alt={rel.titulo} />
                      </div>
                      <div className="related-content">
                        <span className="related-tag">{rel.tag}</span>
                        <h4 className="related-title">{rel.titulo}</h4>
                        <p className="related-bajada">{rel.bajada}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        )}
      </main>

    </section>
  );
};

export default ThematicRoom;