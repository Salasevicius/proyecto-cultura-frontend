import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = ({ type = "slider" }) => {
  // Si el tipo es 'featured', renderizamos la estructura de la noticia principal
  if (type === "featured") {
    return (
      <section className="featured-skeleton shimmer-bg">
        <div className="featured-skeleton-content">
          <div className="sk-tag shimmer"></div>
          <div className="sk-title-large shimmer"></div>
          <div className="sk-title-large short shimmer"></div>
          <div className="sk-excerpt shimmer"></div>
          <div className="sk-excerpt shimmer"></div>
          <div className="sk-button-featured shimmer"></div>
        </div>
        <div className="featured-skeleton-image shimmer"></div>
      </section>
    );
  }

  // Por defecto, renderiza el formato para el ArticleSlider
  return (
    <div className="slider-item">
      <article className="skeleton-card">
        <div className="skeleton-image shimmer"></div>
        <div className="skeleton-content">
          <div className="sk-title shimmer"></div>
          <div className="sk-title short shimmer"></div>
          <div className="sk-text shimmer"></div>
          <div className="sk-text shimmer"></div>
        </div>
      </article>
    </div>
  );
};

export default SkeletonCard;