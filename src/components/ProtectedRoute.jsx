import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute: Un "Wrapper" que envuelve componentes privados.
 * @param {boolean} isLoggedIn - Estado de autenticación del usuario.
 * @param {ReactElement} children - El componente que se quiere renderizar si está logueado.
 */
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Si el usuario no está logueado, lo redirigimos al Home
    // El atributo "replace" evita que el usuario pueda volver atrás a la ruta protegida
    return <Navigate to="/" replace />;
  }

  // Si está logueado, renderizamos los componentes hijos (children)
  return children;
};

export default ProtectedRoute;