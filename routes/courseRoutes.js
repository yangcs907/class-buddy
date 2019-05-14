// Routes for course functionality (with canvas API)
const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

const apiKey = require('../config/keys.js').apiKey;
const classID = require('../config/keys.js').classID;

const createvalidation = require('../validation/createvalidation.js');

// GET /course/test || tests course route
router.get('/test', (req, res) => {
  res.json({ msg: "Course route works!" })
});

// GET /course/assignments || gets assignments from course  || access: private (requires authentication)
router.get('/assignments', passport.authenticate('jwt', { session: false }),  (req, res) => {
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

// DELETE /course/assignment/:id || Deletes a particular assignment || access: private (requires authentication)
router.delete('/assignments/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
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

// POST /course/create-assignment || creates new assignment || access: private (requires authentication)
router.post('/create-assignment', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = createvalidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
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


module.exports = router;
