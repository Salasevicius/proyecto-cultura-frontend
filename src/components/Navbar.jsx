import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  // 1. Obtenemos la ubicación actual para saber qué categoría está activa
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const currentCategory = queryParams.get('category');

  // 2. Función auxiliar para determinar si un link debe tener la clase "active"
  const getActiveClass = (categoryName) => {
    return currentCategory === categoryName ? 'nav-item active' : 'nav-item';
  };

  return (
    <nav className="navbar">
      <div className="logo">
        {/* El logo-container en el CSS aplicará la luz detrás de esta imagen */}
        <Link to="/">
          <img src="/logo.svg" alt="Logotipo Proyecto Cultura" />
        </Link>
      </div>
      
      <ul>
        {/* Inicio es activo solo si no hay categoría seleccionada */}
        <li>
          <Link to="/" className={!currentCategory ? 'nav-item active' : 'nav-item'}>
            Inicio
          </Link>
        </li>

        <li>
          <Link to="/?category=Destacados" className={getActiveClass('Destacados')}>
            Destacados
          </Link>
        </li>

        <li>
          <Link to="/?category=Microbiografías" className={getActiveClass('Microbiografías')}>
            Microbiografías
          </Link>
        </li>

        <li>
          <Link to="/?category=Literarios" className={getActiveClass('Literarios')}>
            Literarios
          </Link>
        </li>

        <li>
          <Link to="/?category=Periodísticos" className={getActiveClass('Periodísticos')}>
            Periodísticos
          </Link>
        </li>

        <li>
          <Link to="/?category=Opinión" className={getActiveClass('Opinión')}>
            Opinión
          </Link>
        </li>

        {isLoggedIn && (
          <li>
            <button onClick={onLogout} className="btn-logout">
              Cerrar Sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;