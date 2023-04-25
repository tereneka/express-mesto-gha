const token = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationErr = require('../errors/authorizationErr');
const { errMessages } = require('../utils/errStatus');
// const { JWT_SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    throw new AuthorizationErr(errMessages.NEED_AUTH);
  }

  let payload;

  try {
    payload = token.verify(
      jwt,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch {
    () => {
      next(new AuthorizationErr(errMessages.NEED_AUTH));
    };
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
