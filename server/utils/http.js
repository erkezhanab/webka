function sendError(res, status, code, message, details) {
  const payload = {
    error: {
      code,
      message,
    },
  };

  if (details) {
    payload.error.details = details;
  }

  return res.status(status).json(payload);
}

function sendSuccess(res, status, data) {
  return res.status(status).json(data);
}

module.exports = { sendError, sendSuccess };
