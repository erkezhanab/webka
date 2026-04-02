const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/http');
const { getUsers } = require('../data/store');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return sendError(res, 401, 'TOKEN_REQUIRED', 'Требуется токен авторизации');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const users = await getUsers();
    const user = users.find((item) => item._id === decoded.id);
    if (!user) return sendError(res, 401, 'USER_NOT_FOUND', 'Пользователь не найден');

    req.user = { id: user._id.toString(), role: user.role, name: user.name };
    next();
  } catch (err) {
    return sendError(res, 401, 'INVALID_TOKEN', 'Недействительный токен');
  }
};

module.exports = authMiddleware;
