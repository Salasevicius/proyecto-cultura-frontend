import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from "../config";

const ArticleCard = ({ noticia, isLoggedIn, onActionSuccess, onEditClick }) => {
  const currentUserId = localStorage.getItem('userId');
  const isOwner = isLoggedIn && noticia.userId === currentUserId;

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
    <article className="card">
      <img src={noticia.imageUrl} alt={noticia.title} className="card-image" />
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