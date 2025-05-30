import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UserFormPage from './pages/users/UserFormPage';
import UserListPage from './pages/users/UserListPage';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al parsear el usuario de sessionStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLogin} />} />

        <Route
          path="/home"
          element={user ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        <Route
          path="/users/new"
          element={user ? <UserFormPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/users/:login/edit"
          element={user ? <UserFormPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard"
          element={user ? <UserListPage /> : <Navigate to="/login" />}
        />

        <Route path="*" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;