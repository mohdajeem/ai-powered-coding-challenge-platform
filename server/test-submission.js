// server/submissionTest.js

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Submission = require('./models/Submission');

// Dummy ObjectIds (replace with real ones if needed)
const dummyUserId = '6624c47f7a56e8c7349d6e11';
const dummyChallengeId = '6624c4c97a56e8c7349d6e14';

const testSubmission = async () => {
  await connectDB();

  try {
    const submission = new Submission({
      user: dummyUserId,
      challenge: dummyChallengeId,
      code: `print("Hello, World!")`,
      language: 'python',
      result: {
        passed: true,
        feedback: 'All test cases passed!',
        score: 100,
      },
    });

    const saved = await submission.save();
    console.log('✅ Submission saved:', saved);
  } catch (err) {
    console.error('❌ Error saving submission:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

testSubmission();
