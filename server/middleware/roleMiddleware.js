const { sendError } = require('../utils/http');

const roleMiddleware = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 403, 'FORBIDDEN', 'Недостаточно прав для выполнения действия');
    }
    next();
  };
};

module.exports = roleMiddleware;
