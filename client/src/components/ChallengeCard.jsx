import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChallengeCard = ({ challenge }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/challenge/${challenge._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition duration-200"
    >
      {/* <h3 className="text-xl font-semibold text-blue-700">{challenge.title}</h3> */}
      <h3 className="text-xl font-semibold text-blue-700 group-hover:underline">{challenge.title}</h3>
      <p className="text-gray-600 mt-2">{challenge.description}</p>
    </div>
  );
};

export default ChallengeCard;
