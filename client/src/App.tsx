import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './i18n';
import { api, getApiErrorMessage } from './lib/api';
import { clearAuth, loadTheme, loadToken, loadUser, saveAuth, saveTheme, type ThemeMode } from './lib/storage';
import type { Article, AuthPayload, User, UserRole } from './types';

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatDate(value: string, locale: string) {
  const resolvedLocale = locale === 'kk' ? 'kk-KZ' : locale === 'en' ? 'en-US' : 'ru-RU';
  return new Intl.DateTimeFormat(resolvedLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
}

function usePortalState() {
  const [token, setToken] = useState<string | null>(() => loadToken());
  const [user, setUser] = useState<User | null>(() => loadUser());
  const [theme, setThemeState] = useState<ThemeMode>(() => loadTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  const onLogin = (payload: AuthPayload) => {
    setToken(payload.token);
    setUser(payload.user);
    saveAuth(payload);
  };

  const onLogout = () => {
    setToken(null);
    setUser(null);
    clearAuth();
  };

  return {
    token,
    user,
    theme,
    setTheme: setThemeState,
    onLogin,
    onLogout,
  };
}

function NavBar({
  token,
  user,
  theme,
  setTheme,
  onLogout,
}: {
  token: string | null;
  user: User | null;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  onLogout: () => void;
}) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">NP</span>
          <span>
            <strong>{t('siteTitle')}</strong>
            <small>{t('brandTagline')}</small>
          </span>
        </Link>

        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)}>
          {t('menu')}
        </button>

        <div className={`nav-content ${menuOpen ? 'open' : ''}`}>
          <nav className="nav-links">
            <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>{t('home')}</Link>
            <Link className="nav-link" to="/articles" onClick={() => setMenuOpen(false)}>{t('articles')}</Link>
            {user && (user.role === 'author' || user.role === 'admin') ? (
              <Link className="nav-link" to="/create" onClick={() => setMenuOpen(false)}>{t('createArticle')}</Link>
            ) : null}
            {user ? (
              <Link className="nav-link" to="/profile" onClick={() => setMenuOpen(false)}>{t('profile')}</Link>
            ) : null}
          </nav>

          <div className="nav-actions">
            <select
              className="select control"
              value={theme}
              onChange={(event) => setTheme(event.target.value as ThemeMode)}
              aria-label={t('theme')}
            >
              <option value="light">{t('light')}</option>
              <option value="dark">{t('dark')}</option>
            </select>

            <select
              className="select control"
              value={i18n.language.startsWith('kk') ? 'kk' : i18n.language.startsWith('en') ? 'en' : 'ru'}
              onChange={(event) => {
                void i18n.changeLanguage(event.target.value);
              }}
              aria-label={t('switchLanguage')}
            >
              <option value="ru">RU</option>
              <option value="kk">KK</option>
              <option value="en">EN</option>
            </select>

            {!token ? (
              <>
                <Link className="button button-secondary" to="/login" onClick={() => setMenuOpen(false)}>{t('login')}</Link>
                <Link className="button button-primary" to="/register" onClick={() => setMenuOpen(false)}>{t('register')}</Link>
              </>
            ) : (
              <button
                className="button button-secondary"
                type="button"
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                  toast.info(t('logoutSuccess'));
                }}
              >
                {t('logout')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">{t('welcome')}</p>
          <h1>{t('heroTitle')}</h1>
          <p className="hero-text">{t('heroText')}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/articles">{t('browseArticles')}</Link>
            <Link className="button button-secondary" to="/register">{t('startNow')}</Link>
          </div>
        </div>
        <div className="hero-stats">
          <article className="stat-card">
            <strong>3</strong>
            <span>{t('homeStatsUsers')}</span>
          </article>
          <article className="stat-card">
            <strong>CRUD</strong>
            <span>{t('homeStatsCrud')}</span>
          </article>
          <article className="stat-card">
            <strong>RU / KK</strong>
            <span>{t('homeStatsI18n')}</span>
          </article>
        </div>
      </section>

      <section className="feature-grid">
        <article className="info-card">
          <h2>{t('featuresTitle')}</h2>
          <ul className="feature-list">
            <li>{t('featureAuth')}</li>
            <li>{t('featureCrud')}</li>
            <li>{t('featureUi')}</li>
          </ul>
        </article>
        <article className="info-card accent-card">
          <h2>{t('latestArticles')}</h2>
          <p>{t('latestArticlesText')}</p>
          <p className="muted">{t('guestText')}</p>
        </article>
      </section>
    </div>
  );
}

function ArticlesPage({ user }: { user: User | null }) {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadArticles() {
      setLoading(true);
      setError('');

      try {
        const params: Record<string, string> = {};
        if (search.trim()) params.search = search.trim();
        if (category) params.category = category;

        const response = await api.get<Article[]>('/articles', { params });
        if (mounted) {
          setArticles(response.data);
        }
      } catch (error) {
        if (mounted) {
          setError(getApiErrorMessage(error, t('loadError')));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadArticles();

    return () => {
      mounted = false;
    };
  }, [search, category, t]);

  return (
    <div className="page-stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">{t('articles')}</p>
          <h1>{t('latestArticles')}</h1>
          <p>{t('latestArticlesText')}</p>
        </div>
        {user && (user.role === 'author' || user.role === 'admin') ? (
          <Link className="button button-primary" to="/create">{t('createArticle')}</Link>
        ) : null}
      </section>

      <section className="toolbar">
        <input
          className="input"
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select className="select" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">{t('categoryAll')}</option>
          <option value="Tech">{t('categoryTech')}</option>
          <option value="Design">{t('categoryDesign')}</option>
          <option value="News">{t('categoryNews')}</option>
        </select>
      </section>

      {loading ? <div className="state-card">{t('loading')}</div> : null}
      {!loading && error ? <div className="state-card error">{error}</div> : null}
      {!loading && !error && articles.length === 0 ? (
        <div className="state-card">
          <h2>{t('noArticles')}</h2>
          <p>{t('noArticlesText')}</p>
        </div>
      ) : null}

      {!loading && !error && articles.length > 0 ? (
        <div className="article-grid">
          {articles.map((article) => (
            <article className="article-card" key={article._id}>
              {article.featured_image ? <img src={article.featured_image} alt={article.title} className="article-image" /> : null}
              <div className="article-body">
                <span className="tag">{article.category}</span>
                <h2>{article.title}</h2>
                <p>{stripHtml(article.content).slice(0, 140)}...</p>
                <div className="article-meta">
                  <span>{article.author?.name}</span>
                  <span>{formatDate(article.createdAt, i18n.language)}</span>
                </div>
                <Link className="button button-secondary" to={`/article/${article._id}`}>{t('continueReading')}</Link>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ArticleView({ token, user }: { token: string | null; user: User | null }) {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadArticle() {
      if (!id) {
        setLoading(false);
        setError(t('articleNotFound'));
        return;
      }

      try {
        const response = await api.get<Article>(`/articles/${id}`);
        if (mounted) {
          setArticle(response.data);
        }
      } catch (error) {
        if (mounted) {
          setError(getApiErrorMessage(error, t('articleNotFound')));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadArticle();

    return () => {
      mounted = false;
    };
  }, [id, t]);

  if (loading) {
    return <div className="state-card">{t('loading')}</div>;
  }

  if (error || !article) {
    return (
      <div className="state-card error">
        <h1>{t('articleNotFound')}</h1>
        <p>{error || t('articleNotFound')}</p>
      </div>
    );
  }

  const articleAuthorId = article.author?._id || article.author?.id;
  const canManage = Boolean(user && (user.role === 'admin' || user.id === articleAuthorId));

  return (
    <div className="page-stack">
      <article className="article-view">
        {article.featured_image ? <img className="article-view-image" src={article.featured_image} alt={article.title} /> : null}
        <div className="article-view-body">
          <span className="tag">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="article-meta wide">
            <span>{t('authorLabel')}: {article.author?.name}</span>
            <span>{t('createdLabel')}: {formatDate(article.createdAt, i18n.language)}</span>
          </div>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </article>

      {canManage ? (
        <div className="action-row">
          <Link className="button button-secondary" to={`/edit/${article._id}`}>{t('editArticle')}</Link>
          <button
            className="button button-danger"
            type="button"
            onClick={async () => {
              if (!token) {
                toast.error(t('requiredAuth'));
                return;
              }

              if (!window.confirm(t('confirmDelete'))) {
                return;
              }

              try {
                await api.delete(`/articles/${article._id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                toast.success(t('deleteSuccess'));
                navigate('/articles');
              } catch (error) {
                toast.error(getApiErrorMessage(error, t('loadError')));
              }
            }}
          >
            {t('deleteArticle')}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('reader');
  const [submitting, setSubmitting] = useState(false);

  return (
    <section className="form-card">
      <h1>{t('registerTitle')}</h1>
      <p>{t('formHint')}</p>
      <form
        className="form-grid"
        onSubmit={async (event) => {
          event.preventDefault();
          setSubmitting(true);
          try {
            await api.post('/auth/register', { name, email, password, role });
            toast.success(t('registerSuccess'));
            navigate('/login');
          } catch (error) {
            toast.error(getApiErrorMessage(error, t('loadError')));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder={t('fullName')} required />
        <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t('email')} type="email" required />
        <input className="input" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t('password')} type="password" required />
        <select className="select" value={role} onChange={(event) => setRole(event.target.value as UserRole)}>
          <option value="reader">{t('reader')}</option>
          <option value="author">{t('author')}</option>
        </select>
        <button className="button button-primary" type="submit" disabled={submitting}>{t('register')}</button>
      </form>
    </section>
  );
}

function LoginPage({ onLogin }: { onLogin: (payload: AuthPayload) => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <section className="form-card">
      <h1>{t('loginTitle')}</h1>
      <p>{t('formHint')}</p>
      <form
        className="form-grid"
        onSubmit={async (event) => {
          event.preventDefault();
          setSubmitting(true);
          try {
            const response = await api.post<AuthPayload>('/auth/login', { email, password });
            onLogin(response.data);
            toast.success(t('loginSuccess'));
            navigate('/profile');
          } catch (error) {
            toast.error(getApiErrorMessage(error, t('loadError')));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t('email')} type="email" required />
        <input className="input" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t('password')} type="password" required />
        <button className="button button-primary" type="submit" disabled={submitting}>{t('login')}</button>
      </form>
    </section>
  );
}

function ArticleEditor({
  token,
  user,
  mode,
}: {
  token: string | null;
  user: User | null;
  mode: 'create' | 'edit';
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Tech' | 'Design' | 'News'>('Tech');
  const [featuredImage, setFeaturedImage] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(mode === 'edit');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode !== 'edit' || !id) {
      return;
    }

    let mounted = true;

    async function loadArticle() {
      try {
        const response = await api.get<Article>(`/articles/${id}`);
        if (!mounted) {
          return;
        }

        setTitle(response.data.title);
        setCategory(response.data.category);
        setFeaturedImage(response.data.featured_image || '');
        setContent(response.data.content);
      } catch (error) {
        if (mounted) {
          toast.error(getApiErrorMessage(error, t('articleNotFound')));
          navigate('/articles');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadArticle();

    return () => {
      mounted = false;
    };
  }, [id, mode, navigate, t]);

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  if (!['author', 'admin'].includes(user.role)) {
    return <div className="state-card error">{t('forbidden')}</div>;
  }

  if (loading) {
    return <div className="state-card">{t('loading')}</div>;
  }

  return (
    <section className="form-card wide">
      <h1>{mode === 'create' ? t('createTitle') : t('editTitle')}</h1>
      <p>{t('formHint')}</p>
      <form
        className="form-grid"
        onSubmit={async (event) => {
          event.preventDefault();
          setSubmitting(true);

          try {
            const payload = {
              title,
              category,
              featured_image: featuredImage,
              content,
            };

            const headers = { Authorization: `Bearer ${token}` };

            if (mode === 'create') {
              await api.post('/articles', payload, { headers });
              toast.success(t('createSuccess'));
              navigate('/articles');
            } else {
              await api.put(`/articles/${id}`, payload, { headers });
              toast.success(t('updateSuccess'));
              navigate(`/article/${id}`);
            }
          } catch (error) {
            toast.error(getApiErrorMessage(error, t('loadError')));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t('titleLabel')} required />
        <select className="select" value={category} onChange={(event) => setCategory(event.target.value as 'Tech' | 'Design' | 'News')}>
          <option value="Tech">{t('categoryTech')}</option>
          <option value="Design">{t('categoryDesign')}</option>
          <option value="News">{t('categoryNews')}</option>
        </select>
        <input className="input" value={featuredImage} onChange={(event) => setFeaturedImage(event.target.value)} placeholder={t('imageUrl')} />
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <div className="action-row">
          <button className="button button-primary" type="submit" disabled={submitting}>
            {mode === 'create' ? t('publish') : t('save')}
          </button>
          <button className="button button-secondary" type="button" onClick={() => navigate(-1)}>
            {t('cancel')}
          </button>
        </div>
      </form>
    </section>
  );
}

function ProfilePage({ user }: { user: User | null }) {
  const { t } = useTranslation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="profile-grid">
      <article className="info-card">
        <h1>{t('profileTitle')}</h1>
        <p>{t('profileText')}</p>
        <p className="muted">{t('updateProfileNote')}</p>
      </article>
      <article className="info-card">
        <dl className="details-list">
          <div>
            <dt>{t('fullName')}</dt>
            <dd>{user.name}</dd>
          </div>
          <div>
            <dt>{t('roleLabel')}</dt>
            <dd>{t(user.role)}</dd>
          </div>
          {user.email ? (
            <div>
              <dt>{t('email')}</dt>
              <dd>{user.email}</dd>
            </div>
          ) : null}
        </dl>
      </article>
    </section>
  );
}

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="state-card error">
      <h1>{t('notFound')}</h1>
      <Link className="button button-primary" to="/">{t('backHome')}</Link>
    </div>
  );
}

function AppRoutes() {
  const { t } = useTranslation();
  const portal = usePortalState();

  return (
    <>
      <NavBar
        token={portal.token}
        user={portal.user}
        theme={portal.theme}
        setTheme={portal.setTheme}
        onLogout={portal.onLogout}
      />
      <main className="container main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage user={portal.user} />} />
          <Route path="/article/:id" element={<ArticleView token={portal.token} user={portal.user} />} />
          <Route path="/login" element={<LoginPage onLogin={portal.onLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<ArticleEditor token={portal.token} user={portal.user} mode="create" />} />
          <Route path="/edit/:id" element={<ArticleEditor token={portal.token} user={portal.user} mode="edit" />} />
          <Route path="/profile" element={<ProfilePage user={portal.user} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>{t('footerText')}</p>
        </div>
      </footer>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
