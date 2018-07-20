require('dotenv').config();
const secret = process.env.TOKEN_SECRET || process.env.NODE_ENV_SECRET;

module.exports = {
  secret
};
