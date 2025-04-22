import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Challenge from './pages/Challenge';
import Leaderboard from './pages/Leaderboard';

import { getToken } from './services/auth';

const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/leaderboard/:id" element={
          <PrivateRoute>
            <Leaderboard />
          </PrivateRoute>
        } />

        <Route path="/challenges/:id" element={
          <PrivateRoute>
            <Challenge />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
