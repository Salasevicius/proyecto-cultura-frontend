import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({ isLoggedIn, onLoginClick, onRegisterClick, onCreateClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-final-matrix">
      <div className="footer-container">
        
        <div className="footer-brand-section">
          <div className="brand-header">
            <h2 className="brand-logo">PROYECTO <span className="highlight">CULTURA</span></h2>
          </div>
          <p className="brand-description">
            Somos un grupo de desarrolladores e investigadores que se propone hacer de 
            PROYECTO CULTURA la plataforma web más completa para la difusión del 
            patrimonio cultural de Rosario.
          </p>
          
          {/* Zona de Acciones de Usuario sincronizada con App.jsx */}
          <div className="footer-actions-group">
            {isLoggedIn ? (
              <button onClick={onCreateClick} className="footer-cta-link btn-as-link">
                CREAR ARTÍCULO →
              </button>
            ) : (
              <>
                <button onClick={onLoginClick} className="footer-cta-link btn-as-link">
                  INICIAR SESIÓN →
                </button>
                <button onClick={onRegisterClick} className="footer-cta-link btn-as-link">
                  REGISTRARSE →
                </button>
              </>
            )}
          </div>
        </div>

        <div className="footer-matrix">
          {/* 01 // NAVEGACIÓN */}
          <div className="matrix-item">
            <span className="matrix-label">NAVEGACIÓN</span>
            <div className="matrix-links">
              <Link to="/">Inicio</Link>
              <Link to="/nosotros">Sobre el Proyecto</Link>
              <Link to="/novedades">Novedades</Link>
              <Link to="/contacto">Contacto</Link>
            </div>
          </div>

          {/* 02 // ROSARIOPEDIA */}
          <div className="matrix-item">
            <span className="matrix-label">ROSARIOPEDIA</span>
            <div className="matrix-links">
              {/* Ajustado para usar el filtrado por categorías que ya tienes en App.jsx */}
              <Link to="/?category=Periodísticos">Explorar Artículos</Link>
              <Link to="/?category=Biografías">Historias de Barrio</Link>
              <Link to="/?category=Opinión">Patrimonio Histórico</Link>
              <Link to="/archivo">Archivo Digital</Link>
            </div>
          </div>

          {/* 03 // COMUNIDAD */}
          <div className="matrix-item">
            <span className="matrix-label">COMUNIDAD</span>
            <div className="matrix-links">
              <Link to="/investigacion">Laboratorio</Link>
              <Link to="/eventos">Agenda Cultural</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/terminos">Privacidad</Link>
            </div>
          </div>
        </div>

        <div className="footer-metadata">
          <div className="meta-left">
            <span>© {currentYear} ROSARIO, ARGENTINA</span>
          </div>
          <div className="meta-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a href="https://github.com/Salasevicius" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          </div>
          <div className="meta-right">
            <button className="scroll-top-trigger" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              VOLVER AL INICIO ▲
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;