import React, { useState } from 'react';
import { useChallenges } from '../hooks/useChallenges';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/auth';
import axios from 'axios';

const Dashboard = () => {
  const { challenges, loading, error } = useChallenges();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false); // 🌗 Theme Toggle State

  const handleViewChallenge = (id) => {
    navigate(`/challenges/${id}`);
  };

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const handleCreateChallenge = () => {
    const skillLevel = 'medium';
    const createChallenge = async () => {
      try {
        const token = getToken();
        const res = await axios.post(
          `${API_BASE}/challenges/generate`,
          { skillLevel },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log('error in creating challenge', err);
      }
    };
    createChallenge();
  };

  const handleLeaderboard = (id) => {
    navigate(`/leaderboard/${id}`);
  };

  // 🎨 Theming Classes
  const mainBG = darkMode
    ? 'bg-gradient-to-br from-[#1E1E1E] via-[#2D2D2D] to-[#3A3A3A] text-white'
    : 'bg-gradient-to-br from-[#FDF6D8] via-[#E7ED9B] to-[#9EBD6E] text-[#5A3E36]';

  const cardBG = darkMode ? 'bg-white/10' : 'bg-[#FFF8E1]/70';
  const hoverBG = darkMode ? 'hover:bg-white/20' : 'hover:bg-[#FFF3C0]';
  const textColor = darkMode ? 'text-white' : 'text-[#5A3E36]';

  return (
    <div className={`min-h-screen ${mainBG} p-8 font-outfit relative transition-colors duration-500`}>
      {/* 🌗 Theme Toggle Switch */}
      <div className="absolute top-6 right-8 z-50">
        <label className="flex items-center cursor-pointer">
          <span className="mr-2 text-2xl">{darkMode ? '🌙' : '☀️'}</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only"
            />
            <div className="w-12 h-6 bg-gray-400 rounded-full shadow-inner transition-colors duration-300"></div>
            <div
              className={`absolute w-6 h-6 bg-white rounded-full shadow -top-0.5 left-0 transform transition-transform duration-300 ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </div>
        </label>
      </div>

      <h1 className="text-5xl font-semibold text-center mb-12 drop-shadow-md">
        Challenge Dashboard
      </h1>

      <div className="flex gap-8">
        {/* Left Side Leaderboard + Create Challenge */}
        <div className="w-1/3">
          <div className={`backdrop-blur-xl ${cardBG} rounded-3xl p-6 shadow-2xl w-full mb-8`}>
            <h2 className="text-2xl font-semibold text-[#FFA500] text-center mb-4">
              🌍 Global Leaderboard
            </h2>
            <div className="space-y-3">
              {[{ name: 'JohnDoe', score: 1000, class: 'text-yellow-700' },
              { name: 'JaneSmith', score: 950, class: 'text-yellow-500' },
              { name: 'AlexBrown', score: 910, class: 'text-orange-400' },
              { name: 'MikeDavis', score: 880 },
              { name: 'LisaGreen', score: 850 }]
                .map((entry, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg font-medium`}
                  >
                    <span className={`${entry.class || textColor}`}>
                      {`${i + 1}. ${entry.name}`}
                    </span>
                    <span>{entry.score} pts</span>
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={handleCreateChallenge}
            className="bg-[#FFA500] text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
          >
            Create Challenge
          </button>
        </div>

        {/* Right Side Challenge List */}
        <div className="w-2/3">
          <div className={`backdrop-blur-xl ${cardBG} rounded-3xl p-8 shadow-2xl w-full`}>
            {loading ? (
              <p className="text-center text-lg font-semibold">Loading challenges...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error loading challenges.</p>
            ) : challenges.length === 0 ? (
              <p className="text-center text-lg">No challenges available right now. Come back later!</p>
            ) : (
              challenges.map((challenge) => (
                <div
                  key={challenge._id}
                  className={`${cardBG} backdrop-blur-md rounded-2xl p-6 mb-6 shadow-md transition-all ${hoverBG}`}
                >
                  <h2 className={`text-2xl font-semibold ${textColor} mb-2`}>{challenge.title}</h2>
                  <p className="text-sm text-white/80 mb-4">{challenge.description}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleViewChallenge(challenge._id)}
                      className="bg-[#FFA500] text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
                    >
                      Enter Challenge
                    </button>
                    <button
                      onClick={() => handleLeaderboard(challenge._id)}
                      className="bg-[#FDD835] text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
                    >
                      See Leaderboard
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
