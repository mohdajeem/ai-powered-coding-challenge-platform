import React, { useState } from 'react';
import { loginUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
        <p className="mt-3 text-sm text-center">
          Don’t have an account? <a href="/register" className="text-blue-500 underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
