import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1>{t('welcome')}</h1>
      <p>{t('articles')}</p>
    </div>
  );
};

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (search) params.search = search;
      if (category) params.category = category;
      const { data } = await api.get('/articles', { params });
      setArticles(data);
    } catch {
      toast.error('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [search, category]);

  return (
    <div className="container">
      <h2>Articles</h2>
      <input className="input" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="Tech">Tech</option>
        <option value="Design">Design</option>
        <option value="News">News</option>
      </select>
      {loading ? (
        <div className="grid grid-3">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton" />)}
        </div>
      ) : (
        <div className="grid grid-3">
          {articles.map((item: any) => (
            <Link className="card" key={item._id} to={`/article/${item._id}`}>
              <h3>{item.title}</h3>
              <p>{item.category} • {item.author?.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/articles/${id}`).then((res) => setArticle(res.data)).catch(() => toast.error('Not found')).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container">Loading...</div>;
  if (!article) return <div className="container">Article not found</div>;

  return (
    <div className="container card">
      <h1>{article.title}</h1>
      <p>{article.category} • {article.author?.name}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('reader');
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password, role });
      toast.success('Registered');
      navigate('/login');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="container card">
      <h2>Register</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
        <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
        <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="reader">Reader</option>
          <option value="author">Author</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
};

const Login = ({ onLogin }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      onLogin(res.data);
      toast.success('Login ok');
      navigate('/');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Auth error');
    }
  };

  return (
    <div className="container card">
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
        <input className="input" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className="input" value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
};

const CreateArticlePage = ({ token, user }: any) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [featured_image, setFeatured] = useState('');
  const [content, setContent] = useState('');

  if (!user) return <Navigate to="/login" />;
  if (!['author', 'admin'].includes(user.role)) return <div className="container">Forbidden</div>;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post('/articles', { title, category, featured_image, content }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Created');
      navigate('/articles');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="container card">
      <h2>Create Article</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Title" />
        <input className="input" value={category} onChange={(e) => setCategory(e.target.value)} required placeholder="Category" />
        <input className="input" value={featured_image} onChange={(e) => setFeatured(e.target.value)} placeholder="Featured image URL" />
        <ReactQuill value={content} onChange={setContent} />
        <button className="btn" type="submit">Publish</button>
      </form>
    </div>
  );
};

const NavBar = ({ token, user, onLogout, theme, setTheme }: any) => {
  const { t, i18n } = useTranslation();
  return (
    <header>
      <div className="container nav">
        <div className="nav-left">
          <Link className="btn" to="/">{t('home')}</Link>
          <Link className="btn" to="/articles">{t('articles')}</Link>
          {user && (user.role === 'author' || user.role === 'admin') && <Link className="btn" to="/create">{t('createArticle')}</Link>}
        </div>
        <div className="nav-right">
          <select className="btn" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">{t('light')}</option>
            <option value="dark">{t('dark')}</option>
          </select>
          <select className="btn" value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="kk">KK</option>
          </select>
          {!token ? (<>
            <Link className="btn" to="/login">{t('login')}</Link>
            <Link className="btn" to="/register">{t('register')}</Link>
          </>) : (<button className="btn" onClick={onLogout}>{t('logout')}</button>)}
        </div>
      </div>
    </header>
  );
};

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<any>(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const onLogin = (payload: any) => {
    setToken(payload.token);
    setUser(payload.user);
    localStorage.setItem('token', payload.token);
    localStorage.setItem('user', JSON.stringify(payload.user));
  };

  const onLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('Logged out');
  };

  return (
    <Router>
      <NavBar token={token} user={user} onLogout={onLogout} theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/article/:id" element={<ArticleView />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateArticlePage token={token} user={user} />} />
        <Route path="*" element={<div className="container">404 Not Found</div>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
