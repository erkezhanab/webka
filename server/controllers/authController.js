const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendError, sendSuccess } = require('../utils/http');
const { createId, getUsers, saveUsers } = require('../data/store');

const emailPattern = /^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/;

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return sendError(res, 400, 'VALIDATION_ERROR', 'Имя, email и пароль обязательны');
  }

  if (name.trim().length < 2) {
    return sendError(res, 400, 'VALIDATION_ERROR', 'Имя должно содержать минимум 2 символа');
  }

  if (!emailPattern.test(email)) {
    return sendError(res, 400, 'VALIDATION_ERROR', 'Введите корректный email');
  }

  if (password.length < 6) {
    return sendError(res, 400, 'VALIDATION_ERROR', 'Пароль должен содержать минимум 6 символов');
  }

  const normalizedRole = ['reader', 'author'].includes(role) ? role : 'reader';
  const users = await getUsers();

  const existing = users.find((user) => user.email === email.trim().toLowerCase());
  if (existing) return sendError(res, 409, 'EMAIL_EXISTS', 'Пользователь с таким email уже зарегистрирован');

  const hashed = await bcrypt.hash(password, 12);
  const now = new Date().toISOString();
  const user = {
    _id: createId(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: hashed,
    role: normalizedRole,
    createdAt: now,
    updatedAt: now,
  };

  users.push(user);
  await saveUsers(users);

  return sendSuccess(res, 201, { id: user._id, name: user.name, email: user.email, role: user.role });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(res, 400, 'VALIDATION_ERROR', 'Email и пароль обязательны');
  }

  const users = await getUsers();
  const user = users.find((item) => item.email === email.trim().toLowerCase());
  if (!user) return sendError(res, 401, 'INVALID_CREDENTIALS', 'Неверный email или пароль');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return sendError(res, 401, 'INVALID_CREDENTIALS', 'Неверный email или пароль');

  const payload = { id: user._id, role: user.role, name: user.name, email: user.email };
  const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  return sendSuccess(res, 200, { token, user: payload });
};

module.exports = { register, login };
