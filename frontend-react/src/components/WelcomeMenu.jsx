import { useNavigate } from 'react-router-dom';

export default function WelcomeMenu({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="text-gray-800 text-center space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Bienvenido, {user?.nombre || 'Usuario'}!</h1>
        <p className="text-gray-600 mt-2">Selecciona una opción para continuar</p>
      </div>

      <div className="flex justify-center gap-8 flex-wrap">
        <button
          onClick={() => navigate('/users/new')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-md"
        >
          Registro de Usuario
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-md"
        >
          Gestión de Usuarios
        </button>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 underline mt-8"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}