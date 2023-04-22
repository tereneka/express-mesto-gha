const token = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = token.verify(
      jwt,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch {
    () => {
      res.status(401).send({ message: 'Необходима авторизация' });
    };
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
