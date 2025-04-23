
const Leaderboard = require('../models/Leaderboard.js');
const Question = require('../models/Question.js');
const Submission = require('../models/Submission');
const Challenge = require('../models/Challenge');
const { gradeSubmission } = require('../services/aiBridge');


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
