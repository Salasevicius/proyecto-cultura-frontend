import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedArticle.css';

const FeaturedArticle = ({ noticia, noticiasSecundarias }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  if (!noticia) return null;

  return (
    <section className="featured-wrapper">
      <div className={`featured-main-card ${isOpen ? 'sidebar-open' : ''}`}>
        
        {/* Contenido principal: Nota de Tapa */}
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

        {/* Apéndice (Sidebar Integrada) */}
        <aside className="featured-sidebar">
          <h3 className="sidebar-subtitle">RELACIONADAS</h3>
          <div className="sidebar-scroll-area">
            {noticiasSecundarias?.map((n) => (
              <div key={n._id} className="sidebar-row" onClick={() => navigate(`/articulo/${n._id}`)}>
                <span>{n.category}</span>
                <h4>{n.title}</h4>
              </div>
            ))}
          </div>
        </aside>

        {/* Botón de Despliegue Lateral */}
        <button 
          className="sidebar-toggle" 
          onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        >
          <span className="toggle-icon">{isOpen ? '✕' : '→'}</span>
          <span className="toggle-text">{isOpen ? 'CERRAR' : 'MÁS'}</span>
        </button>
      </div>
    </section>
  );
};

export default FeaturedArticle;