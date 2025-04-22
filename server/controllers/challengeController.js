// // /*
// // // server/controllers/challengeController.js

// // const Challenge = require('../models/Challenge');
// // const { generateChallenge: generateFromAI } = require('../services/aiBridge');

// // // GET /api/challenges
// // const getChallenges = async (req, res) => {
// //   try {
// //     const challenges = await Challenge.find();
// //     res.status(200).json(challenges);
// //   } catch (err) {
// //     console.error('❌ Error fetching challenges:', err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // // GET /api/challenges/:id
// // const getChallengeById = async (req, res) => {
// //   try {
// //     const challenge = await Challenge.findById(req.params.id);
// //     if (!challenge) {
// //       return res.status(404).json({ message: 'Challenge not found' });
// //     }
// //     res.status(200).json(challenge);
// //   } catch (err) {
// //     console.error('❌ Error fetching challenge:', err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // // POST /api/challenges/generate
// // const generateChallenge = async (req, res) => {
// //   try {
// //     const { skillLevel } = req.body;

// //     // Call AI bridge
// //     const aiResponse = await generateFromAI(skillLevel);

// //     const newChallenge = new Challenge({
// //       title: aiResponse.title,
// //       description: aiResponse.description,
// //       difficulty: skillLevel,
// //       starterCode: aiResponse.starterCode || '',
// //       testCases: aiResponse.testCases || [],
// //       generatedByAI: true,
// //     });

// //     await newChallenge.save();
// //     res.status(201).json(newChallenge);
// //   } catch (err) {
// //     console.error('❌ Error generating challenge:', err);
// //     res.status(500).json({ message: 'AI Challenge generation failed' });
// //   }
// // };

// // module.exports = {
// //   getChallenges,
// //   getChallengeById,
// //   generateChallenge,
// // };

// // */

// // // server/controllers/challengeController.js
// // const Challenge = require('../models/Challenge');
// // const { generateChallenge: generateFromAI } = require('../services/aiBridge');

// // // GET /api/challenges
// // const getChallenges = async (req, res) => {
// //   try {
// //     const challenges = await Challenge.find();
// //     res.status(200).json(challenges);
// //   } catch (err) {
// //     console.error('❌ Error fetching challenges:', err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // // GET /api/challenges/:id
// // const getChallengeById = async (req, res) => {
// //   try {
// //     const challenge = await Challenge.findById(req.params.id);
// //     if (!challenge) {
// //       return res.status(404).json({ message: 'Challenge not found' });
// //     }
// //     res.status(200).json(challenge);
// //   } catch (err) {
// //     console.error('❌ Error fetching challenge:', err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // // POST /api/challenges/generate
// // const generateChallenge = async (req, res) => {
// //   try {
// //     const { skillLevel } = req.body;

// //     // Call AI bridge to generate the challenge
// //     const aiResponse = await generateFromAI(skillLevel);

// //     // Create new challenge document with the AI-generated data
// //     const newChallenge = new Challenge({
// //       title: aiResponse.title,
// //       description: aiResponse.description,
// //       difficulty: skillLevel,
// //       starterCode: aiResponse.starterCode || '',
// //       testCases: aiResponse.testCases || [],
// //       generatedByAI: true,
// //     });

// //     await newChallenge.save();
// //     res.status(201).json(newChallenge);
// //   } catch (err) {
// //     console.error('❌ Error generating challenge:', err);
// //     res.status(500).json({ message: 'AI Challenge generation failed' });
// //   }
// // };

// // module.exports = {
// //   getChallenges,
// //   getChallengeById,
// //   generateChallenge,
// // };

// // server/controllers/challengeController.js

// const Challenge = require('../models/Challenge');
// const { generateChallenge } = require('../services/aiBridge');

// // GET /api/challenges
// const getChallenges = async (req, res) => {
//   try {
//     const challenges = await Challenge.find();
//     res.status(200).json(challenges);
//   } catch (err) {
//     console.error('❌ Error fetching challenges:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // GET /api/challenges/:id
// const getChallengeById = async (req, res) => {
//   try {
//     const challenge = await Challenge.findById(req.params.id);
//     if (!challenge) {
//       return res.status(404).json({ message: 'Challenge not found' });
//     }
//     res.status(200).json(challenge);
//   } catch (err) {
//     console.error('❌ Error fetching challenge by ID:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // POST /api/challenges/generate
// const generateChallengeController = async (req, res) => {
//   try {
//     const { skillLevel } = req.body;

//     // Call Gemini-powered AI service
//     const aiResponse = await generateChallenge(skillLevel);

//     const newChallenge = new Challenge({
//       title: aiResponse.title,
//       description: aiResponse.description,
//       difficulty: skillLevel,
//       starterCode: aiResponse.starterCode || '',
//       testCases: aiResponse.testCases || [],
//       generatedByAI: true,
//     });

//     await newChallenge.save();
//     res.status(201).json(newChallenge);
//   } catch (err) {
//     console.error('❌ Error generating challenge:', err);
//     res.status(500).json({ message: 'AI Challenge generation failed' });
//   }
// };

// module.exports = {
//   getChallenges,
//   getChallengeById,
//   generateChallenge: generateChallengeController,
// };


// server/controllers/challengeController.js

const Challenge = require('../models/Challenge');
const Question = require('../models/Question');
const { generateChallenge } = require('../services/aiBridge');
const { getTopPerformers } = require('../services/leaderboardService');

// GET /api/challenges
// const getChallenges = async (req, res) => {
//   try {
//     const challenges = await Challenge.find();
//     console.log(challenges);
//     res.status(200).json(challenges);
//   } catch (err) {
//     console.error('❌ Error fetching challenges:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().populate('questions'); // 👈 this is key!
    res.status(200).json(challenges);
  } catch (err) {
    console.error('❌ Error fetching challenges:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET /api/challenges/:id
const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).populate('questions');
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.status(200).json(challenge);
  } catch (err) {
    console.error('❌ Error fetching challenge by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/challenges/generate
// POST /api/challenges/generate
const generateChallengeController = async (req, res) => {
  const Question = require('../models/Question');

  try {
    const { skillLevel } = req.body;

    // Step 1: Get AI response in new schema
    const aiResponse = await generateChallenge(skillLevel);
    const { title, description, difficulty, questions } = aiResponse;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'No questions generated by AI' });
    }

    // Step 2: Create Question documents
    const createdQuestions = await Question.insertMany(questions);

    // Step 3: Create Challenge with references to questions
    const newChallenge = new Challenge({
      title,
      description,
      difficulty,
      generatedByAI: true,
      questions: createdQuestions.map(q => q._id),
    });

    await newChallenge.save();

    res.status(201).json(newChallenge);
  } catch (err) {
    console.error('❌ Error generating challenge:', err);
    res.status(500).json({ message: 'AI Challenge generation failed' });
  }
};


// GET /api/challenges/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await getTopPerformers(10); // Get top 10
    res.status(200).json(topUsers);
  } catch (error) {
    console.error('❌ Error getting leaderboard:', error);
    res.status(500).json({ message: 'Failed to get leaderboard' });
  }
};

module.exports = {
  getChallenges,
  getChallengeById,
  generateChallenge: generateChallengeController,
  getLeaderboard,
};
