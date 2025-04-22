// server/models/Submission.js

const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  passed: {
    type: Boolean,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
  },
  question:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ['python', 'javascript', 'java', 'cpp'],
  },
  result: {
    type: resultSchema,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Submission', submissionSchema);
