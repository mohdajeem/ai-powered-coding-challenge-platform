
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

// Middleware
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

// Import Routes
const authRoutes = require('./routes/auth');
const challengeRoutes = require('./routes/challenge');
const submissionRoutes = require('./routes/submission');
const leaderboardRoutes = require('./routes/leaderboard');
const runCodeRoutes = require('./routes/runCodeRoutes');

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/leaderboard', leaderboardRoutes); // Register leaderboard routes
app.use('/api/run-code', runCodeRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log('Failed to connect MongoDB', err);
});

module.exports = app;
