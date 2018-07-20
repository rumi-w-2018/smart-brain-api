const jwt = require('jwt-simple');
const config = require('../../config/config');

const tokenForUser = user => {
  return jwt.encode({ id: user.id }, config.secret);
};

module.exports = {
  tokenForUser
};
