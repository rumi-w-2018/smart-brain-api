const { db } = require('../../helpers/database');
const bcrypt = require('bcrypt-nodejs');
const { tokenForUser } = require('../../auth/auth');
const { errorJson, successJson } = require('../../helpers/defaultResponses');

const insertUser = (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(errorJson.statusCode).json({
      ...errorJson,
      message: 'Unable to register. Incomplete information.'
    });
  }
  const hash = bcrypt.hashSync(password);

  // when processes are wrapped in transaction, if one fails, all fail
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users') // 'returning the 2nd transaction' is important
          .returning(['name', 'email', 'id']) // Insert and return the inserted user
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.status(successJson.statusCode).json({
              ...successJson,
              message: 'Successfully registered.',
              data: { id: user[0].id },
              token: tokenForUser(user[0])
            });
          });
      })
      .then(trx.commit) // without this update won't persist
      .catch(trx.rollback);
  }).catch(error => {
    console.log(error);

    res.status(errorJson.statusCode).json({
      ...errorJson,
      message: 'Unable to register.'
    });
  });
};

module.exports = {
  insertUser
};
