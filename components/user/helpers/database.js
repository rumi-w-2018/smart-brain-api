const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1', // local host
    user: process.env.NODE_ENV_DB_USER,
    password: process.env.NODE_ENV_DB_PASS,
    database: process.env.NODE_ENV_DB_NAME
  }
});

module.exports = {
  db
};
