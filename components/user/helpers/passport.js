const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../../../config/config');

const { db } = require('./database');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromBodyField('token'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  return db('login')
    .where('email', payload.email)
    .select('email')
    .then(userEmail => {
      // User found
      return done(null, userEmail);
    })
    .catch(error => {
      // User not found
      return done(null, false);
    });
});

module.exports = passport => {
  passport.use(jwtLogin);
};
