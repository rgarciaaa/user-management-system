import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async ({ login, password }) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        alert('Credenciales inválidas');
        return;
      }

      const user = await response.json();

      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Error al iniciar sesión');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}
