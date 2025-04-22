// src/pages/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding: 40px;
  background: #f8fafc;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.05);
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 20px;
  background: #e2e8f0;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px 20px;
  border-top: 1px solid #e5e7eb;
`;

const Leaderboard = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/leaderboard/${id}`);
        console.log(res);
        setData(res.data.submissions || []);
        setChallengeTitle(res.data.title || "Challenge Leaderboard");
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [id]);

  if (loading) return <Container>Loading Leaderboard...</Container>;

  return (
    <Container>
      <Title>🏆 {challengeTitle} Leaderboard</Title>
      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>User</Th>
            <Th>Score</Th>
            <Th>Time</Th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <Td colSpan="4">No submissions yet</Td>
            </tr>
          ) : (
            data.map((entry, index) => (
              <tr key={entry._id}>
                <Td>{index + 1}</Td>
                <Td>{entry.userName || 'Anonymous'}</Td>
                <Td>{entry.score}</Td>
                <Td>{new Date(entry.timestamp).toLocaleString()}</Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Leaderboard;
