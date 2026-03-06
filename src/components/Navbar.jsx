import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const currentCategory = queryParams.get('category');

  // Bloquear el scroll del cuerpo cuando el modal está abierto
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
      console.log("Buscando en Proyecto Cultura Rosario:", searchTerm);
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

      <button 
        className={`hamburger ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* MODAL OVERLAY */}
      <div className={`nav-modal ${isOpen ? 'active' : ''}`}>
        <ul className="nav-links-modal">
          <li className="modal-label"></li>

          {/* BUSCADOR: Ahora ubicado al principio del modal móvil */}
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

          <li>
            <Link to="/" className={!currentCategory ? 'active' : ''} onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/?category=Destacados" className={getActiveClass('Destacados')} onClick={closeMenu}>
              Destacados
            </Link>
          </li>
          <li>
            <Link to="/?category=Microbiografías" className={getActiveClass('Microbiografías')} onClick={closeMenu}>
              Microbiografías
            </Link>
          </li>
          <li>
            <Link to="/?category=Literarios" className={getActiveClass('Literarios')} onClick={closeMenu}>
              Literarios
            </Link>
          </li>
          <li>
            <Link to="/?category=Periodísticos" className={getActiveClass('Periodísticos')} onClick={closeMenu}>
              Periodísticos
            </Link>
          </li>
          <li>
            <Link to="/?category=Opinión" className={getActiveClass('Opinión')} onClick={closeMenu}>
              Opinión
            </Link>
          </li>
          
          {isLoggedIn && (
            <li className="logout-wrapper">
              <button onClick={() => { onLogout(); closeMenu(); }} className="btn-logout">
                Cerrar Sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;