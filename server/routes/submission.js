// server/routes/submission.js - 2

const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const authMiddleware = require('../middleware/auth');

// POST submit solution (protected)
router.post('/submit', authMiddleware, submissionController.submitSolution);

module.exports = router;

