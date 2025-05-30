import React from 'react';

const UserListTable = ({ users, onEdit, onDeactivate }) => {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-4">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NOMBRE</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOGIN</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA ALTA</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ESTATUS</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACCION</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 italic">No hay usuarios para mostrar.</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.login} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.login}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(user.fechaAlta).toLocaleDateString('es-MX')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.estatus}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(user.login)}
                                        className="text-blue-600 hover:text-blue-800 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDeactivate(user.login)}
                                        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
                                    >
                                        Baja
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserListTable;