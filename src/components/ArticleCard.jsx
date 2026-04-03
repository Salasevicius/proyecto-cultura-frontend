import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from "../config";
import LazyImage from './LazyImage'; // Ajusta la ruta según tu carpeta

const ArticleCard = ({ noticia, isLoggedIn, onActionSuccess, onEditClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const currentUserId = localStorage.getItem('userId');
  const isOwner = isLoggedIn && noticia.userId === currentUserId;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.disconnect();
    };
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar tu artículo?")) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/articles/${noticia._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        alert("Artículo eliminado con éxito");
        onActionSuccess();
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("Error de conexión al intentar borrar.");
    }
  };

  return (
    <article 
      ref={cardRef} 
      className={`card ${isVisible ? 'is-visible' : ''}`}
    >
      <LazyImage 
  src={noticia.imageUrl} 
  alt={noticia.title} 
  className="card-image" 
/>
      <div className="card-content">
        <span className="category-tag">{noticia.category}</span>
        <h3>{noticia.title}</h3>
        <p>{noticia.description}</p>

        <div className="card-footer-actions">
          <Link to={`/articulo/${noticia._id}`} className="btn-read">
            Leer artículo
          </Link>

          {isOwner && (
            <div className="admin-actions">
              <button onClick={() => onEditClick(noticia)} className="btn-edit">
                ✏️
              </button>
              <button onClick={handleDelete} className="btn-delete">
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;