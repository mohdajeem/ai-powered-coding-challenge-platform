// server/routes/submission.js - 2

const express = require('express');
const router = express.Router();
// const getSubmissionsByChallenge = require('../controllers/submissionController');
const submissionController = require('../controllers/submissionController');
const authMiddleware = require('../middleware/auth');

// POST submit solution (protected)
router.post('/submit', authMiddleware, submissionController.submitSolution);

router.get('/',authMiddleware, submissionController.getSubmissionsByChallenge);

module.exports = router;

