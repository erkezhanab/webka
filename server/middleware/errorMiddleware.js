const notFoundMiddleware = (req, res) => {
  res.status(404).json({ error: 'Not found' });
};

const errorMiddleware = (err, req, res, next) => {
  console.error('ERROR', err);
  res.status(500).json({ error: err.message || 'Server Error' });
};

module.exports = { notFoundMiddleware, errorMiddleware };
