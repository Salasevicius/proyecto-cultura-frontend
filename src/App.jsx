import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import CreatorCTA from './components/CreatorCTA';
import HeaderHero from './components/HeaderHero';
import FeaturedArticle from './components/FeaturedArticle';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import ArticleDetail from './components/ArticleDetail';
import ArticleSlider from './components/ArticleSlider';
import SpecialSections from './components/SpecialSections'; 
import TimelineExperience from './components/TimelineExperience'; 
import CulturaPreloader from './components/CulturaPreloader'; 
import './components/ArticleSlider.css';
import ScrollDotNav from './components/ScrollDotNav';
import ChroniclesHub from './components/ChroniclesHub'; // Importa el nuevo componente
import './styles/index.css';
import { API_URL } from './config';
import SkeletonCard from './components/SkeletonCard';
import { Eye, EyeOff } from 'lucide-react';

// IMPORTACIÓN DE LA CRÓNICA
import EnzoBordabehereArticle from './components/EnzoBordabehereArticle';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preloaderActive, setPreloaderActive] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [showLogin, setShowLogin] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState(null);
  const [globalScroll, setGlobalScroll] = useState(0);

  const location = useLocation();
  
  // Detectar si estamos en una crónica para ocultar UI global
  const isInmersiveRoute = location.pathname.startsWith('/cronica/');
  location.pathname === '/cronicas-hub';

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768) {
        setGlobalScroll(window.scrollY);
      } else {
        setGlobalScroll(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'anchor-top', label: 'Inicio' },
    { id: 'anchor-articulos', label: 'Artículos' },
    { id: 'anchor-especiales', label: 'Especiales' },
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

  const handlePreloaderComplete = () => {
    setPreloaderActive(false);
    setTimeout(() => { ScrollTrigger.refresh(); }, 200);
  };

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
      {preloaderActive && <CulturaPreloader onComplete={handlePreloaderComplete} />}

      {!preloaderActive && (
        <div className="fade-in-site">
          {/* HEADER CONDICIONAL */}
          {!isInmersiveRoute && (
            <header>
              <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            </header>
          )}
          
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

                <main style={{ position: 'relative', overflow: 'visible', '--global-scroll': `${globalScroll}px` }}>
                  {loading && !location.search && <SkeletonCard type="featured" />}
                  {!location.search && !loading && noticias.length > 0 && (
                    <FeaturedArticle noticia={noticias[0]} noticiasSecundarias={noticias.slice(1, 5)} />
                  )}

                  <div id="anchor-articulos" style={{ position: 'absolute', top: location.search ? '-100px' : '-200px', height: '1px', width: '100%', pointerEvents: 'none' }}></div>

                  <ArticleSlider 
                    noticias={location.search ? noticias : noticias.slice(1)} 
                    loading={loading}
                    isLoggedIn={isLoggedIn}
                    fetchData={fetchData}
                    handleEditClick={handleEditClick}
                  />

                  {!location.search && (
                    <div id="anchor-especiales" style={{ position: 'relative' }}>
                      <SpecialSections />
                    </div>
                  )}
                  {!loading && <Pagination />}
                </main>
              </>
            } />

            {/* RUTAS INDEPENDIENTES */}
            <Route path="/cronologia" element={<TimelineExperience />} />
            {/* RUTA DEL HUB DE CRÓNICAS */}
            <Route path="/cronicas-hub" element={<ChroniclesHub />} />
            <Route path="/cronica/enzo-bordabehere" element={<EnzoBordabehereArticle />} />
            <Route path="/articulo/:id" element={<ArticleDetail />} />
          </Routes>

          {/* FOOTER CONDICIONAL */}
          {!isInmersiveRoute && (
            <Footer 
              isLoggedIn={isLoggedIn} 
              onLoginClick={() => openAuthModal(false)} 
              onRegisterClick={() => openAuthModal(true)} 
              onCreateClick={() => setShowCreateModal(true)} 
            />
          )}
        </div>
      )}

      {/* MODALES (Permanecen igual) */}
      {showLogin && (
        <AuthModal
          initialRegister={isRegisterMode}
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(id, nombre) => {
            setIsLoggedIn(true);
            setUserName(nombre);
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

/* --- Los componentes internos de soporte (AuthModal, CreateArticleModal, EditArticleModal) se mantienen idénticos abajo --- */

function AuthModal({ onClose, onLoginSuccess, initialRegister }) {
  const [isRegister, setIsRegister] = useState(initialRegister);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  // Nuevo estado para la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

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
            <input 
              type="text" 
              placeholder="Nombre de usuario" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <div style={{ position: 'relative', width: '100%' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '-10px',
                top: '40%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#e2b464', // Tu dorado principal
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0',
                opacity: 0.8
              }}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

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
    title: '', 
    author: '', 
    description: '', 
    content: '', 
    category: 'Destacados', 
    imageUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_URL}/api/articles`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData) 
      });
      const result = await response.json();
      if (result.success) {
        alert("¡Artículo publicado!");
        onSuccess();
        onClose();
      } else { 
        alert("Error al publicar: " + (result.error?.message || "Verifica los datos")); 
      }
    } catch (error) { 
      alert("Error de conexión con el servidor"); 
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal article-editor-v2" onClick={(e) => e.stopPropagation()}>
        <div className="editor-header">
          <h3>Nueva Crónica Rosarina</h3>
          <button className="close-x" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modern-editor-form">
          <input 
            type="text" 
            className="main-title-input"
            placeholder="Título de la crónica..." 
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            required 
          />

          <input 
            type="text" 
            className="author-input-v2"
            style={{ width: '100%', marginBottom: '15px', padding: '10px', background: '#1a1a2e', border: '1px solid #e2b464', color: 'white', borderRadius: '4px' }}
            placeholder="Nombre del autor..." 
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })} 
            required 
          />

          <div className="editor-grid">
            <div className="writing-zone">
              <textarea 
                className="desc-area-v2" 
                placeholder="Copete o introducción breve..." 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                required 
              />
              <textarea 
                className="content-area-v2" 
                placeholder="Escribe aquí el cuerpo de la historia..." 
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
                required 
              />
            </div>

            <div className="meta-zone">
              <div className="input-group">
                <label>Categoría</label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Destacados">Destacados</option>
                  <option value="Microbiografías">Microbiografías</option>
                  <option value="Literarios">Literarios</option>
                  <option value="Periodísticos">Periodísticos</option>
                  <option value="Opinión">Opinión</option>
                </select>
              </div>
              
              <div className="input-group">
                <label>Ruta de Imagen</label>
                <input 
                  type="text" 
                  placeholder="/ejemplo.webp" 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} 
                  required 
                />
              </div>

              <div className="editor-footer-actions">
                <button type="submit" className="btn-publish">Publicar Ahora</button>
                <button type="button" onClick={onClose} className="btn-discard">Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditArticleModal({ noticia, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: noticia.title, 
    author: noticia.author || '', 
    description: noticia.description, 
    content: noticia.content, 
    category: noticia.category, 
    imageUrl: noticia.imageUrl
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/api/articles/${noticia._id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData) 
      });
      const result = await response.json();
      if (result.success) {
        alert("¡Artículo actualizado!");
        onSuccess();
        onClose();
      } else { 
        alert("Error al actualizar: " + (result.error || "Intenta nuevamente")); 
      }
    } catch (error) { 
      alert("Error de conexión"); 
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal article-editor-v2" onClick={(e) => e.stopPropagation()}>
        <div className="editor-header">
          <h3>Editando Crónica</h3>
          <button className="close-x" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modern-editor-form">
          <input 
            type="text" 
            className="main-title-input"
            placeholder="Título de la crónica..." 
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            required 
          />

          <input 
            type="text" 
            className="author-input-v2" 
            placeholder="Nombre del autor..." 
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })} 
            required 
          />

          <div className="editor-grid">
            <div className="writing-zone">
              <textarea 
                className="desc-area-v2" 
                placeholder="Copete o introducción breve..." 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                required 
              />
              <textarea 
                className="content-area-v2" 
                placeholder="Escribe aquí el cuerpo de la historia..." 
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
                required 
              />
            </div>

            <div className="meta-zone">
              <div className="input-group">
                <label>Categoría</label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Destacados">Destacados</option>
                  <option value="Microbiografías">Microbiografías</option>
                  <option value="Literarios">Literarios</option>
                  <option value="Periodísticos">Periodísticos</option>
                  <option value="Opinión">Opinión</option>
                </select>
              </div>
              
              <div className="input-group">
                <label>Ruta de Imagen</label>
                <input 
                  type="text" 
                  placeholder="/ejemplo.webp" 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} 
                  required 
                />
              </div>

              <div className="editor-footer-actions">
                <button type="submit" className="btn-publish">Guardar Cambios</button>
                <button type="button" onClick={onClose} className="btn-discard">Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;