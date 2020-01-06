const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../db/user');
// Route paths are prepended with '/auth'
router.get('/', (req, res) => {
  res.json({
    message: '🔒',
  });
});

// Users can login to the app with valid email/password
// Users cannot login to the app with a blank or missing email
// Users cannot login to the app with a blank or incorrect password

function validateUser(user) {
  const validEmail = typeof user.email === 'string' && user.email.trim() != '';
  const validPassword =
    typeof user.password === 'string' && user.password.trim().length >= 6;

  // BOOLEAN
  return validEmail && validPassword;
}

// @params: req.body from /signup
router.post('/signup', (req, res, next) => {
  if (validateUser(req.body)) {
    User.getOneByEmail(req.body.email).then(user => {
      // This is a Unique email
      if (!user) {
        // Hash the pass!
        bcrypt.hash(req.body.password, 10).then(hash => {
          // Insert User into DB
          const user = {
            email: req.body.email,
            password: hash,
            created_at: new Date(),
          };
          User.create(user).then(id => {
            // Put res.json inside of the async function, because we want to wait until we found the one with the email
            res.json({
              id,
              message: '✅',
            });
          });
        });
      }
      // Email in use
      else {
        next(new Error('Email in use'));
      }
    });
  } else {
    next(new Error('Invalid user'));
  }
});
// Makes the router available in the outside world (a.k.a app.js)
module.exports = router;
