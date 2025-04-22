// server/routes/submissionTestRoute.js

const express = require('express');
const router = express.Router();
const { submitSolution } = require('../controllers/submissionController');

// Dummy middleware to simulate a logged-in user
const mockAuth = (req, res, next) => {
  req.user = { _id: '6624c47f7a56e8c7349d6e11' }; // Replace with a real User ID
  next();
};

router.post('/test-submit', mockAuth, submitSolution);

module.exports = router;
