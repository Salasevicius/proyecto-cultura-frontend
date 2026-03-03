import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => (
  <nav>
    <div className="logo">
      <Link to="/"><img src="/logo.svg" alt="Logotipo" /></Link>
    </div>
    <ul>
      <li><Link to="/">Inicio</Link></li>
      {/* Ejemplo de cómo implementarías el filtrado requerido */}
      <li><Link to="/?category=Destacados">Destacados</Link></li>
      <li><Link to="/?category=Microbiografías">Microbiografías</Link></li>
      <li><Link to="/?category=Literarios">Literarios</Link></li>
      <li><Link to="/?category=Periodísticos">Periodísticos</Link></li>
      <li><Link to="/?category=Opinión">Opinión</Link></li>
      {/* Botón condicional de Logout */}
      {isLoggedIn && (
        <li><button onClick={onLogout} className="btn-logout">Cerrar Sesión</button></li>
      )}
    </ul>
  </nav>
);
export default Navbar;