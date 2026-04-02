require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Article = require('./models/article');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  await User.deleteMany();
  await Article.deleteMany();

  const users = await User.create([
    { name: 'Reader User', email: 'reader@example.com', password: await bcrypt.hash('reader123', 12), role: 'reader' },
    { name: 'Author User', email: 'author@example.com', password: await bcrypt.hash('author123', 12), role: 'author' },
    { name: 'Admin User', email: 'admin@example.com', password: await bcrypt.hash('admin123', 12), role: 'admin' }
  ]);

  const articles = await Article.create([
    { title: 'Белые темы: платформы', slug: 'white-skin-tutorial', content: '<p>Текст для белой темы...</p>', category: 'Tech', author: users[1]._id, featured_image: 'https://via.placeholder.com/800x450?text=White+Theme' },
    { title: 'Темные темы: ночной UX', slug: 'dark-skin-best-practices', content: '<p>Текст для темной темы...</p>', category: 'Design', author: users[1]._id, featured_image: 'https://via.placeholder.com/800x450?text=Dark+Theme' },
    { title: 'English Article for News', slug: 'english-news-example', content: '<p>English sample content for translation test.</p>', category: 'News', author: users[1]._id, featured_image: 'https://via.placeholder.com/800x450?text=English' }
  ]);

  console.log('Seed done', { users: users.length, articles: articles.length });
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});