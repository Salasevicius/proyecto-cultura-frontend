import React from 'react';
// Importamos Link para la navegación interna
import { Link } from 'react-router-dom';

const ArticleCard = ({ noticia, isLoggedIn, onActionSuccess, onEditClick }) => {
  // 1. Obtenemos el ID del usuario logueado desde el storage
  const currentUserId = localStorage.getItem('userId');

  // 2. ¿Es el autor de esta noticia?
  const isOwner = isLoggedIn && noticia.userId === currentUserId;

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar tu artículo?")) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/articles/${noticia._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

        <div className="card-footer-actions" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* BOTÓN "LEER": El punto clave de la navegación */}
          <Link
            to={`/articulo/${noticia._id}`}
            className="btn-read"
            style={{
              textDecoration: 'none',
              color: '#ff6f61',
              fontWeight: 'bold',
              border: '1px solid #ff6f61',
              padding: '5px 15px',
              borderRadius: '4px'
            }}
          >
            Leer artículo
          </Link>

          {/* Lógica de Autoría (Edición y Borrado) */}
          {isOwner && (
            <div className="admin-actions" style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => onEditClick(noticia)}
                className="btn-edit"
                style={{ padding: '5px 10px', cursor: 'pointer', background: '#eee', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                ✏️
              </button>
              <button
                onClick={handleDelete}
                className="btn-delete"
                style={{ background: '#d9534f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >
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