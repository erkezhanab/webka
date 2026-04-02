const Article = require('../models/article');
const slugify = require('slugify');

const getAll = async (req, res) => {
  const { search, category } = req.query;
  const filter = { };
  if (search) filter.title = { $regex: search, $options: 'i' };
  if (category) filter.category = category;

  const articles = await Article.find(filter).populate('author', 'name role').sort({ createdAt: -1 });
  res.json(articles);
};

const getById = async (req, res) => {
  const article = await Article.findById(req.params.id).populate('author', 'name role');
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json(article);
};

const create = async (req, res) => {
  const { title, content, category, featured_image } = req.body;
  if (!title || !content || !category) return res.status(400).json({ error: 'Required fields missing' });

  const slug = slugify(title, { lower: true, strict: true });
  const exists = await Article.findOne({ slug });
  if (exists) return res.status(409).json({ error: 'Article slug already exists' });

  const article = await Article.create({
    title,
    slug,
    content,
    category,
    featured_image: featured_image || '',
    author: req.user.id,
  });

  res.status(201).json(article);
};

const update = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ error: 'Article not found' });

  if (req.user.role !== 'admin' && article.author.toString() !== req.user.id) {
    return res.status(403).json({ error: 'No permission to edit this article' });
  }

  const { title, content, category, featured_image } = req.body;
  if (title) article.title = title;
  if (content) article.content = content;
  if (category) article.category = category;
  if (featured_image) article.featured_image = featured_image;

  if (title) article.slug = slugify(title, { lower: true, strict: true });

  await article.save();
  res.json(article);
};

const remove = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ error: 'Article not found' });

  if (req.user.role !== 'admin' && article.author.toString() !== req.user.id) {
    return res.status(403).json({ error: 'No permission to delete this article' });
  }

  await Article.deleteOne({ _id: req.params.id });
  res.json({ message: 'Deleted' });
};

module.exports = { getAll, getById, create, update, remove };
