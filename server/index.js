require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const { errorMiddleware, notFoundMiddleware } = require('./middleware/errorMiddleware');
const { ensureDb } = require('./data/store');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'News Portal RBAC API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

ensureDb()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Storage initialization failed:', err);
    process.exit(1);
  });
