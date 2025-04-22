// server/testCreateUser.js
/*
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const createTestUser = async () => {
  await connectDB();
  const newUser = new User({
    username: 'testuser',
    email: 'test@example.com',
    password: '12345678'
  });

  try {
    await newUser.save();
    console.log('✅ User saved:', newUser);
  } catch (err) {
    console.error('❌ Error saving user:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

createTestUser();
*/

// 2nd 
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Challenge = require('./models/Challenge');

// Connect to DB first
(async () => {
  try {
    await connectDB();

    const challenge = new Challenge({
      title: "Reverse a String",
      description: "Write a function to reverse a string.",
      difficulty: "easy",
      starterCode: `function reverseString(str) {
  // your code here
}`,
      testCases: [
        { input: `"hello"`, expectedOutput: `"olleh"` },
        { input: `"world"`, expectedOutput: `"dlrow"` }
      ],
      generatedByAI: true
    });

    const saved = await challenge.save();
    console.log("✅ Challenge saved:", saved);

    await mongoose.connection.close();
    console.log("📡 MongoDB connection closed.");
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.connection.close();
  }
})();
