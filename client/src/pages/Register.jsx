import React, { useState } from 'react';
import { registerUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          name="username"
          type="text"
          placeholder="username"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none"
        />
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
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Register
        </button>
        <p className="mt-3 text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-500 underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
