// hooks/useChallenges.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`${API_BASE}/challenges`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChallenges(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching challenges');
        setLoading(false);
      }
    };
    
    fetchChallenges();
  });

  return { challenges, loading, error };
};
