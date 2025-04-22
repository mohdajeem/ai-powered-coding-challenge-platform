import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import { getToken } from '../services/auth';
import { javascript } from '@codemirror/lang-javascript';
import 'codemirror/lib/codemirror.css'; 
import 'codemirror/theme/material.css'; // For codemirror theme
import { jwtDecode } from "jwt-decode";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const LeftPanel = styled.div`
  width: 50%;
  padding: 30px;
  background-color: #f8fafc;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto;
`;

const RightPanel = styled.div`
  width: 50%;
  padding: 30px;
  background-color: #ffffff;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #374151;
  line-height: 1.6;
`;

const CodeEditorWrapper = styled.div`
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  overflow: hidden;
  height: 50vh; /* Adjust this value to make the editor taller or shorter */
  width: 100%; /* Ensure the editor takes up full width */
  min-width: 500px; /* Minimum width to prevent too small a display */
`;


const RunButton = styled.button`
  margin-top: 20px;
  background-color: #10b981;
  color: white;
  padding: 10px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #059669;
  }
`;

const TestCaseBox = styled.div`
  background-color: #e2e8f0;
  padding: 12px;
  border-radius: 8px;
  margin-top: 15px;
`;

const OutputBox = styled.pre`
  background-color: #f1f5f9;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 0.95rem;
  color: #1e293b;
`;

const NavigationButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const Challenge = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState('// Write your solution here...');
  const [output, setOutput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const token = getToken();
        const res = await axios.get(`${API_BASE}/challenges/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChallenge(res.data);
      } catch (err) {
        console.error('Error fetching challenge:', err);
      }
    };
    fetchChallenge();
  }, [id, currentQuestionIndex]);


  const handleRunCode = async () => {
    let results = [];
    console.log("test cases", testCases);
    for (const testCase of testCases) {
      console.log(testCase);
      try {
        console.log(code);
        const res = await axios.post(`${API_BASE}/run-code`, {
          userCode: code,
          testInput: testCase.input,
          expectedOutput: testCase.expectedOutput
        });
        console.log(res.data);
        const { actualOutput, expectedOutput, passed } = res.data;
        results.push(
          `Input: ${testCase.input}\nOutput: ${actualOutput}\nExpected: ${expectedOutput}\n${passed ? 'Passed' : 'Failed'}\n`
        );
  
      } catch (err) {
        results.push(
          `Error running input "${testCase.input}":\n${err.response?.data?.error || err.message}\n`
        );
      }
    }
  
    setOutput(results.join('\n----------------------\n'));
  };
  

  

  const handleSubmitCode = async () => {
    try {
      const token = getToken();
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      const res = await axios.post(`${API_BASE}/submissions/submit`, {
        challengeId: challenge._id,
        questionId: currentQuestion._id,
        userId:userId,
        userCode: code,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setOutput(`Submission Successful!\n📝 Status: ${res.data.message}`);
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Unknown submission error';
      setOutput(`Submission Failed:\n${errMsg}`);
    }
  };
  


  const nextQuestion = () => {
    if (currentQuestionIndex < challenge.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOutput('');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setOutput('');
    }
  };

  if (!challenge) return <div>Loading...</div>;

  const currentQuestion = challenge.questions[currentQuestionIndex];
  const testCases = currentQuestion.testCases;


  return (
    <Container>
      <LeftPanel>
        <Title>{currentQuestion.title}</Title>
        <Description>{currentQuestion.description}</Description>
        {testCases.map((testCase, index) => (
          <TestCaseBox key={index}>
            <h4>Test Case {index + 1}</h4>
            <ul>
              <li><strong>Input:</strong> {testCase.input}</li>
              <li><strong>Expected Output:</strong> {testCase.expectedOutput}</li>
            </ul>
          </TestCaseBox>
        ))}


        {/* Navigation Buttons */}
        <NavigationButtons>
          <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
            Previous Question
          </button>
          <button onClick={nextQuestion} disabled={currentQuestionIndex === challenge.questions.length - 1}>
            Next Question
          </button>
        </NavigationButtons>
      </LeftPanel>

      <RightPanel>
        <CodeEditorWrapper>
          <CodeMirror
            value={code}
            options={{
              mode: javascript,
              theme: 'material',
              lineNumbers: true,
            }}
            // onBeforeChange={(editor, data, value) => {
            //   console.log("code before change", value);
            //   setCode(value);
            // }}
            // onChange={(editor, data, value) => {
            //   console.log("Before setCode:", value); // Log before updating the state
            //   setCode(value);
            //   console.log("After setCode:", code); // Check if the state is being updated
            // }}
            extensions={[javascript()]}
            onChange={(value) => {
              console.log(value);
              setCode(value);
            }}
          />
        </CodeEditorWrapper>

        <RunButton onClick={handleRunCode}>Run Code</RunButton>
        <RunButton style={{ marginLeft: '10px', backgroundColor: '#3b82f6' }} onClick={handleSubmitCode}>
          Submit
        </RunButton>
        {output && <OutputBox>{output}</OutputBox>}
      </RightPanel>
    </Container>
  );
};

export default Challenge;
