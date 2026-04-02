require('dotenv').config();
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const { createId, resetDb } = require('./data/store');

const seed = async () => {
  const now = new Date().toISOString();
  const users = [
    {
      _id: createId(),
      name: 'Reader User',
      email: 'reader@example.com',
      password: await bcrypt.hash('reader123', 12),
      role: 'reader',
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: createId(),
      name: 'Author User',
      email: 'author@example.com',
      password: await bcrypt.hash('author123', 12),
      role: 'author',
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: createId(),
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 12),
      role: 'admin',
      createdAt: now,
      updatedAt: now,
    },
  ];

  const articles = [
    {
      _id: createId(),
      title: 'Современные новости и удобный пользовательский опыт',
      slug: slugify('Современные новости и удобный пользовательский опыт', { lower: true, strict: true }),
      content: '<p>Эта статья демонстрирует работу новостного портала, удобную структуру контента и адаптивный интерфейс для пользователей.</p>',
      category: 'Tech',
      authorId: users[1]._id,
      featured_image: 'https://via.placeholder.com/800x450?text=Tech+Article',
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: createId(),
      title: 'Дизайн интерфейса для адаптивных веб-приложений',
      slug: slugify('Дизайн интерфейса для адаптивных веб-приложений', { lower: true, strict: true }),
      content: '<p>Материал посвящен визуальной иерархии, цветовой схеме, карточкам статей и улучшению читабельности на мобильных устройствах.</p>',
      category: 'Design',
      authorId: users[1]._id,
      featured_image: 'https://via.placeholder.com/800x450?text=Design+Article',
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: createId(),
      title: 'Портал новостей как пример MERN-приложения',
      slug: slugify('Портал новостей как пример MERN-приложения', { lower: true, strict: true }),
      content: '<p>В статье описывается применение React, Node.js, Express и MongoDB для построения полноценного веб-приложения с аутентификацией и CRUD.</p>',
      category: 'News',
      authorId: users[1]._id,
      featured_image: 'https://via.placeholder.com/800x450?text=News+Portal',
      createdAt: now,
      updatedAt: now,
    },
  ];

  await resetDb({ users, articles });

  console.log('Seed done', { users: users.length, articles: articles.length });
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
