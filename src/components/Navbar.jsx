import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../config'; 
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [quickResults, setQuickResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  // Nuevo estado para saber si es móvil o desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const { search } = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const queryParams = new URLSearchParams(search);
  const currentCategory = queryParams.get('category');

  // Detectar cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  // Live Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const trimmed = searchTerm.trim();
      if (trimmed.length > 2) {
        try {
          const response = await fetch(`${API_URL}/api/articles?search=${encodeURIComponent(trimmed)}`);
          const result = await response.json();
          if (result.success) {
            setQuickResults(result.data.slice(0, 5));
            setShowDropdown(true);
          }
        } catch (error) {
          console.error("Error en búsqueda rápida:", error);
        }
      } else {
        setQuickResults([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => { setIsOpen(false); setShowDropdown(false); };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      navigate(`/?search=${encodeURIComponent(trimmedTerm)}`);
      closeMenu();
    }
  };

  const getActiveClass = (categoryName) => currentCategory === categoryName ? 'nav-item active' : 'nav-item';

  const SearchResults = () => (
    <div className="search-dropdown">
      {quickResults.length > 0 ? (
        <>
          {quickResults.map((art) => (
            <Link key={art._id} to={`/articulo/${art._id}`} className="dropdown-item" onClick={closeMenu}>
              <img src={art.imageUrl} alt="" />
              <div className="dropdown-info">
                <span className="dropdown-title">{art.title}</span>
                <span className="dropdown-category">{art.category}</span>
              </div>
            </Link>
          ))}
          <button className="view-all-btn" onClick={handleSearch}>Ver todos</button>
        </>
      ) : (
        <div className="dropdown-no-results">Sin coincidencias</div>
      )}
    </div>
  );

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={() => { closeMenu(); setSearchTerm(""); }}>
          <img src="/logo.svg" alt="Logotipo" />
        </Link>
      </div>

      <div className="nav-actions-container">
        {/* BUSCADOR DESKTOP: Solo se muestra si NO es móvil */}
        {!isMobile && (
          <div className="navbar-search-desktop" ref={dropdownRef}>
            <form onSubmit={handleSearch} className="desktop-search-form">
              <input 
                type="text" 
                placeholder="Buscar artículos..." 
                value={searchTerm}
                autoComplete="off"
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.trim().length > 2 && setShowDropdown(true)}
              />
              <button type="submit" className="search-button-svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
            {showDropdown && <SearchResults />}
          </div>
        )}

        <button className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* MODAL MÓVIL */}
      <div className={`nav-modal ${isOpen ? 'active' : ''}`}>
        <ul className="nav-links-modal">
          {/* BUSCADOR MÓVIL: Solo se renderiza si ES móvil */}
          {isMobile && (
            <li className="modal-search-container">
              <form className="modal-search-form" onSubmit={handleSearch}>
                <input 
                  type="text" 
                  placeholder="¿Qué quieres buscar?" 
                  value={searchTerm}
                  autoComplete="off"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm.trim().length > 2 && setShowDropdown(true)}
                />
                <button type="submit">🔍</button>
              </form>
              {showDropdown && <SearchResults />}
            </li>
          )}
          
          <li><Link to="/" onClick={() => { closeMenu(); setSearchTerm(""); }}>Inicio</Link></li>
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