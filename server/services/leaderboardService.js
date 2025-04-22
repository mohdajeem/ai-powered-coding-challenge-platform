// server/services/leaderboardService.js

// const Submission = require('../models/Submission');
// const User = require('../models/User');

// // Get top N users by total score
// const getTopPerformers = async (limit = 10) => {
//   try {
//     // Aggregate total scores by user
//     const leaderboard = await Submission.aggregate([
//       {
//         $group: {
//           _id: '$userId',
//           totalScore: { $sum: '$score' },
//         },
//       },
//       { $sort: { totalScore: -1 } },
//       { $limit: limit },
//     ]);

//     // Populate usernames or user details
//     const userIds = leaderboard.map(entry => entry._id);
//     const users = await User.find({ _id: { $in: userIds } });

//     // Map results to include usernames
//     const results = leaderboard.map(entry => {
//       const user = users.find(u => u._id.toString() === entry._id.toString());
//       return {
//         userId: entry._id,
//         username: user?.username || 'Unknown',
//         totalScore: entry.totalScore,
//       };
//     });

//     return results;
//   } catch (error) {
//     console.error('❌ Error fetching leaderboard:', error);
//     throw new Error('Failed to fetch leaderboard');
//   }
// };

// module.exports = {
//   getTopPerformers,
// };


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
