require('dotenv').config();
const secret = process.env.NODE_ENV_SECRET || process.env.TOKEN_SECRET;

module.exports = {
  secret
};
