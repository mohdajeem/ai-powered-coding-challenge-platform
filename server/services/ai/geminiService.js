
const axios = require('axios');

const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Extract JSON block from text using regex
 */
const extractJSON = (text) => {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON object found in response');
  return JSON.parse(jsonMatch[0]);
};

/**
 * Generates a coding challenge from Gemini API based on skill level.
 * @param {string} skillLevel - The difficulty level (easy, medium, hard).
 * @returns {Object} - An object with title, description, starterCode, testCases.
 */
const generateChallengeWithGemini = async (skillLevel) => {
  try {
    const prompt = `
          Generate a coding challenge set for JavaScript based on a given skill level ("easy", "medium", or "hard").
          Return ONLY valid JSON using this exact schema:

          {
            "title": "string",
            "description": "string",
            "difficulty": "easy" | "medium" | "hard",
            "questions": [
              {
                "title": "string",
                "description": "string",
                "starterCode": "string",
                "testCases": [
                  {
                    "input": "string",
                    "expectedOutput": "string"
                  }
                ]
              }
            ]
          }

          🧠 Rules:
          - Include between 2 and 4 questions.
          - Each question must include 'starterCode' and at least one test case.
          - "difficulty" MUST BE one of: "easy", "medium", or "hard".
          - Return ONLY JSON (no markdown, no explanation).
          `;


    const response = await axios.post(
      `${GEMINI_API_URL}/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response.data);
    const textResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      throw new Error('Gemini returned an empty response');
    }

    const challengeData = extractJSON(textResponse);
    console.log(challengeData);

    // ✅ Remove empty test cases
    // challengeData.testCases = challengeData.testCases.filter(tc =>
    //   tc.input && tc.expectedOutput
    // );

    // const validDifficulties = ['easy', 'medium', 'hard'];
    // let receivedDifficulty = challengeData.difficulty?.toLowerCase();

    // if (!validDifficulties.includes(receivedDifficulty)) {
    //   console.warn(`⚠️ Gemini returned invalid difficulty: ${challengeData.difficulty}`);
    //   // Fallback: try using requested skillLevel
    //   receivedDifficulty = skillLevel.toLowerCase();
    //   if (!validDifficulties.includes(receivedDifficulty)) {
    //     receivedDifficulty = 'easy'; // Final fallback
    //   }
    // }
    // challengeData.difficulty = receivedDifficulty;

    // Validate and sanitize questions
    challengeData.questions = (challengeData.questions || []).filter(q =>
      q.title && q.description && q.starterCode && Array.isArray(q.testCases)
    );

    if (challengeData.questions.length === 0) {
      throw new Error('Gemini returned empty or invalid questions');
    }


    return challengeData;
  } catch (err) {
    console.error('❌ Error in Gemini challenge generation:', err.message);
    throw new Error('AI generation failed');
  }
};

// server/ai/geminiService.js

const gradeSubmissionWithGemini = async (challenge, userCode) => {
  try {
    const prompt = `
You are a strict and smart JavaScript code grader.

Evaluate the user's code based on this challenge:

---
Title: ${challenge.title}
Description: ${challenge.description}
Starter Code: ${challenge.starterCode}
Test Cases:
${challenge.testCases.map(tc => `- Input: ${tc.input} → Expected Output: ${tc.expectedOutput}`).join('\n')}
---

User's Submitted Code:
${userCode}

Instructions:
1. Analyze the code to see if it solves the challenge correctly.
2. Mentally test the code using the provided test cases.
3. Provide feedback if anything is wrong.
4. Give a score between 0 and 100 based on logic, correctness, and completeness.

⚠ Return ONLY valid JSON in this format:
{
  "feedback": "string",
  "score": number
}
`;

    const response = await axios.post(
      `${GEMINI_API_URL}/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const textResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      throw new Error('Gemini returned an empty response');
    }

    const grading = extractJSON(textResponse);

    return {
      feedback: grading.feedback || 'No feedback provided.',
      score: grading.score ?? 0
    };

  } catch (err) {
    console.error('❌ Error in Gemini grading:', err.message);
    return {
      feedback: 'Gemini grading failed. Please try again.',
      score: 0
    };
  }
};

module.exports = {
  generateChallengeWithGemini,
  gradeSubmissionWithGemini
};
