import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_BASE}/auth/login`, credentials);
  localStorage.setItem("authToken", res.data.token);
  return res.data;
};

export const registerUser = async (userInfo) => {
  const res = await axios.post(`${API_BASE}/auth/register`, userInfo);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

export const getToken = () => localStorage.getItem("authToken");
