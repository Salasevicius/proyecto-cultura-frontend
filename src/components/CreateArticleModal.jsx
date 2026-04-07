import React, { useState } from 'react';
import { API_URL } from "../config"; 

const CreateArticleModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '', // Campo de autor inicializado
    description: '',
    content: '',
    category: 'Destacados',
    imageUrl: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        alert("¡Artículo publicado con éxito!");
        onSuccess(); 
        onClose();   
      } else {
        alert("Error al publicar: " + JSON.stringify(result.error));
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nueva Crónica Rosarina</h2>
        <form onSubmit={handleSubmit} className="create-form">
          {/* CAMPO: Título */}
          <input
            type="text"
            placeholder="Título del artículo"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          {/* NUEVO CAMPO: Autor (Obligatorio para que el usuario pueda escribirlo) */}
          <input
            type="text"
            placeholder="Nombre del autor (ej: Juan Sasturain)"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />

          {/* CAMPO: Copete */}
          <textarea
            placeholder="Breve descripción (copete)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          {/* CAMPO: Contenido Completo */}
          <textarea
            className="content-area"
            placeholder="Contenido completo del artículo..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />

          {/* SELECCIÓN: Categoría (Sincronizada con el Backend) */}
          <select 
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Destacados">Destacados</option>
            <option value="Microbiografías">Microbiografías</option>
            <option value="Literarios">Literarios</option>
            <option value="Periodísticos">Periodísticos</option>
            <option value="Opinión">Opinión</option>
          </select>

          {/* CAMPO: Imagen */}
          <input
            type="text"
            placeholder="Ruta de la imagen (ej: /images/la-chicago.webp)"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            required
          />

          <div className="form-buttons">
            <button type="submit" className="btn-save">Publicar</button>
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticleModal;