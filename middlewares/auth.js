const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../utils/jwt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const isAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Ошибка. Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = isAuth;

// const isAuth = async (token) => {
//   try {
//     const decoded = await jwt.verify(token, JWT_SECRET);
//     return !!decoded;
//   } catch (err) {
//     return false;
//   }
// };
