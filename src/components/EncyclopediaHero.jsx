import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  Building2, Palette, Trophy, Landmark, 
  Camera, Map, Compass, Newspaper, Search, ArrowRight, Sparkles, Compass as CompassRose 
} from 'lucide-react';
import './EncyclopediaHero.css';

const THEMATIC_NODES = [
  { id: 'arte', title: 'Arte y Cultura', subtitle: 'Vanguardias & Trova', desc: 'Desde los pioneros de la pintura hasta la eclosión musical de la Trova Rosarina y las salas teatrales del siglo XX.', icon: Palette, image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200', route: '/temas/arte' },
  { id: 'arquitectura', title: 'Arquitectura', subtitle: 'Belle Époque & Palacios', desc: 'Un recorrido por el trazado de la ciudad, sus residencias neoclásicas, avenidas históricas y la monumentalidad del Frente Fluvial.', icon: Building2, image: 'public/antonio-berni.webp', route: '/temas/arquitectura' },
  { id: 'deportes', title: 'Deportes', subtitle: 'Génesis & Pasión Decana', desc: 'La cuna del fútbol argentino, la génesis de sus clubes centenarios y las epopeyas deportivas de la ciudad.', icon: Trophy, image: 'public/deporte.jpeg', route: '/temas/deportes' },
  { id: 'economia', title: 'Economía y Sociedad', subtitle: 'La Chicago Argentina', desc: 'La explosión agroexportadora, el auge portuario, los movimientos obreros y la transformación industrial.', icon: Landmark, image: 'public/economia.jpg', route: '/temas/economia' },
  { id: 'fotografia', title: 'Fotografía Histórica', subtitle: 'Memoria Visual', desc: 'Daguerrotipos, placas de vidrio y registros fotográficos inéditos que documentan la vida cotidiana desde 1860.', icon: Camera, image: 'public/aduana-rosario.webp', route: '/temas/fotografia' },
  { id: 'geografia', title: 'Mapas', subtitle: 'Cartografía del Paraná', desc: 'Planos antiguos del trazado urbano, cartas náuticas del río y la evolución territorial de Rosario.', icon: Map, image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200', route: '/temas/geografia' },
  { id: 'arqueologia', title: 'Arqueología Urbana', subtitle: 'Vestigios Ocultos', desc: 'El rescate de túneles, cimientos coloniales y hallazgos materiales ocultos bajo el casco histórico.', icon: Compass, image: 'public/inmersivo-ferrocarril.webp', route: '/temas/arqueologia' },
  { id: 'articulos', title: 'Artículos', subtitle: 'Archivo Periodístico', desc: 'Acceso directo al archivo de crónicas, investigación periodística, publicaciones históricas y artículos de época.', icon: Newspaper, image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200', route: '/articulos' },
  { id: 'periodicos', title: 'Periódicos', subtitle: 'Archivo Periodístico', desc: 'Acceso directo al archivo de crónicas, investigación periodística, publicaciones históricas y artículos de época.', icon: Newspaper, image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200', route: '/articulos' }
];

export default function EncyclopediaHero() {
  const [activeTheme, setActiveTheme] = useState(THEMATIC_NODES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const infoRef = useRef(null);
  const fogRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Desvelado cinemático extendido (Evaporación ultralenta y vaporosa)
      gsap.fromTo(fogRef.current,
        { 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(40px)' 
        },
        { 
          opacity: 0, 
          scale: 1.6, 
          filter: 'blur(90px)', 
          duration: 3.8, // Duración extendida para dramatismo cinemático
          ease: 'power3.inOut', // Entrada suave y disipación lenta en el centro
          delay: 0.2,
          onComplete: () => {
            if (fogRef.current) fogRef.current.style.display = 'none';
          }
        }
      );

      // 2. Emergencia del Núcleo Central a través de la calima (Empieza al 40% del desvelado)
      gsap.fromTo('.orbital-center-interactive', 
        { scale: 0.82, opacity: 0, filter: 'blur(10px)' }, 
        { 
          scale: 1, 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 2.2, 
          ease: 'power2.out', 
          delay: 1.2 
        }
      );

      // 3. Aparición escalonada del anillo de nodos
      gsap.fromTo('.node-orbital-item', 
        { scale: 0.5, opacity: 0 }, 
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.4, 
          stagger: 0.08, 
          ease: 'power3.out', 
          delay: 1.8 
        }
      );

      // 4. Deslizamiento final del panel ornamental de contenido
      gsap.fromTo('.orbital-info-panel-vertical', 
        { x: 50, opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 1.8, 
          ease: 'power3.out', 
          delay: 2.1 
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSelectNode = (node) => {
    if (node.id === activeTheme.id) return;

    gsap.to(bgRef.current, { opacity: 0.35, duration: 0.2, onComplete: () => {
      setActiveTheme(node);
      gsap.to(bgRef.current, { opacity: 1, duration: 0.45 });
    }});

    gsap.fromTo(infoRef.current, 
      { opacity: 0.6, y: 10 }, 
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/articulos?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="orbital-hero-section" ref={heroRef}>
      
      {/* CORTINA DE HUMO / NIEBLA BLANQUECINA */}
      <div className="orbital-fog-curtain" ref={fogRef}>
        <div className="fog-layer fog-core" />
        <div className="fog-layer fog-mist" />
      </div>

      {/* CAPA DE FONDO CINEMÁTICO */}
      <div className="orbital-bg-wrapper">
        <div 
          ref={bgRef}
          className="orbital-bg-image" 
          style={{ backgroundImage: `url(${activeTheme.image})` }}
        />
        <div className="orbital-overlay-light" />
        <div className="orbital-vignette-subtle" />
      </div>

      {/* DETALLES ORNAMENTALES */}
      <div className="ornament-coords">32°57'09"S — 60°39'29"W</div>
      <div className="ornament-compass">
        <CompassRose size={22} color="rgba(226, 180, 100, 0.35)" />
      </div>

      {/* HEADER ELEGANTE */}
      <header className="orbital-header">
        <div className="orbital-brand">
          <Sparkles size={18} color="#e2b464" />
          <div className="brand-text">
            <span className="brand-title">PROYECTO CULTURA</span>
            <span className="brand-sub">ENCICLOPEDIA DIGITAL</span>
          </div>
        </div>

        <form className="orbital-search-bar" onSubmit={handleSearch}>
          <Search size={15} color="#e2b464" />
          <input 
            type="text" 
            placeholder="Buscar en el acervo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </header>

      {/* LAYOUT PRINCIPAL */}
      <div className="orbital-main-layout">
        
        {/* LADO IZQUIERDO: SYSTEM */}
        <div className="orbital-viewport-area">
          <div className="orbital-system-large">
            <div className="orbital-ring-outer" />
            <div className="orbital-ring-inner" />

            {/* Núcleo Central */}
            <div className="orbital-center-interactive">
              <div className="center-glow" />
              <span className="center-tag">ROSARIO</span>
              <span className="center-title">ENCICLOPEDIA</span>
              <span className="center-sub">HISTÓRICA</span>
            </div>

            {/* Nodos Orbitales */}
            {THEMATIC_NODES.map((node, index) => {
              const IconComp = node.icon;
              const isActive = activeTheme.id === node.id;
              
              const angleDeg = index * (360 / THEMATIC_NODES.length) - 90;
              const angleRad = (angleDeg * Math.PI) / 180;
              
              return (
                <div
                  key={node.id}
                  className={`node-orbital-item ${isActive ? 'active' : ''}`}
                  style={{ '--angle': `${angleRad}rad` }}
                  onMouseEnter={() => handleSelectNode(node)}
                  onClick={() => handleSelectNode(node)}
                >
                  <div className="node-orbital-circle">
                    <IconComp size={25} />
                  </div>
                  <span className="node-orbital-label">{node.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* LADO DERECHO: PANEL VERTICAL */}
        <aside className="orbital-info-panel-vertical" ref={infoRef}>
          <div className="panel-card-container">
            
            {/* Esquinas filigrana ornamentales */}
            <div className="corner-ornament top-left" />
            <div className="corner-ornament top-right" />
            <div className="corner-ornament bottom-left" />
            <div className="corner-ornament bottom-right" />

            <div className="panel-image-wrapper">
              <img src={activeTheme.image} alt={activeTheme.title} />
              <div className="panel-image-badge">EJE TEMÁTICO</div>
            </div>

            <div className="panel-body-content">
              <h2 className="panel-title">{activeTheme.title}</h2>
              <h4 className="panel-subtitle">{activeTheme.subtitle}</h4>
              <div className="panel-divider" />
              <p className="panel-description">{activeTheme.desc}</p>

              <button 
                className="panel-action-btn"
                onClick={() => navigate(activeTheme.route)}
              >
                <span>EXPLORAR SALA</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </aside>

      </div>
    </section>
  );
}