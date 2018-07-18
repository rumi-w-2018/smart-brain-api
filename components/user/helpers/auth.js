const jwt = require('jwt-simple');
const config = require('../../../config/config');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ email: user.email }, config.secret);
};

module.exports = {
  tokenForUser
};
