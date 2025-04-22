// server/routes/challengeTest.js

const express = require('express');
const router = express.Router();
const {
  getChallenges,
  getChallengeById,
  generateChallenge,
} = require('../controllers/challengeController');

// Temp test endpoints
router.get('/challenges', getChallenges);
router.get('/challenges/:id', getChallengeById);
router.post('/challenges/generate', generateChallenge);

module.exports = router;
