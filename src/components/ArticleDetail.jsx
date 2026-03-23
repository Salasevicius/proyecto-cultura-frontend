import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Importación de la librería
import "./ArticleDetail.css";
import { API_URL } from "../config"; 

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
    <>
      {/* INTEGRACIÓN DE SEO DINÁMICO */}
      <Helmet>
        {/* Título dinámico para la pestaña del navegador */}
        <title>{`${noticia.title} | Proyecto Cultura Rosario`}</title>
        <meta name="description" content={noticia.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={noticia.title} />
        <meta property="og:description" content={noticia.description} />
        <meta property="og:image" content={noticia.imageUrl} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={noticia.title} />
        <meta name="twitter:description" content={noticia.description} />
        <meta name="twitter:image" content={noticia.imageUrl} />
      </Helmet>

      {/* TU ESTRUCTURA VISUAL ORIGINAL (SIN CAMBIOS) */}
      <main className="reader-page-bg">
        {/* PORTADA FULL WIDTH ESTILO NEW YORKER */}
        <section className="newyorker-hero-cover">
          <header className="hero-text-side">
            <Link to="/" className="back-link">← Volver a Portada</Link>
            <div className="title-group-split">
              <span className="category-tag">{noticia.category}</span>
              <h1 className="main-title-split">{noticia.title}</h1>
              <p className="subtitle-split">{noticia.description}</p>
            </div>
          </header>

          <figure className="hero-image-side">
            <img src={noticia.imageUrl} alt={noticia.title} />
          </figure>
        </section>

        {/* EL FOLIO (ESTRUCTURA ORIGINAL RECUPERADA) */}
        <article className="article-container">
          <section className="content-body">
            {noticia.content?.split('\n').map((para, i) => (
              para.trim() && <p key={i}>{para}</p>
            ))}
          </section>

          <footer className="article-footer-detail">
            <p>© Proyecto Cultura Rosario - La memoria de la ciudad.</p>
          </footer>
        </article>
      </main>
    </>
  );
};

export default ArticleDetail;