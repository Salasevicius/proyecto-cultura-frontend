import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import "./ArticleDetail.css";
import { API_URL } from "../config"; 

const ArticleDetail = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  // URL Base para las imágenes y links (Render Frontend)
  const FRONTEND_URL = "https://proyecto-cultura-frontend.onrender.com";

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

  // Lógica para asegurar URL absoluta en la imagen
  const absoluteImageUrl = noticia.imageUrl?.startsWith('http') 
    ? noticia.imageUrl 
    : `${FRONTEND_URL}${noticia.imageUrl}`;

  return (
    <>
      {/* INTEGRACIÓN DE SEO DINÁMICO BLINDADA */}
      <Helmet>
        <title>{`${noticia.title} | Proyecto Cultura Rosario`}</title>
        <meta name="description" content={noticia.description} />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={noticia.title} />
        <meta property="og:description" content={noticia.description} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:url" content={`${FRONTEND_URL}/articulo/${id}`} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={noticia.title} />
        <meta name="twitter:description" content={noticia.description} />
        <meta name="twitter:image" content={absoluteImageUrl} />
      </Helmet>

      {/* TU ESTRUCTURA VISUAL ORIGINAL INTEGRAL */}
      <main className="reader-page-bg">
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
            {/* Aquí usamos la imagen tal cual viene para el renderizado local */}
            <img src={noticia.imageUrl} alt={noticia.title} />
          </figure>
        </section>

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