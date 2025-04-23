// server/services/leaderboardService.js

const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

const getTopPerformers = async (limit = 10) => {
  try {
    const leaderboard = await Leaderboard.aggregate([
      {
        $match: {
          score: { $ne: null },
          userId: { $ne: null }
        }
      },
      {
        $group: {
          _id: '$userId',
          totalScore: { $sum: '$score' },
        },
      },
      { $sort: { totalScore: -1 } },
      { $limit: limit },
    ]);

    const userIds = leaderboard.map(entry => entry._id);
    const users = await User.find({ _id: { $in: userIds } });

    const results = leaderboard.map(entry => {
      const user = users.find(u => u._id.toString() === entry._id.toString());
      return {
        userId: entry._id,
        username: user?.username || 'Unknown',
        totalScore: entry.totalScore,
      };
    });

    return results;
  } catch (error) {
    console.error('❌ Error fetching global leaderboard:', error);
    throw new Error('Failed to fetch global leaderboard');
  }
};

module.exports = {
  getTopPerformers,
};
