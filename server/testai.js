// server/routes/testAI.js

const express = require('express');
const router = express.Router();
const aiBridge = require('../services/aiBridge');

// Test challenge generation
router.post('/test-generate', async (req, res) => {
  try {
    const { skillLevel } = req.body;
    const challenge = await aiBridge.generateChallenge(skillLevel);
    res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test grading submission
router.post('/test-grade', async (req, res) => {
  try {
    const { userCode, challengeId } = req.body;
    const result = await aiBridge.gradeSubmission({ userCode, challengeId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
