require('dotenv').config();
const { generateChallenge, gradeSubmission } = require('./services/aiBridge');

// Test generating a challenge
(async () => {
  try {
    const response = await generateChallenge('medium');
    console.log('🧠 Generated Challenge:', response);
  } catch (error) {
    console.error(error.message);
  }
})();
