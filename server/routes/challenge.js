
const express = require('express');
const router = express.Router();
const { generateChallenge, getLeaderboard, getChallenges, getChallengeById} = require('../controllers/challengeController.js');
const  authenticate = require('../middleware/auth.js');

router.get('/',authenticate, getChallenges);
router.post('/generate',authenticate, generateChallenge);
router.get('/:id', authenticate, getChallengeById)
router.get('/leaderboard', getLeaderboard); // <- New route here!

module.exports = router;
