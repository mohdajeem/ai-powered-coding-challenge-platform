
import React from 'react';
import { useChallenges } from '../hooks/useChallenges';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { challenges, loading, error } = useChallenges();
  const navigate = useNavigate();

  const handleViewChallenge = (id) => {
    navigate(`/challenges/${id}`);
  };

  const handleLeaderboard = (id) => {
    navigate(`/leaderboard/${id}`);
  };

  if (loading) return <div className="text-white text-center py-10">Loading challenges...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white font-outfit">
      <h1 className="text-5xl font-semibold text-center mb-12 drop-shadow-md">
        🚀 Challenge Dashboard
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {/* Challenges Section */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl w-full max-w-4xl">
          {challenges.length === 0 ? (
            <p className="text-center text-lg">No challenges available right now. Come back later!</p>
          ) : (
            challenges.map((challenge) => (
              <div
                key={challenge._id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 shadow-md transition-all hover:bg-white/20"
              >
                <h2 className="text-2xl font-semibold text-white mb-2">{challenge.title}</h2>
                <p className="text-sm text-white/80 mb-4">{challenge.description}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleViewChallenge(challenge._id)}
                    className="bg-gradient-to-r from-green-300 to-teal-300 text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
                  >
                    Enter Challenge
                  </button>
                  <button
                    onClick={() => handleLeaderboard(challenge._id)}
                    className="bg-gradient-to-r from-pink-400 to-yellow-300 text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
                  >
                    See Leaderboard
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Leaderboard Section (Optional demo content) */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 shadow-2xl w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-yellow-300 text-center mb-4">🌍 Global Leaderboard</h2>
          <div className="space-y-3">
            {[
              { name: 'JohnDoe', score: 1000, class: 'text-yellow-400' },
              { name: 'JaneSmith', score: 950, class: 'text-gray-300' },
              { name: 'AlexBrown', score: 910, class: 'text-orange-300' },
              { name: 'MikeDavis', score: 880 },
              { name: 'LisaGreen', score: 850 },
            ].map((entry, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg font-medium"
              >
                <span className={entry.class}>{`${i + 1}. ${entry.name}`}</span>
                <span>{entry.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
