import React from 'react';

const CreatorCTA = ({ isLoggedIn, userName, onLoginClick, onRegisterClick, onLogout, onCreateClick }) => {
  return (
    <section className="creator-cta-section">
      <div className="creator-cta-container">
        <div className="creator-cta-text">
          <h3>
            {isLoggedIn
              ? `Bienvenido de nuevo, ${userName}.`
              : "Únete a nuestra comunidad para difundir el patrimonio cultural de Rosario."}
          </h3>
          <p>
            {isLoggedIn
              ? "Este es tu panel de creador. Aquí puedes gestionar e inmortalizar nuevas historias sobre nuestra ciudad."
              : "Publicá tus propios artículos, crónicas o investigaciones sobre Rosario."}
          </p>
        </div>
        <div className="creator-cta-action" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {isLoggedIn ? (
            <>
              <button className="btn-create-news" onClick={onCreateClick}>
                + Crear nuevo artículo
              </button>
              <button className="btn-creator-logout" onClick={onLogout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button className="btn-creator-login" onClick={onLoginClick}>
                Ingresá como Creador
              </button>

              <button className="btn-creator-register" onClick={onRegisterClick}>
                ¿No tienes cuenta? ¡Regístrate!
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreatorCTA;