// src/components/InteractiveHero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import './InteractiveHero.css';

// Lista de los 10 nodos temáticos solicitados
const NODES_DATA = [
  { id: 'arquitectura', label: 'Arquitectura y Urbanismo', icon: '🏛️', description: 'Explora la belle époque rosarina, pasajes históricos y la evolución urbana de Rosario.' },
  { id: 'arte', label: 'Arte', icon: '🎨', description: 'Obras, artistas plásticos, exposiciones y manifestaciones artísticas emblemáticas.' },
  { id: 'deporte', label: 'Deporte', icon: '⚽', description: 'La rica historia deportiva rosarina, clubes fundacionales y grandes figuras.' },
  { id: 'musica', label: 'Música', icon: '🎼', description: 'Desde los orígenes del tango y el folclore hasta la consolidación de la Trova Rosarina.' },
  { id: 'articulos', label: 'Artículos', icon: '📚', description: 'Biografías, relatos literarios, análisis periodísticos y artículos de opinión.' },
  { id: 'arqueologia', label: 'Arqueología Urbana', icon: '🏺', description: 'Vestigios subterráneos, túneles e investigaciones arqueológicas en Rosario.' },
  { id: 'periodicos', label: 'Periódicos', icon: '📰', description: 'Hemeroteca histórica, crónicas de prensa y publicaciones de época.' },
  { id: 'fotografia', label: 'Fotografía', icon: '📷', description: 'Registros fotográficos antiguos, postales históricas y memoria visual.' },
  { id: 'historia', label: 'Historia', icon: '📜', description: 'Sucesos decisivos, momentos históricos y la transformación social de la ciudad.' },
  { id: 'economia', label: 'Economía y Sociedad', icon: '⚖️', description: 'Desarrollo industrial, puerto, movimientos obreros y dinámicas comerciales.' }
];

// Hitos para la línea de tiempo inferior
const TIMELINE_MILESTONES = [
  { year: '1730', label: 'Origen' },
  { year: '1852', label: 'Ciudad' },
  { year: '1889', label: 'Puerto' },
  { year: '1930', label: 'Belle Époque' },
  { year: '1969', label: 'Rosariazo' },
  { year: '1982', label: 'Trova' },
  { year: '2000+', label: 'Siglo XXI' }
];

const InteractiveHero = ({ bgImage = '/hero-bg.webp', isLoggedIn, onLogout }) => {
  const [selectedNode, setSelectedNode] = useState(NODES_DATA[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Live search debounced
  useEffect(() => {
    const timer = setTimeout(async () => {
      const query = searchTerm.trim();
      if (query.length > 2) {
        try {
          const res = await fetch(`${API_URL}/api/articles?search=${encodeURIComponent(query)}`);
          const data = await res.json();
          if (data.success) {
            setSearchResults(data.data.slice(0, 5));
            setShowSearchResults(true);
          }
        } catch (err) {
          console.error('Error en búsqueda:', err);
        }
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Click outside para cerrar el dropdown del buscador
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearchResults(false);
    }
  };

  return (
    <section 
      className="interactive-hero"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content-wrapper">
        {/* 1. HEADER SUPERIOR */}
        <header className="hero-header">
          <div className="hero-brand-logo">
            <h2 className="hero-brand-title">Proyecto Cultura</h2>
            <span className="hero-brand-subtitle">Enciclopedia Histórica Digital de Rosario</span>
          </div>

          <div className="hero-main-title">
            <h1>Enciclopedia Digital Histórica de Rosario</h1>
          </div>

          <div style={{ position: 'relative' }}>
            <button 
              className="hero-hamburger-btn" 
              onClick={() => setMenuOpen(!menuOpen)}
              title="Menú Principal"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {menuOpen && (
              <div className="hero-nav-menu">
                <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
                <Link to="/cronologia" onClick={() => setMenuOpen(false)}>Línea de Tiempo</Link>
                <Link to="/cronicas-hub" onClick={() => setMenuOpen(false)}>Crónicas Inmersivas</Link>
                <Link to="/?category=Destacados" onClick={() => setMenuOpen(false)}>Destacados</Link>
                {isLoggedIn && (
                  <button onClick={() => { onLogout(); setMenuOpen(false); }}>
                    Cerrar Sesión
                  </button>
                )}
              </div>
            )}
          </div>
        </header>

        {/* 2. CUERPO CENTRAL (PANEL IZQUIERDO + ESFERA DE NODOS) */}
        <div className="hero-body">
          {/* Panel Izquierdo: Buscador + Card del Nodo */}
          <div className="hero-left-panel">
            {/* Buscador */}
            <div className="hero-search-box" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="hero-search-form">
                <input
                  type="text"
                  placeholder="Buscar en la enciclopedia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm.trim().length > 2 && setShowSearchResults(true)}
                />
                <button type="submit">🔍</button>
              </form>

              {showSearchResults && (
                <div className="hero-search-dropdown">
                  {searchResults.length > 0 ? (
                    searchResults.map((art) => (
                      <Link 
                        key={art._id} 
                        to={`/articulo/${art._id}`} 
                        className="hero-search-item"
                        onClick={() => setShowSearchResults(false)}
                      >
                        <img src={art.imageUrl || '/placeholder.jpg'} alt="" />
                        <div className="hero-search-item-info">
                          <span className="hero-search-item-title">{art.title}</span>
                          <span className="hero-search-item-cat">{art.category}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div style={{ padding: '10px', fontSize: '0.8rem', color: '#888' }}>
                      Sin resultados encontradas
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tarjeta Informativa del Nodo */}
            <div className="hero-node-card">
              <div className="hero-node-card-header">
                <span className="hero-node-card-icon">{selectedNode.icon}</span>
                <h3 className="hero-node-card-title">{selectedNode.label}</h3>
              </div>
              <p className="hero-node-card-desc">{selectedNode.description}</p>
              <Link 
                to={`/?category=${encodeURIComponent(selectedNode.label)}`} 
                className="hero-node-btn"
              >
                Explorar {selectedNode.label} →
              </Link>
            </div>
          </div>

          {/* Esfera 3D de Nodos Temáticos */}
          <div className="hero-sphere-container">
            <div className="hero-sphere">
              {NODES_DATA.map((node, index) => {
                const total = NODES_DATA.length;
                const phi = Math.acos(-1 + (2 * index) / total);
                const theta = Math.sqrt(total * Math.PI) * phi;
                const radius = 140;

                const x = radius * Math.cos(theta) * Math.sin(phi);
                const y = radius * Math.sin(theta) * Math.sin(phi);
                const z = radius * Math.cos(phi);

                return (
                  <div
                    key={node.id}
                    className={`hero-node-item ${selectedNode.id === node.id ? 'selected' : ''}`}
                    style={{
                      transform: `translate3d(${x}px, ${y}px, ${z}px)`
                    }}
                    onClick={() => setSelectedNode(node)}
                  >
                    <span className="hero-node-icon">{node.icon}</span>
                    <span className="hero-node-label">{node.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. LÍNEA DE TIEMPO INFERIOR */}
        <div className="hero-timeline-bar">
          <span className="hero-timeline-title">Línea de Tiempo Histórica</span>
          <div className="hero-timeline-track">
            {TIMELINE_MILESTONES.map((item, idx) => (
              <button 
                key={idx} 
                className="hero-timeline-node"
                onClick={() => navigate('/cronologia')}
                title={`Ver hito: ${item.label}`}
              >
                {item.year} - {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHero;