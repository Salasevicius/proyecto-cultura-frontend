import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreatorCTA from './components/CreatorCTA';
import HeaderHero from './components/HeaderHero';
import FeaturedArticle from './components/FeaturedArticle';
import ArticleCard from './components/ArticleCard';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import ArticleDetail from './components/ArticleDetail';
import ArticleSlider from './components/ArticleSlider';
import './components/ArticleSlider.css';
import ScrollDotNav from './components/ScrollDotNav';
import './styles/index.css';
import { API_URL } from './config';
import SkeletonCard from './components/SkeletonCard';

function AppContent() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [showLogin, setShowLogin] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState(null);

  // --- IMPLEMENTACIÓN DE DISEÑO DE AUTOR: SCROLL GLOBAL ---
  const [globalScroll, setGlobalScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Solo activamos la profundidad de campo en Desktop para mantener el rendimiento
      if (window.innerWidth > 768) {
        setGlobalScroll(window.scrollY);
      } else {
        setGlobalScroll(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // -------------------------------------------------------

  const location = useLocation();
  const sections = [
    { id: 'anchor-top', label: 'Inicio' },
    { id: 'anchor-articulos', label: 'Artículos' }
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(location.search);
      const category = queryParams.get('category');
      const search = queryParams.get('search');
      const apiParams = new URLSearchParams();
      let url = `${API_URL}/api/articles`;
      if (category) apiParams.append('category', category);
      if (search) apiParams.append('search', search);
      if (apiParams.toString()) url += `?${apiParams.toString()}`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) setNoticias(result.data); 
    } catch (error) {
      console.error("Error al cargar noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    alert("Sesión cerrada");
  };

  const handleEditClick = (noticia) => {
    setArticleToEdit(noticia);
    setShowEditModal(true);
  };

  const openAuthModal = (register = false) => {
    setIsRegisterMode(register);
    setShowLogin(true);
  };

  return (
    <>
      <header>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </header>
      <Routes>
        <Route path="/" element={
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
                isFiltered={location.search.length > 0} 
              />
            </div>

            {/* Inyectamos la variable de scroll en el contenedor principal */}
            <main 
              style={{ 
                position: 'relative',
                '--global-scroll': `${globalScroll}px` 
              }}
            >
              
              {!location.search && !loading && noticias.length > 0 && (
                <FeaturedArticle 
                  noticia={noticias[0]} 
                  noticiasSecundarias={noticias.slice(1, 5)} 
                />
              )}

              <div id="anchor-articulos" style={{ position: 'absolute', top: location.search ? '-100px' : '-200px', height: '1px', width: '100%', pointerEvents: 'none' }}></div>

              <ArticleSlider 
                noticias={location.search ? noticias : noticias.slice(1)} 
                loading={loading}
                isLoggedIn={isLoggedIn}
                fetchData={fetchData}
                handleEditClick={handleEditClick}
              />
              
              <Pagination />
            </main>
          </>
        } />
        <Route path="/articulo/:id" element={<ArticleDetail />} />
      </Routes>

      <Footer isLoggedIn={isLoggedIn} onLoginClick={() => openAuthModal(false)} onRegisterClick={() => openAuthModal(true)} onCreateClick={() => setShowCreateModal(true)} />

      {/* --- MODALES Y AUXILIARES (Sin cambios) --- */}
      {showLogin && (
        <AuthModal
          initialRegister={isRegisterMode}
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(idRecibido, nombreRecibido) => {
            setIsLoggedIn(true);
            setUserName(nombreRecibido);
            setShowLogin(false);
          }}
        />
      )}
      {showCreateModal && <CreateArticleModal onClose={() => setShowCreateModal(false)} onSuccess={fetchData} />}
      {showEditModal && articleToEdit && <EditArticleModal noticia={articleToEdit} onClose={() => { setShowEditModal(false); setArticleToEdit(null); }} onSuccess={fetchData} />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// --- Componentes Internos de soporte (Se mantienen idénticos) ---
function AuthModal({ onClose, onLoginSuccess, initialRegister }) {
  const [isRegister, setIsRegister] = useState(initialRegister);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    const body = isRegister ? { username, email, password } : { email, password };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await response.json();

      if (result.success) {
        if (isRegister) {
          alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
          setIsRegister(false);
        } else {
          localStorage.setItem('token', result.data);
          localStorage.setItem('userId', result.userId);
          const nombreParaMostrar = result.username || username || email.split('@')[0];
          localStorage.setItem('userName', nombreParaMostrar);
          onLoginSuccess(result.userId, nombreParaMostrar);
          alert(`¡Bienvenido, ${nombreParaMostrar}!`);
        }
      } else {
        alert("Error: " + (result.error || "Verifica los datos"));
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h3>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div className="login-buttons">
            <button type="submit" className="btn-send">{isRegister ? 'Registrarse' : 'Entrar'}</button>
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          </div>
        </form>
        <p style={{ color: '#ff6f61', marginTop: '1.5rem', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '¿Ya tienes cuenta? Ingresa aquí' : '¿No tienes cuenta? Regístrate gratis'}
        </p>
      </div>
    </div>
  );
}

function CreateArticleModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '', description: '', content: '', category: 'Destacados', imageUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        alert("¡Artículo publicado!");
        onSuccess();
        onClose();
      } else { alert("Error al publicar"); }
    } catch (error) { alert("Error de conexión"); }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <h3>Nueva Crónica Rosarina</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Título" onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          <textarea placeholder="Descripción" style={{ width: '100%', marginBottom: '1rem', background: '#252525', color: 'white', border: '1px solid #444', padding: '10px' }} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
          <textarea placeholder="Contenido" style={{ width: '100%', minHeight: '120px', marginBottom: '1rem', background: '#252525', color: 'white', border: '1px solid #444', padding: '10px' }} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
          <select style={{ width: '100%', marginBottom: '1rem', background: '#252525', color: 'white', padding: '10px' }} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value="Destacados">Destacados</option>
            <option value="Biografías">Biografías</option>
            <option value="Literarios">Literarios</option>
            <option value="Periodísticos">Periodísticos</option>
            <option value="Opinión">Opinión</option>
          </select>
          <input type="text" placeholder="Ruta de imagen" onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} required />
          <div className="login-buttons">
            <button type="submit" className="btn-send">Publicar</button>
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditArticleModal({ noticia, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: noticia.title, description: noticia.description, content: noticia.content, category: noticia.category, imageUrl: noticia.imageUrl
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/articles/${noticia._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        alert("¡Artículo actualizado!");
        onSuccess();
        onClose();
      } else { alert("Error al actualizar"); }
    } catch (error) { alert("Error de conexión"); }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <h3>Editar Crónica</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          <textarea value={formData.description} style={{ width: '100%', marginBottom: '1rem', background: '#252525', color: 'white', border: '1px solid #444', padding: '10px' }} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
          <textarea value={formData.content} style={{ width: '100%', minHeight: '120px', marginBottom: '1rem', background: '#252525', color: 'white', border: '1px solid #444', padding: '10px' }} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
          <select value={formData.category} style={{ width: '100%', marginBottom: '1rem', background: '#252525', color: 'white', padding: '10px' }} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value="Destacados">Destacados</option>
            <option value="Biografías">Biografías</option>
            <option value="Literarios">Literarios</option>
            <option value="Periodísticos">Periodísticos</option>
            <option value="Opinión">Opinión</option>
          </select>
          <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} required />
          <div className="login-buttons">
            <button type="submit" className="btn-send">Guardar Cambios</button>
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;