import React from 'react';
import ScrollDotNav from './ScrollDotNav';
import HeaderHero from './HeaderHero';
import CreatorCTA from './CreatorCTA';
import FeaturedArticle from './FeaturedArticle';
import ArticleSlider from './ArticleSlider';
import SpecialSections from './SpecialSections';
import Pagination from './Pagination';
import SkeletonCard from './SkeletonCard';

export default function ArticlesView({
  noticias,
  loading,
  isLoggedIn,
  userName,
  openAuthModal,
  handleLogout,
  setShowCreateModal,
  fetchData,
  handleEditClick,
  locationSearch,
  mainRef,
  sections
}) {
  return (
    <>
      <ScrollDotNav sections={sections} />
      <div style={{ position: 'relative' }}>
        <div id="anchor-top" style={{ position: 'absolute', top: 0, height: '1px', width: '100%', pointerEvents: 'none' }}></div>
        <HeaderHero />
        <CreatorCTA
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLoginClick={() => openAuthModal(false)}
          onRegisterClick={() => openAuthModal(true)}
          onLogout={handleLogout}
          onCreateClick={() => setShowCreateModal(true)}
          isFiltered={locationSearch.length > 0}
        />
      </div>

      <main ref={mainRef} style={{ position: 'relative', overflow: 'visible' }}>
        {loading && !locationSearch && <SkeletonCard type="featured" />}
        {!locationSearch && !loading && noticias.length > 0 && (
          <FeaturedArticle noticia={noticias[0]} noticiasSecundarias={noticias.slice(1, 5)} />
        )}

        <div 
          id="anchor-articulos" 
          style={{ 
            position: 'absolute', 
            top: locationSearch ? '-100px' : '-200px', 
            height: '1px', 
            width: '100%', 
            pointerEvents: 'none' 
          }}
        ></div>

        <ArticleSlider
          noticias={locationSearch ? noticias : noticias.slice(1)}
          loading={loading}
          isLoggedIn={isLoggedIn}
          fetchData={fetchData}
          handleEditClick={handleEditClick}
        />

        {!locationSearch && (
          <div id="anchor-especiales" style={{ position: 'relative' }}>
            <SpecialSections />
          </div>
        )}
        {!loading && <Pagination />}
      </main>
    </>
  );
}