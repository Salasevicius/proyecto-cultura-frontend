import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-principal">
      <div className="footer-content">
        <div className="footer-section links">
          <h2>Mapa del Sitio</h2>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Secciones</a></li>
            <li><a href="#">Rosariopedia</a></li>
            <li><a href="#">Artículos</a></li>
            <li><a href="#">Novedades</a></li>
            <li><a href="#">Investigación</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-section company-info">
          <h2>Sobre Nosotros</h2>
          <p>Somos un grupo de desarrolladores e investigadores que se propone hacer de PROYECTO CULTURA la plataforma web más completa para la difusión del patrimonio cultural de Rosario.</p>
          <ul>
            <li><a href="#">CONOCÉ MÁS</a></li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h2>Síguenos</h2>
          <div className="social-icons">
            <a href="#"><img src="/search-icon.svg" alt="Facebook" /></a>
            <a href="#"><img src="/menu.svg" alt="Twitter" /></a>
            <a href="#"><img src="/arrowRightCards.svg" alt="Instagram" /></a>
            <a href="#"><img src="/arrowLeftCards.svg" alt="LinkedIn" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© <span className="proyecto">Proyecto </span><span className="cultura">Cultura</span></p>
      </div>
    </footer>
  );
};

export default Footer;