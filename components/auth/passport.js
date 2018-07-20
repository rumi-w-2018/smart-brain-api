//const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../../config/config');

const { db } = require('../helpers/database');

const jwtOptions = {
  //jwtFromRequest: ExtractJwt.fromBodyField('token'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log('payload', payload);

  return db('users')
    .where('id', payload.id)
    .select('id')
    .then(userId => {
      console.log('found', userId);
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
