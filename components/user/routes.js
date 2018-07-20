const express = require('express');

const passport = require('passport');
// Set up passport and config
require('../auth/passport')(passport);
const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();
const { insertUser } = require('./controllers/registration');
const { signIn } = require('./controllers/signin');
const { updateUsageCount } = require('./controllers/usage'); // **** Change later

/*
router.get('/', res => {
  res.send('Root');
});
*/

router.post('/register', insertUser);

router.post('/signin', signIn);

// Currently not used
router.post('/usage', (req, res) => {
  updateUsageCount(req)
    .then(result => {
      console.log('promise reuslt', result);
      res.send('Success');
    })
    .catch(error => {
      res.send('Failed');
    });
});

module.exports = router;
