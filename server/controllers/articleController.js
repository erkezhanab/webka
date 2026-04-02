const slugify = require('slugify');
const { sendError, sendSuccess } = require('../utils/http');
const { createId, getArticles, getUsers, saveArticles } = require('../data/store');

const allowedCategories = ['Tech', 'Design', 'News'];

function validateArticleInput({ title, content, category }) {
  if (!title || title.trim().length < 5) {
    return 'Заголовок должен содержать минимум 5 символов';
  }

  const plainTextContent = String(content || '').replace(/<[^>]+>/g, '').trim();
  if (plainTextContent.length < 20) {
    return 'Содержимое статьи должно содержать минимум 20 символов';
  }

  if (!category || !allowedCategories.includes(category)) {
    return 'Выберите корректную категорию статьи';
  }

  return null;
}

function attachAuthor(article, users) {
  const author = users.find((user) => user._id === article.authorId);

  return {
    ...article,
    author: author
      ? {
          _id: author._id,
          id: author._id,
          name: author.name,
          role: author.role,
        }
      : { name: 'Unknown author' },
  };
}

const getAll = async (req, res) => {
  const { search, category } = req.query;
  const [articles, users] = await Promise.all([getArticles(), getUsers()]);

  let result = [...articles];

  if (search) {
    const query = String(search).toLowerCase();
    result = result.filter((article) => {
      return article.title.toLowerCase().includes(query) || article.category.toLowerCase().includes(query);
    });
  }

  if (category && allowedCategories.includes(category)) {
    result = result.filter((article) => article.category === category);
  }

  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return sendSuccess(res, 200, result.map((article) => attachAuthor(article, users)));
};

const getById = async (req, res) => {
  const [articles, users] = await Promise.all([getArticles(), getUsers()]);
  const article = articles.find((item) => item._id === req.params.id);
  if (!article) return sendError(res, 404, 'ARTICLE_NOT_FOUND', 'Статья не найдена');
  return sendSuccess(res, 200, attachAuthor(article, users));
};

const create = async (req, res) => {
  const { title, content, category, featured_image } = req.body;
  const validationError = validateArticleInput({ title, content, category });
  if (validationError) return sendError(res, 400, 'VALIDATION_ERROR', validationError);

  if (featured_image && !/^https?:\/\/.+/i.test(featured_image)) {
    return sendError(res, 400, 'VALIDATION_ERROR', 'Изображение должно быть корректным URL');
  }

  const slug = slugify(title, { lower: true, strict: true });
  const articles = await getArticles();
  const exists = articles.find((article) => article.slug === slug);
  if (exists) return sendError(res, 409, 'ARTICLE_EXISTS', 'Статья с таким заголовком уже существует');

  const now = new Date().toISOString();
  const article = {
    _id: createId(),
    title: title.trim(),
    slug,
    content,
    category,
    featured_image: featured_image || '',
    authorId: req.user.id,
    createdAt: now,
    updatedAt: now,
  };

  articles.push(article);
  await saveArticles(articles);

  return sendSuccess(res, 201, article);
};

const update = async (req, res) => {
  const articles = await getArticles();
  const article = articles.find((item) => item._id === req.params.id);
  if (!article) return sendError(res, 404, 'ARTICLE_NOT_FOUND', 'Статья не найдена');

  if (req.user.role !== 'admin' && article.authorId !== req.user.id) {
    return sendError(res, 403, 'FORBIDDEN', 'Нельзя редактировать чужую статью');
  }

  const { title, content, category, featured_image } = req.body;
  const nextTitle = title ?? article.title;
  const nextContent = content ?? article.content;
  const nextCategory = category ?? article.category;
  const validationError = validateArticleInput({
    title: nextTitle,
    content: nextContent,
    category: nextCategory,
  });

  if (validationError) return sendError(res, 400, 'VALIDATION_ERROR', validationError);

  if (featured_image && !/^https?:\/\/.+/i.test(featured_image)) {
    return sendError(res, 400, 'VALIDATION_ERROR', 'Изображение должно быть корректным URL');
  }

  if (title) article.title = title.trim();
  if (content) article.content = content;
  if (category) article.category = category;
  if (featured_image !== undefined) article.featured_image = featured_image;

  if (title) {
    const nextSlug = slugify(title, { lower: true, strict: true });
    const existingArticle = articles.find((item) => item.slug === nextSlug && item._id !== article._id);
    if (existingArticle) {
      return sendError(res, 409, 'ARTICLE_EXISTS', 'Статья с таким заголовком уже существует');
    }
    article.slug = nextSlug;
  }

  article.updatedAt = new Date().toISOString();
  await saveArticles(articles);
  return sendSuccess(res, 200, article);
};

const remove = async (req, res) => {
  const articles = await getArticles();
  const article = articles.find((item) => item._id === req.params.id);
  if (!article) return sendError(res, 404, 'ARTICLE_NOT_FOUND', 'Статья не найдена');

  if (req.user.role !== 'admin' && article.authorId !== req.user.id) {
    return sendError(res, 403, 'FORBIDDEN', 'Нельзя удалять чужую статью');
  }

  const nextArticles = articles.filter((item) => item._id !== req.params.id);
  await saveArticles(nextArticles);
  return sendSuccess(res, 200, { message: 'Статья удалена' });
};

module.exports = { getAll, getById, create, update, remove };
