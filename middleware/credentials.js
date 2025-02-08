const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
  const origion = req.headers.origin;

  if (allowedOrigins.includes(origion)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};

module.exports = credentials;
