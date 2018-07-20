const express = require('express');
const router = express.Router();

const { detectFaces } = require('./controllers/detect');
const passport = require('passport');
// Set up passport and config
require('../auth/passport')(passport);
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/', requireAuth, detectFaces);

// router.post('/', requireAuth, (req, res) => {
//   console.log('here, ', req);
//   detectFaces(req, res);
// });

module.exports = router;
