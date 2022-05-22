const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../utils/jwt');
const UnauthorizedError = require('../errors/UnauthorizedError');

// const JWT_SECRET = 'IAMSECRETPASSWORD';

const isAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.userId = jwt.decode(token).id;
  } catch (err) {
    next(new UnauthorizedError('Ошибка. Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = isAuth;
