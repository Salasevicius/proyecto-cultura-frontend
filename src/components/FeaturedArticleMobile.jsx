import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedArticleMobile.css';
import LazyImage from './LazyImage';

const FeaturedArticleMobile = ({ noticia, noticiasSecundarias }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!noticia) return null;

  return (
    <section className="fam-wrapper">
      <div className="fam-card">
        {/* Capa 1: Imagen */}
        <div className="fam-image-container">
          <LazyImage 
            src={noticia.imageUrl} 
            alt={noticia.title} 
            className="fam-img" 
          />
        </div>

        {/* Capa 2: Overlay y Contenido */}
        <div className="fam-overlay">
          <span className="fam-tag">ARTÍCULO DEL DÍA</span>

          <div className="fam-text-block">
            <span className="fam-category">{noticia.category}</span>
            <h2 className="fam-title">{noticia.title}</h2>
            <p className="fam-description">{noticia.description}</p>
            
            {/* Contenedor de Acciones en línea */}
            <div className="fam-actions">
              <button 
                className="fam-btn-read" 
                onClick={() => navigate(`/articulo/${noticia._id}`)}
              >
                Leer más →
              </button>

              <button 
                className="fam-btn-listen"
                aria-label="Escuchar artículo" 
                onClick={(e) => { e.stopPropagation(); alert('La función de audio estará disponible próximamente!'); }}
              >
                Escuchar 🎧
              </button>
            </div>
          </div>
        </div> {/* Cierre correcto de fam-overlay */}

        {/* Capa 3: Botón Toggle Relacionados */}
        <button 
          className="fam-toggle" 
          onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        >
          <span>{isOpen ? '✕ CERRAR' : '→ CLICK PARA MÁS ARTÍCULOS DEL DÍA'}</span>
        </button>
      </div>
      
      {/* Sidebar de Artículos Relacionados */}
      <aside className={`fam-sidebar ${isOpen ? 'is-open' : ''}`}>
        <h3 className="fam-sidebar-title">ARTÍCULOS RELACIONADOS</h3>
        <div className="fam-sidebar-list">
          {noticiasSecundarias?.map((n) => (
            <div 
              key={n._id} 
              className="fam-sidebar-item" 
              onClick={() => navigate(`/articulo/${n._id}`)}
            >
              <span className="fam-item-cat">{n.category}</span>
              <h4 className="fam-item-title">{n.title}</h4>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
};

export default FeaturedArticleMobile;