import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UserFormPage from './pages/users/UserFormPage';
import UserListPage from './pages/users/UserListPage';

function App() {
  const user = sessionStorage.getItem('user');
  console.log('Usuario actual:', user);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/users/new"
          element={user ? <UserFormPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/users/:login/edit" // Usa :login como parámetro para la edición
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