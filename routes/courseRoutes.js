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
  axios
  .get(
    `https://canvas.instructure.com/api/v1/courses/${classID}/assignments`,
    { headers: { 'Authorization': apiKey }}
  )
  .then(response => {
    res.json(response.data)
  })
  .catch(err => {
    res.json(err);
  })
});

router.delete('/assignments/:id', (req, res) => {
  axios
  .delete(
    `https://canvas.instructure.com/api/v1/courses/${classID}/assignments/${req.params.id}`,
    { headers: { 'Authorization': apiKey }}
  )
  .then(response => {
    res.json(response.data)
  })
  .catch(err => {
    res.json(err);
  })
});

router.post('/create-assignment', (req, res) => {
  axios
  .post(
    `https://canvas.instructure.com/api/v1/courses/${classID}/assignments/?assignment[name]=${req.body.assignmentName}&assignment[points_possible]=${req.body.assignmentPoints}&assignment[description]=${req.body.assignmentDescription}`,
    { withCredentials: true },
    { headers: { 'Authorization': apiKey } }
  )
  .then(response => {
    res.json(response.data)
  })
  .catch(err => {
    res.json(err)
  })
});

router.get('/test', (req, res) => {
  res.json({ msg: 'works!'})
});

module.exports = router;
