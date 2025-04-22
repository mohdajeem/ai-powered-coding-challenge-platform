// // server/controllers/leaderboardController.js

// const Leaderboard = require('../models/Leaderboard');

// exports.submitScore = async (req, res) => {
//   try {
//     const { challengeId, score, timeTaken } = req.body;
//     const userId = req.user.id; // comes from auth middleware

//     const entry = new Leaderboard({
//       userId,
//       challengeId,
//       score,
//       timeTaken,
//     });

//     await entry.save();

//     res.status(201).json({ message: 'Score submitted!', entry });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to submit score' });
//   }
// };

// exports.getTopScores = async (req, res) => {
//   try {
//     const { challengeId } = req.params;

//     const topScores = await Leaderboard.find({ challengeId })
//       .populate('userId', 'username') // Optional: get username from User
//       .sort({ score: -1, timeTaken: 1 }) // highest score, lowest time first
//       .limit(10);

//     res.status(200).json(topScores);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch leaderboard' });
//   }
// };


// server/controllers/leaderboardController.js

const Leaderboard = require('../models/Leaderboard');
const leaderboardService = require('../services/leaderboardService');

// Automatically handles insert/update leaderboard entry after a submission
exports.submitScore = async (req, res) => {
  try {
    const { challengeId, score, timeTaken } = req.body;
    const userId = req.user.id; // from auth middleware

    // 🔁 Check if this user already has a score for the challenge
    let entry = await Leaderboard.findOne({ userId, challengeId });

    if (!entry) {
      // First submission → create new entry
      entry = new Leaderboard({
        userId,
        challengeId,
        score,
        timeTaken,
      });
      await entry.save();
    } else {
      // 🧠 Update only if better score or faster time for same score
      if (
        score > entry.score ||
        (score === entry.score && timeTaken < entry.timeTaken)
      ) {
        entry.score = score;
        entry.timeTaken = timeTaken;
        entry.submittedAt = Date.now();
        await entry.save();
      }
    }

    res.status(201).json({
      message: 'Score submitted to leaderboard!',
      entry,
    });
  } catch (err) {
    console.error('❌ Error submitting score:', err);
    res.status(500).json({ error: 'Failed to submit score' });
  }
};

// GET top 10 scores for a challenge
exports.getTopScores = async (req, res) => {
  try {
    const { challengeId } = req.params;

    const topScores = await Leaderboard.find({ challengeId })
      .populate('userId', 'username') // includes username
      .sort({ score: -1, timeTaken: 1 }) // highest score + lowest time
      .limit(10);

    const ranked = topScores.map((entry, i) => ({
      rank: i + 1,
      username: entry.userId.username,
      score: entry.score,
      timeTaken: entry.timeTaken,
    }));

    res.status(200).json(ranked);
  } catch (err) {
    console.error('❌ Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

exports.getGlobalLeaderboard = async (req, res) => {
  try {
    const topPerformers = await leaderboardService.getTopPerformers();
    res.status(200).json(topPerformers);
  } catch (err) {
    console.error('❌ Error fetching global leaderboard:', err);
    res.status(500).json({ error: 'Failed to fetch global leaderboard' });
  }
};



