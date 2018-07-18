const express = require('express');
const passport = require('passport');
// Set up passport and config
require('./helpers/passport')(passport);
const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();
const { insertUser } = require('./controllers/registration');
const { signIn } = require('./controllers/signin');
const { updateUsageCount } = require('./controllers/image');

/*
router.get('/', res => {
  res.send('Root');
});
*/

router.post('/register', insertUser);

router.post('/signin', signIn);

router.post('/image', requireAuth, (req, res) => {
  // ** last param (respObj) is callback **
  // updateUsageCount(req, (respObj) => {...}), not updateUsageCount((req, respObj) => {...})
  updateUsageCount(req, respObj => {
    res.status(respObj.statusCode).json(respObj);
  });
});

module.exports = router;
