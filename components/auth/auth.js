const jwt = require('jwt-simple');
const config = require('../../config/config');

const tokenForUser = user => {
  console.log('user in auth', user);
  //const timestamp = new Date().getTime();
  return jwt.encode({ id: user.id }, config.secret);
};

module.exports = {
  tokenForUser
};
