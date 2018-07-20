const { db } = require('../../helpers/database');
const bycript = require('bcrypt-nodejs');
const { tokenForUser } = require('../../auth/auth');
const { errorJson, successJson } = require('../../helpers/defaultResponses');

const signIn = (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(errorJson.statusCode).json({
      ...errorJson,
      message: 'Unable to sign in. Incomplete information.'
    });
  }

  db('login')
    .where('email', email)
    .select('email', 'hash')
    .then(data => {
      const isValid = bycript.compareSync(password, data[0].hash);
      if (isValid) {
        return db('users') // Don't need transaction because it's just reading.
          .where('email', data[0].email)
          .then(user => {
            res.status(successJson.statusCode).json({
              ...successJson,
              data: user[0],
              message: 'Successfully signed in.',
              token: tokenForUser(user[0])
            });
          })
          .catch(error => {
            res.status(errorJson.statusCode).json({
              ...errorJson,
              message: 'Unable to signed in.'
            });
          });
      } else {
        res.status(errorJson.statusCode).json({
          ...errorJson,
          message: 'Unable to signed in. Incorrect email/password combination.'
        });
      }
    })
    .catch(error => {
      res.status(errorJson.statusCode).json({
        ...errorJson,
        message: 'Unable to signed in. Incorrect email/password combination.'
      });
    });
};

module.exports = {
  signIn
};
