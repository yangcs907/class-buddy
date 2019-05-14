// Routes for registering, logging in users
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const passport = require('passport');

//load inputValidation
const registervalidation = require('../validation/registervalidation.js');
const loginvalidation = require('../validation/loginvalidation.js');

//load User model
const User = require('../models/User.js');

// GET /users/test || tests users route
router.get('/test', (req, res) => {
  res.json({ msg: "Users route works!" })
});

// POST /users/register || registers a new user into MongoDB
router.post('/register', (req, res) => {
  const { errors, isValid } = registervalidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    });
});

// GET /users/login || log in user
router.post('/login', (req, res) => {
  const { errors, isValid } = loginvalidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name
            };
            // sign token
            // expires in # seconds
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            });
          } else {
            errors.password = 'Password is incorrect'
            return res.status(400).json(errors);
          }
        })
    });
});


module.exports = router;
