const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const axios = require('axios');
const apiKey = require('../config/keys.js').apiKey;
const classID = require('../config/keys.js').classID;


router.get('/assignments', (req, res) => {
  axios({
    method: "GET",
    url: `https://canvas.instructure.com/api/v1/courses/${classID}/assignments`,
    headers: {
      'Authorization': apiKey
    }
  }).then(response => {
    res.json(response.data)
  }).catch(err => {
    res.json(err);
  })
});

router.get('/test', (req, res) => {
  res.json({ msg: 'works!'})
});

module.exports = router;
