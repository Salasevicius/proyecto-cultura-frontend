import React, { useState, useEffect, useRef } from 'react';
import TimelineDesktop from './TimelineDesktop';
import TimelineMobile from './TimelineMobile';
import './TimelineExperience.css';

export default function TimelineExperience() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [selectedHito, setSelectedHito] = useState(null);
  
  // Referencia para ajustar el scroll sobre el contenedor principal
  const experienceRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Encuadre inicial al montar el componente
  useEffect(() => {
    if (experienceRef.current) {
      // Ajuste suave alineado al inicio del contenedor
      experienceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleCloseDrawer = () => {
    setSelectedHito(null);
  };

  return (
    <div ref={experienceRef} className="experience-container">
      {/* Selector dinámico de viewport basado en breakpoints unificados */}
      {isMobile ? (
        <TimelineMobile onOpenHito={setSelectedHito} />
      ) : (
        <TimelineDesktop onOpenHito={setSelectedHito} />
      )}

      {/* Capa de desenfoque y bloqueo táctil/interactivo */}
      <div 
        className={`drawer-overlay ${selectedHito ? 'visible' : ''}`} 
        onClick={handleCloseDrawer}
      />

      {/* Contenedor inmersivo del Drawer (Alineado con las variables cromáticas de GSAP) */}
      <div 
        className={`immersive-drawer ${selectedHito ? 'open' : ''}`}
        style={{ '--hito-accent-color': selectedHito?.color || '#0d0d11' }}
      >
        {selectedHito && (
          <div className={`drawer-content-cinematic ${selectedHito.customClass || ''}`}>
            
            {/* Botón Superior de Cierre Estilo Premium */}
            <button className="drawer-close-premium" onClick={handleCloseDrawer} aria-label="Regresar al tapiz">
              <span className="close-label">REGRESAR AL TAPIZ</span>
              <div className="close-icon-circle">✕</div>
            </button>

            {/* Marca de agua monumental del año de fondo */}
            <div className="drawer-bg-watermark">{selectedHito.year}</div>

            {/* BARRA DE METADATA HISTORIOGRÁFICA (INFOGRAFÍA SUPERIOR) */}
            {selectedHito.metadata && (
              <div className="drawer-metadata-ribbon tab-pane-fade-cinematic">
                <div className="ribbon-item"><strong>Temporalidad:</strong> <span>{selectedHito.metadata.siglo}</span></div>
                <div className="ribbon-item"><strong>Periodo:</strong> <span>{selectedHito.metadata.periodo}</span></div>
                <div className="ribbon-item"><strong>Foco Espacial:</strong> <span>{selectedHito.metadata.eje}</span></div>
                <div className="ribbon-item"><strong>Sujetos Históricos:</strong> <span>{selectedHito.metadata.actores}</span></div>
              </div>
            )}

            {/* GRID PRINCIPAL DE EXPOSICIÓN MUSEOGRÁFICA */}
            <div className="drawer-grid-layout">
              
              {/* COLUMNA IZQUIERDA: Bloque Multimedia Estático y Títulos */}
              <div className="drawer-hero-panel">
                <div className="drawer-image-frame">
                  <img src={selectedHito.img} alt={selectedHito.title} className="drawer-main-img" />
                  <div className="drawer-img-shadow"></div>
                  <span className="drawer-year-badge">{selectedHito.year}</span>
                </div>
                
                <div className="drawer-title-block">
                  <span className="drawer-eyebrow-tag">{selectedHito.tag}</span>
                  <h2 className="drawer-headline">{selectedHito.title}</h2>
                  <div className="drawer-decorative-line"><span></span></div>
                </div>
              </div>

              {/* COLUMNA DERECHA: Datos, Métricas e Historiografía Pura */}
              <div className="drawer-data-panel tab-pane-fade-cinematic">
                
                {/* 1. Síntesis Epocal */}
                <div className="drawer-inner-section">
                  <h3 className="section-subtitle">Acontecimiento</h3>
                  <p className="drawer-lead-text">{selectedHito.desc}</p>
                </div>

                {/* 2. BLOQUE INFOGRÁFICO DE DATOS DUROS (Métricas Visuales) */}
                {selectedHito.infografia && (
                  <div className="drawer-inner-section">
                    <h3 className="section-subtitle">Indicadores y Estructura</h3>
                    <div className="drawer-infographic-grid">
                      {selectedHito.infografia.map((item, idx) => (
                        <div key={idx} className="info-card-data">
                          <span className="info-card-value">{item.valor}</span>
                          <span className="info-card-label">{item.etiqueta}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Análisis Geohistórico */}
                {selectedHito.contexto && (
                  <div className="drawer-inner-section">
                    <h3 className="section-subtitle">Análisis Crítico e Historiográfico</h3>
                    <div className="drawer-historical-box">
                      <p>{selectedHito.contexto}</p>
                    </div>
                  </div>
                )}

                {/* 4. BLOQUE DE DOCUMENTO DE ARCHIVO (Evidencia Primaria) */}
                {selectedHito.documentoArchivo && (
                  <div className="drawer-inner-section">
                    <h3 className="section-subtitle">Documento de Archivo (Fuentes Primarias)</h3>
                    <div className="drawer-archive-document">
                      <div className="document-texture-layer"></div>
                      <h4 className="document-title">
                        <i className="fa-solid fa-box-archive mr-2" style={{ color: 'rgba(217, 119, 6, 0.7)' }}></i>
                        {selectedHito.documentoArchivo.titulo}
                      </h4>
                      <p className="document-body-text">{selectedHito.documentoArchivo.texto}</p>
                    </div>
                  </div>
                )}

                {/* 5. Recursos Audiovisuales */}
                {selectedHito.videoUrl && (
                  <div className="drawer-inner-section">
                    <h3 className="section-subtitle">Cartografía Viva / Archivo Fílmico</h3>
                    <div className="drawer-video-container">
                      <iframe src={selectedHito.videoUrl} title={selectedHito.title} frameBorder="0" allowFullScreen></iframe>
                    </div>
                  </div>
                )}

                {/* 6. Fuentes Bibliográficas y Aparato Crítico */}
                {selectedHito.bibliografia && selectedHito.bibliografia.length > 0 && (
                  <div className="drawer-inner-section">
                    <h3 className="section-subtitle">Aparato Crítico y Fuentes</h3>
                    <ul className="drawer-sources-list">
                      {selectedHito.bibliografia.map((b, idx) => (
                        <li key={idx}>
                          <i className="fa-solid fa-book-bookmark mr-3 mt-1" style={{ color: 'rgba(245, 158, 11, 0.3)' }}></i>
                          <div>
                            <span className="source-book">"{b.fuente}"</span>
                            {b.autor && <span className="source-author"> — {b.autor}</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}