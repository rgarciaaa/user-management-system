import React, { useState } from 'react';

const UserListSearchForm = ({ onSearch, onStatusFilter, currentStatusFilter }) => {
    const [nombre, setNombre] = useState('');
    const [fechaAltaInicial, setFechaAltaInicial] = useState('');
    const [fechaAltaFinal, setFechaAltaFinal] = useState('');

    const handleSearch = () => {
        onSearch({ nombre, fechaAltaInicial, fechaAltaFinal });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <div className="flex flex-wrap gap-4 mb-6 justify-start">
                <button
                    onClick={() => onStatusFilter('A')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200
                        ${currentStatusFilter === 'A' ? 'bg-green-600 text-white shadow-md' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                    ACTIVOS
                </button>
                <button
                    onClick={() => onStatusFilter('B')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200
                        ${currentStatusFilter === 'B' ? 'bg-gray-600 text-white shadow-md' : 'bg-gray-500 text-white hover:bg-gray-600'}`}
                >
                    INACTIVOS
                </button>
                <button
                    onClick={() => onStatusFilter('R')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200
                        ${currentStatusFilter === 'R' ? 'bg-orange-600 text-white shadow-md' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                >
                    REVOCADOS
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                <div className="flex flex-col">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">NOMBRE:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre de usuario"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white text-gray-900 placeholder-gray-400"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="fechaAltaInicial" className="block text-sm font-medium text-gray-700 mb-1">FECHA ALTA INICIAL:</label>
                    <input
                        type="date"
                        id="fechaAltaInicial"
                        value={fechaAltaInicial}
                        onChange={(e) => setFechaAltaInicial(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white text-gray-900"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="fechaAltaFinal" className="block text-sm font-medium text-gray-700 mb-1">FECHA ALTA FINAL:</label>
                    <input
                        type="date"
                        id="fechaAltaFinal"
                        value={fechaAltaFinal}
                        onChange={(e) => setFechaAltaFinal(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white text-gray-900"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="col-span-1 md:col-span-2 lg:col-span-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    Buscar
                </button>
            </div>
        </div>
    );
};

export default UserListSearchForm;