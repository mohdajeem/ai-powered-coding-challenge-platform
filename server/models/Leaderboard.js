// server/models/Leaderboard.js

const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number, // in seconds or milliseconds
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;
