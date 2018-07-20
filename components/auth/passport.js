//const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { db } = require('../helpers/database');
const config = require('../../config/config');
const secret = config.secret;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  return db('users')
    .where('id', payload.id)
    .select('id')
    .then(userId => {
      // User found
      return done(null, userId);
    })
    .catch(error => {
      // User not found
      return done(null, false);
    });
});

module.exports = passport => {
  passport.use(jwtLogin);
};
