// server/routes/leaderboard.js

const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const authMiddleware = require('../middleware/auth');

// POST /submit: Submit score for a challenge (protected)
router.post('/submit', authMiddleware, leaderboardController.submitScore);

// GET /:challengeId: Get top scores for a challenge
router.get('/:challengeId', leaderboardController.getTopScores);

router.get('/', leaderboardController.getGlobalLeaderboard); // accessible at /api/leaderboard


module.exports = router;
