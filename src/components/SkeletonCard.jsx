import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <article className="card skeleton-card">
      {/* Imita a .card-image */}
      <div className="skeleton-image shimmer"></div>
      
      <div className="skeleton-content">
        {/* Imita a .category-tag */}
        <div className="skeleton-tag shimmer"></div>
        
        {/* Imita al h3 */}
        <div className="skeleton-title shimmer"></div>
        <div className="skeleton-title short shimmer"></div>
        
        {/* Imita al p (descripción) */}
        <div className="skeleton-text shimmer"></div>
        <div className="skeleton-text shimmer"></div>
        
        {/* Imita al footer y al botón .btn-read */}
        <div className="card-footer-actions">
          <div className="skeleton-button shimmer"></div>
        </div>
      </div>
    </article>
  );
};

export default SkeletonCard;