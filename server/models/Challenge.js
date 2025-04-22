// const mongoose = require('mongoose');

// const testCaseSchema = new mongoose.Schema({
//   input: { type: String, required: true },
//   expectedOutput: { type: String, required: true }
// });

// const challengeSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   difficulty: {
//     type: String,
//     enum: ['easy', 'medium', 'hard'],
//     // enum: ['beginner', 'expert', 'advance'], 
//     default: 'easy'
//   },
//   starterCode: { type: String },
//   testCases: [testCaseSchema],
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   generatedByAI: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const Challenge = mongoose.model('Challenge', challengeSchema);
// module.exports = Challenge;

//-------------------------------------------------------------
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  generatedByAI: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;
