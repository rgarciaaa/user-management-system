import React, { useState } from 'react'; 

export default function LoginForm({ onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onLogin({ login, password });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Sistema de Gestión de Usuarios
        </h1>
        <p className="text-gray-600 text-sm">
          Por favor, inicia sesión para acceder a la plataforma.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-gray-200 p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Iniciar Sesión
        </h2>

        <div className="mb-5">
          <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1">
            Usuario
          </label>
          <input
            id="login"
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tu usuario"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tu contraseña"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}