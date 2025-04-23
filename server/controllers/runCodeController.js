const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const runCode = async (req, res) => {
  const { userCode, testInput, expectedOutput } = req.body;

  try {
    const tempFilePath = path.join(__dirname, 'tempCode.js');

    // Wrap user code with input simulation
    const wrappedCode = `
      const input = \`${testInput}\`;
      ${userCode}
    `;

    console.log('wrapped code:', wrappedCode);

    fs.writeFileSync(tempFilePath, wrappedCode);

    // Execute the code (handle spaces in path!)
    exec(`node "${tempFilePath}"`, (error, stdout, stderr) => {
      // 🧹 Clean up the temporary file
      fs.unlinkSync(tempFilePath);

      if (error || stderr) {
        return res.status(400).json({
          message: 'Code execution failed',
          error: error?.message || stderr,
          actualOutput: null,
          expectedOutput,
          passed: false,
        });
      }

      const actualOutput = stdout.trim();

      return res.status(200).json({
        message: 'Code executed successfully',
        actualOutput,
        expectedOutput,
        passed: actualOutput === expectedOutput,
      });
    });

  } catch (err) {
    console.error('Run code error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { runCode };
