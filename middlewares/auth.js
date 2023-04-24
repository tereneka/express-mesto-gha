const token = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationErr = require('../errors/authorizationErr');
const { errMessages } = require('../utils/errStatus');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    throw new AuthorizationErr(errMessages.NEED_AUTH);
  }

  let payload;

  try {
    payload = token.verify(jwt, 'JWT_SECRET');
  } catch {
    () => {
      next(new AuthorizationErr(errMessages.NEED_AUTH));
    };
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
