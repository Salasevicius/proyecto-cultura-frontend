import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedArticle.css';

const FeaturedArticle = ({ noticia, noticiasSecundarias }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleScroll = () => {
      if (window.innerWidth > 768 && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollPosition = window.innerHeight - rect.top;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setOffset(scrollPosition * 0.25); 
          const opacityProgress = Math.min(Math.max(scrollPosition / 400, 0), 1);
          sectionRef.current.style.setProperty('--shadow-opacity', opacityProgress);
        }
      } else if (offset !== 0) {
        setOffset(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      if (sectionRef.current) observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]);
  
  if (!noticia) return null;

  return (
    <section 
      className={`featured-wrapper ${isVisible ? 'is-visible' : ''}`} 
      ref={sectionRef}
      style={{ 
        '--parallax-offset': (window.innerWidth > 768 && isVisible) ? `${offset}px` : '0px'
      }}
    >
      <div className={`featured-main-card ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Lógica de navegación en el contenido principal */}
        <div className="featured-content" onClick={() => navigate(`/articulo/${noticia._id}`)}>
          <div className="featured-img-container">
            <img src={noticia.imageUrl} alt={noticia.title} />
          </div>
          <div className="featured-text">
            <div className="featured-tag">ARTÍCULO DEL DÍA</div>
            <span className="feat-cat">{noticia.category}</span>
            <h2 className="feat-title">{noticia.title}</h2>
            <p className="feat-desc">{noticia.description}</p>
            <button className="feat-link">Leer más</button>
          </div>
        </div>

        {/* El Cajón Lateral (Relacionadas) */}
        <aside className="featured-sidebar">
          <h3 className="sidebar-subtitle">ARTÍCULOS RELACIONADOS</h3>
          <div className="sidebar-scroll-area">
            {noticiasSecundarias?.map((n) => (
              <div key={n._id} className="sidebar-row" onClick={() => navigate(`/articulo/${n._id}`)}>
                <span className="sidebar-cat">{n.category}</span>
                <h4 className="sidebar-item-title">{n.title}</h4>
              </div>
            ))}
          </div>
        </aside>

        {/* Botón Toggle */}
        <button 
          className="sidebar-toggle" 
          onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        >
          <span className="toggle-icon">{isOpen ? '✕' : '→'}</span>
          <span className="toggle-text">{isOpen ? 'CERRAR' : 'MÁS ARTÍCULOS DEL DÍA'}</span>
        </button>
      </div>
    </section>
  );
};

export default FeaturedArticle;