
// called gemini 
// server/services/aiBridge.js
const Question = require('../models/Question.js');
const Challenge = require('../models/Challenge.js');
const { generateChallengeWithGemini, gradeSubmissionWithGemini } = require('./ai/geminiService');

// Function to generate a challenge using Gemini AI
const generateChallenge = async (skillLevel) => {
  return await generateChallengeWithGemini(skillLevel);
};

// Function to grade a submission using Gemini AI
  const gradeSubmission = async (questionId, userCode) => {
    console.log("recieved challenge", questionId);
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error('Challenge not found');
    }

    // Pass the full challenge to the grading function
    console.log("populated Challenge : ", question);
    return await gradeSubmissionWithGemini(question, userCode);
  };


module.exports = {
  generateChallenge,
  gradeSubmission,
};

