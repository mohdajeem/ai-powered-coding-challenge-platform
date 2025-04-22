/*
const axios = require('axios');

const AI_BASE_URL = process.env.AI_SERVICE_URL; // e.g., http://localhost:5000

const generateChallenge = async (skillLevel) => {
  try {
    const res = await axios.post(`${AI_BASE_URL}/generate`, { skillLevel });
    return res.data;
  } catch (err) {
    console.error('❌ Error generating challenge:', err.message);
    throw new Error('Failed to generate challenge from AI service');
  }
};

const gradeSubmission = async (submission) => {
  try {
    const res = await axios.post(`${AI_BASE_URL}/grade`, submission);
    return res.data;
  } catch (err) {
    console.error('❌ Error grading submission:', err.message);
    throw new Error('Failed to grade submission via AI service');
  }
};

module.exports = {
  generateChallenge,
  gradeSubmission
};

*/
// // server/services/aiBridge.js
// const axios = require('axios');
// require('dotenv').config();

// // Load Gemini API URL and Key from environment variables
// const geminiAPIUrl = process.env.GEMINI_API_URL;
// const geminiAPIKey = process.env.GEMINI_API_KEY;

// // Function to generate a challenge based on skill level
// const generateChallenge = async (skillLevel) => {
//   try {
//     const response = await axios.post(
//       `${geminiAPIUrl}/generate-challenge`, // Endpoint to generate challenge
//       {
//         skillLevel: skillLevel, // Pass the skill level as a parameter
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${geminiAPIKey}`, // Add the API key in the header
//         },
//       }
//     );

//     // Assume response contains challenge details like title, description, etc.
//     if (response.status === 200) {
//       return response.data; // Return the generated challenge details
//     } else {
//       throw new Error('Failed to generate challenge');
//     }
//   } catch (error) {
//     console.error('❌ Error generating challenge:', error.message);
//     throw new Error('Failed to generate challenge');
//   }
// };

// // Function to grade a submission based on challengeId and userCode
// const gradeSubmission = async (challengeId, userCode) => {
//   try {
//     const response = await axios.post(
//       `${geminiAPIUrl}/grade-submission`, // Endpoint to grade the submission
//       {
//         challengeId: challengeId, // Pass the challenge ID
//         userCode: userCode, // Pass the user’s code for grading
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${geminiAPIKey}`, // Add the API key in the header
//         },
//       }
//     );

//     // Check if grading was successful and return results
//     if (response.status === 200) {
//       return response.data; // Return grading results (e.g., score, feedback)
//     } else {
//       throw new Error('Failed to grade submission');
//     }
//   } catch (error) {
//     console.error('❌ Error grading submission:', error.message);
//     throw new Error('Failed to grade submission');
//   }
// };

// module.exports = {
//   generateChallenge,
//   gradeSubmission,
// };


// called gemini 
// server/services/aiBridge.js
const Question = require('../models/Question.js');
const Challenge = require('../models/Challenge.js');
const { generateChallengeWithGemini, gradeSubmissionWithGemini } = require('./ai/geminiService');

// Function to generate a challenge using Gemini AI
const generateChallenge = async (skillLevel) => {
  return await generateChallengeWithGemini(skillLevel);
};

// // Function to grade a submission using Gemini AI
// const gradeSubmission = async (challengeId, userCode) => {
//   return await gradeSubmissionWithGemini(challengeId, userCode);
// };

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

