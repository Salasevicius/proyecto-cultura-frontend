import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const currentCategory = queryParams.get('category');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Buscando en base de datos:", searchTerm);
      closeMenu();
    }
  };

  const getActiveClass = (categoryName) => {
    return currentCategory === categoryName ? 'nav-item active' : 'nav-item';
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src="/logo.svg" alt="Logotipo Proyecto Cultura" />
        </Link>
      </div>

      {/* ESTE ES EL CAMBIO CLAVE: 
        Agrupamos el buscador y la hamburguesa para que en móvil 
        solo "exista" la hamburguesa sin empujones.
      */}
      <div className="nav-actions-container">
        <div className="navbar-search-desktop">
          <form onSubmit={handleSearch} className="desktop-search-form">
            <label htmlFor="search-input-desktop" className="sr-only">Buscar artículos</label>
            <input 
              type="text" 
              id="search-input-desktop"
              name="search"
              placeholder="Buscar artículos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" aria-label="Buscar" className="search-button-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MODAL OVERLAY (Se mantiene igual que al principio) */}
      <div className={`nav-modal ${isOpen ? 'active' : ''}`}>
        <ul className="nav-links-modal">
          <li className="modal-label"></li>
          <li className="modal-search-container">
            <form className="modal-search-form" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="¿ Qué quieres buscar ?" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" aria-label="Buscar">🔍</button>
            </form>
          </li>
          <li><Link to="/" className={!currentCategory ? 'active' : ''} onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/?category=Destacados" className={getActiveClass('Destacados')} onClick={closeMenu}>Destacados</Link></li>
          <li><Link to="/?category=Biografías" className={getActiveClass('Biografías')} onClick={closeMenu}>Biografías</Link></li>
          <li><Link to="/?category=Literarios" className={getActiveClass('Literarios')} onClick={closeMenu}>Literarios</Link></li>
          <li><Link to="/?category=Periodísticos" className={getActiveClass('Periodísticos')} onClick={closeMenu}>Periodísticos</Link></li>
          <li><Link to="/?category=Opinión" className={getActiveClass('Opinión')} onClick={closeMenu}>Opinión</Link></li>
          {isLoggedIn && (
            <li className="logout-wrapper">
              <button onClick={() => { onLogout(); closeMenu(); }} className="btn-logout">Cerrar Sesión</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;