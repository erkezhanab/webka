const { sendError } = require('../utils/http');

const notFoundMiddleware = (req, res) => {
  return sendError(res, 404, 'NOT_FOUND', 'Ресурс не найден');
};

const errorMiddleware = (err, req, res, next) => {
  console.error('ERROR', err);
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Внутренняя ошибка сервера';
  return sendError(res, status, code, message);
};

module.exports = { notFoundMiddleware, errorMiddleware };
