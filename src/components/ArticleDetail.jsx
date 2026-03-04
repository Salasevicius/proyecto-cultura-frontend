import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./ArticleDetail.css";
import { API_URL } from "../config"; // Asegúrate de que la ruta sea correcta

const ArticleDetail = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${API_URL}/api/articles/${id}`);
        const result = await response.json();
        if (result.success) {
          setNoticia(result.data);
        }
      } catch (error) {
        console.error("Error al cargar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div className="loading-screen">Cargando...</div>;
  if (!noticia) return <div className="error-screen">No se encontró el artículo.</div>;

  return (
    <main className="reader-page-bg"> {/* Cambié div por main para mejor estructura */}
      <article className="article-container">
        <header className="article-header">
          <Link to="/" className="back-link">← Volver a Portada</Link>
          <span className="category-tag">{noticia.category}</span>
          <h1 className="main-title">{noticia.title}</h1>
          <p className="subtitle">{noticia.description}</p>
        </header>

        <figure className="main-image">
          <img src={noticia.imageUrl} alt={noticia.title} />
        </figure>

        <section className="content-body">
          {noticia.content?.split('\n').map((para, i) => (
            para.trim() && <p key={i}>{para}</p>
          ))}
        </section>

        <footer className="article-footer-detail">
          <p>© Proyecto Cultura Rosario - La memoria de la ciudad.</p>
        </footer >
      </article>
    </main>
  );
};

export default ArticleDetail;