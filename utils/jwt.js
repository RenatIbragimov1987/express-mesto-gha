const JWT_SECRET = 'IAMSECRETPASSWORD';
const jwt = require('jsonwebtoken');

const getToken = async (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
module.exports = {
  getToken,
  JWT_SECRET,
};
