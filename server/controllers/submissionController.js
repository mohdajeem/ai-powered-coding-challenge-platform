// /*
// // server/controllers/submissionController.js

// const Submission = require('../models/Submission');
// const Challenge = require('../models/Challenge');
// const aiBridge = require('../services/aiBridge');

// const submitSolution = async (req, res) => {
//   try {
//     const { challengeId, code, language } = req.body;
//     const userId = req.user._id;

//     // Validate inputs
//     if (!challengeId || !code || !language) {
//       return res.status(400).json({ error: 'Missing required fields.' });
//     }

//     // Check if challenge exists
//     const challenge = await Challenge.findById(challengeId);
//     if (!challenge) {
//       return res.status(404).json({ error: 'Challenge not found.' });
//     }

//     // Grade via AI microservice
//     const gradingPayload = { code, language, testCases: challenge.testCases };
//     const result = await aiBridge.gradeSubmission(gradingPayload);

//     // Save to DB
//     const newSubmission = new Submission({
//       user: userId,
//       challenge: challenge._id,
//       code,
//       language,
//       result,
//     });

//     await newSubmission.save();

//     return res.status(201).json({
//       message: 'Submission evaluated successfully.',
//       result,
//     });

//   } catch (err) {
//     console.error('[❌ Submission Error]', err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = { submitSolution };
// */

// // server/controllers/submissionController.js
// const Submission = require('../models/Submission');
// const Challenge = require('../models/Challenge');
// const { gradeSubmission } = require('../services/aiBridge');

// // POST /api/submissions/submit
// const submitSolution = async (req, res) => {
//   try {
//     const { challengeId, userCode } = req.body;
//     const userId = req.user._id; // Assuming `req.user` is populated by auth middleware

//     // Find challenge by ID
//     const challenge = await Challenge.findById(challengeId);
//     if (!challenge) {
//       return res.status(404).json({ message: 'Challenge not found' });
//     }

//     // Call AI service to grade the user's code
//     const gradingResult = await gradeSubmission(challengeId, userCode);

//     // Save the submission to the database
//     const newSubmission = new Submission({
//       userId,
//       challengeId,
//       code: userCode,
//       score: gradingResult.score,
//       feedback: gradingResult.feedback,
//     });

//     await newSubmission.save();

//     res.status(201).json({ score: gradingResult.score, feedback: gradingResult.feedback });
//   } catch (err) {
//     console.error('❌ Error submitting solution:', err);
//     res.status(500).json({ message: 'Failed to submit solution' });
//   }
// };

// module.exports = {
//   submitSolution,
// };

/* 
// part 3

// server/controllers/submissionController.js

const Submission = require('../models/Submission');
const Challenge = require('../models/Challenge');
const { gradeSubmission } = require('../services/aiBridge');

// POST /api/submissions/submit
const submitSolution = async (req, res) => {
  try {
    const { challengeId, userId, userCode } = req.body;

    // Validate challenge
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Call AI grading service (Gemini)
    const gradingResult = await gradeSubmission(challengeId, userCode);

    // Save submission
    const submission = new Submission({
      challengeId,
      userId,
      userCode,
      feedback: gradingResult.feedback,
      score: gradingResult.score,
    });

    await submission.save();
    res.status(201).json({
      message: 'Submission graded successfully!',
      feedback: gradingResult.feedback,
      score: gradingResult.score,
      submission,
    });
  } catch (err) {
    console.error('❌ Error grading submission:', err);
    res.status(500).json({ message: 'Failed to grade submission' });
  }
};

// GET /api/submissions/:challengeId
const getSubmissionsByChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const submissions = await Submission.find({ challengeId });
    res.status(200).json(submissions);
  } catch (err) {
    console.error('❌ Error fetching submissions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitSolution,
  getSubmissionsByChallenge,
};

*/
const Leaderboard = require('../models/Leaderboard.js');
const Question = require('../models/Question.js');
const Submission = require('../models/Submission');
const Challenge = require('../models/Challenge');
const { gradeSubmission } = require('../services/aiBridge');

// const submitSolution = async (req, res) => {
//   try {
//     const { challengeId, userId, userCode } = req.body;

//     // Validate challenge
//     const challenge = await Challenge.findById(challengeId).populate('questions');
//     if (!challenge) {
//       return res.status(404).json({ message: 'Challenge not found' });
//     }

//     // Call AI grading service (Gemini)
//     // const gradingResult = await gradeSubmission(challengeId, userCode);
//     const [question] = challenge.questions;

//     const gradingResult = await gradeSubmission(question, userCode);

//     const timeTaken = Math.floor(Math.random() * 100); // Replace with actual time if you have it

//     // Save submission
//     const submission = new Submission({
//       challenge: challengeId,
//       user: userId,
//       code: userCode,
//       language: 'javascript', // ← optional/fix based on actual request
//       result: {
//         feedback: gradingResult.feedback,
//         passed: gradingResult.score > 0,
//         score: gradingResult.score,
//       },
//     });

//     await submission.save();

//     // 🔁 Update or insert in leaderboard
//     const existingEntry = await Leaderboard.findOne({ userId, challengeId });

//     if (!existingEntry) {
//       await Leaderboard.create({
//         userId,
//         challengeId,
//         score: gradingResult.score,
//         timeTaken,
//       });
//     } else {
//       if (
//         gradingResult.score > existingEntry.score ||
//         (gradingResult.score === existingEntry.score && timeTaken < existingEntry.timeTaken)
//       ) {
//         existingEntry.score = gradingResult.score;
//         existingEntry.timeTaken = timeTaken;
//         existingEntry.submittedAt = Date.now();
//         await existingEntry.save();
//       }
//     }

//     res.status(201).json({
//       message: 'Submission graded successfully!',
//       feedback: gradingResult.feedback,
//       score: gradingResult.score,
//       submission,
//     });

//   } catch (err) {
//     console.error('❌ Error grading submission:', err);
//     res.status(500).json({ message: 'Failed to grade submission' });
//   }
// };



// GET /api/submissions/:challengeId
const submitSolution = async (req, res) => {
  try {
    const { challengeId, questionId, userId, userCode } = req.body;

    // 🔍 Validate Challenge
    const challenge = await Challenge.findById(challengeId).populate('questions');
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // 🔍 Find the specific Question inside the Challenge
    const question = challenge.questions.find(q => q._id.toString() === questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found in the challenge' });
    }

    // 🤖 Call AI Grading Service for that question only
    const gradingResult = await gradeSubmission(question, userCode);

    const timeTaken = Math.floor(Math.random() * 100); // ⏱ Replace with actual tracking if needed

    // 💾 Save submission
    const submission = new Submission({
      challenge: challengeId,
      question: questionId,
      user: userId,
      code: userCode,
      language: 'javascript',
      result: {
        feedback: gradingResult.feedback,
        passed: gradingResult.score > 0,
        score: gradingResult.score,
      },
    });

    await submission.save();

    // 🏆 Leaderboard update
    const existingEntry = await Leaderboard.findOne({ userId, challengeId });

    if (!existingEntry) {
      await Leaderboard.create({
        userId,
        challengeId,
        score: gradingResult.score,
        timeTaken,
      });
    } else {
      const isBetterScore = gradingResult.score > existingEntry.score;
      const isSameScoreFaster = gradingResult.score === existingEntry.score && timeTaken < existingEntry.timeTaken;

      if (isBetterScore || isSameScoreFaster) {
        existingEntry.score = gradingResult.score;
        existingEntry.timeTaken = timeTaken;
        existingEntry.submittedAt = Date.now();
        await existingEntry.save();
      }
    }

    res.status(201).json({
      message: 'Submission graded successfully!',
      feedback: gradingResult.feedback,
      score: gradingResult.score,
      submission,
    });

  } catch (err) {
    console.error('❌ Error grading submission:', err);
    res.status(500).json({ message: 'Failed to grade submission' });
  }
};


const getSubmissionsByChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const submissions = await Submission.find({challenge: challengeId });
    res.status(200).json(submissions);
  } catch (err) {
    console.error('❌ Error fetching submissions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitSolution,
  getSubmissionsByChallenge,
};
