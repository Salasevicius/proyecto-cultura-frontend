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
              <div id="anchor-top" style={{ position: 'absolute', top: 0, height: '500px', width: '100%', pointerEvents: 'none' }}></div>
              <HeaderHero />
              <CreatorCTA
                isLoggedIn={isLoggedIn}
                userName={userName}
                onLoginClick={() => openAuthModal(false)}
                onRegisterClick={() => openAuthModal(true)}
                onLogout={handleLogout}
                onCreateClick={() => setShowCreateModal(true)}
              />
            </div>
            
            <main style={{ position: 'relative' }}>
              <div id="anchor-articulos" style={{ position: 'absolute', top: '-150px', height: '500px', width: '100%', pointerEvents: 'none' }}></div>

              {!location.search && !loading && noticias.length > 0 && (
                <FeaturedArticle 
                  noticia={noticias[0]} 
                  noticiasSecundarias={noticias.slice(1, 5)} 
                />
              )}

              <section className="news-list" style={{ marginTop: location.search ? '2rem' : '0.5rem' }}>
                {loading ? (
                  [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                ) : noticias.length > 0 ? (
                  (location.search ? noticias : noticias.slice(1)).map((n) => (
                    <ArticleCard
                      key={n._id}
                      noticia={n}
                      isLoggedIn={isLoggedIn}
                      onActionSuccess={fetchData}
                      onEditClick={handleEditClick}
                    />
                  ))
                ) : (
                  <p className="no-results">No se encontraron artículos.</p>
                )}
              </section>
              <Pagination />
            </main>
          </>
        } />
        <Route path="/articulo/:id" element={<ArticleDetail />} />
      </Routes>

      <Footer 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => openAuthModal(false)}
        onRegisterClick={() => openAuthModal(true)}
        onCreateClick={() => setShowCreateModal(true)}
      />

      {/* Modales internos sin cambios */}
      {showLogin && <AuthModal initialRegister={isRegisterMode} onClose={() => setShowLogin(false)} onLoginSuccess={(id, nom) => { setIsLoggedIn(true); setUserName(nom); setShowLogin(false); }} />}
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

// --- COMPONENTES DE MODALES (Sin cambios) ---

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
          alert("¡Registro exitoso!");
          setIsRegister(false);
        } else {
          localStorage.setItem('token', result.data);
          localStorage.setItem('userId', result.userId);
          const nombre = result.username || username || email.split('@')[0];
          localStorage.setItem('userName', nombre);
          onLoginSuccess(result.userId, nombre);
        }
      } else { alert("Error en los datos"); }
    } catch (error) { alert("Error de conexión"); }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h3>
        <form onSubmit={handleSubmit}>
          {isRegister && <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Pass" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div className="login-buttons">
            <button type="submit" className="btn-send">Enviar</button>
            <button type="button" onClick={onClose} className="btn-cancel">Cerrar</button>
          </div>
        </form>
        <p className="modal-switch" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta? Regístrate'}
        </p>
      </div>
    </div>
  );
}

function CreateArticleModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({ title: '', description: '', content: '', category: 'Destacados', imageUrl: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if ((await response.json()).success) { onSuccess(); onClose(); }
    } catch (error) { console.error(error); }
  };
  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Nueva Crónica</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Título" onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          <textarea placeholder="Descripción" onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
          <textarea placeholder="Contenido" style={{ minHeight: '100px' }} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
          <select onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value="Destacados">Destacados</option>
            <option value="Biografías">Biografías</option>
            <option value="Literarios">Literarios</option>
          </select>
          <input type="text" placeholder="URL Imagen" onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} required />
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
  const [formData, setFormData] = useState({ ...noticia });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/articles/${noticia._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if ((await response.json()).success) { onSuccess(); onClose(); }
    } catch (error) { console.error(error); }
  };
  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Editar</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <div className="login-buttons">
            <button type="submit" className="btn-send">Guardar</button>
            <button type="button" onClick={onClose} className="btn-cancel">Volver</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;