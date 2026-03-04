import React, { useState } from 'react';

const CreateArticleModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Destacados',
    imageUrl: '' // Aquí el usuario pegará la ruta de la imagen
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('${API_URL}/api/articles', {
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
        onSuccess(); // Refresca la lista de noticias
        onClose();   // Cierra el modal
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
          <input
            type="text"
            placeholder="Título del artículo"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Breve descripción (copete)"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <textarea
            className="content-area"
            placeholder="Contenido completo del artículo..."
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
          <select onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value="Destacados">Destacados</option>
            <option value="Microbiografías">Microbiografías</option>
            <option value="Literarios">Literarios</option>
            <option value="Periodísticos">Periodísticos</option>
            <option value="Opinión">Opinión</option>
          </select>
          <input
            type="text"
            placeholder="Ruta de la imagen (ej: /imagen.webp)"
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