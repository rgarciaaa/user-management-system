import React, { useState, useEffect, useCallback } from 'react';
import UserListSearchForm from '../../components/users/UserListSearchForm.jsx';
import UserListTable from '../../components/users/UserListTable.jsx';
import { useNavigate } from 'react-router-dom';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        nombre: '',
        fechaAltaInicial: '',
        fechaAltaFinal: '',
        estatus: 'A',
    });

    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (filters.nombre) {
                queryParams.append('nombre', filters.nombre);
            }
            if (filters.fechaAltaInicial) {
                queryParams.append('fechaAltaInicial', filters.fechaAltaInicial);
            }
            if (filters.fechaAltaFinal) {
                queryParams.append('fechaAltaFinal', filters.fechaAltaFinal);
            }
            if (filters.estatus) {
                queryParams.append('estatus', filters.estatus);
            }

            const response = await fetch(`http://localhost:8080/api/users?${queryParams.toString()}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            alert('Error al cargar los usuarios: ' + err.message);
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearch = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    const handleStatusFilter = (status) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            estatus: status,
        }));
    };

    const handleCreateUser = () => {
        navigate('/users/new');
    };

    const handleEditUser = (userId) => {
        navigate(`/users/${userId}/edit`);
    };

    const handleDeactivateUser = async (userId) => {
        if (window.confirm(`¿Estás seguro de que quieres dar de baja al usuario con ID: ${userId}?`)) {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/users/${userId}/deactivate`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                await fetchUsers();
                alert('Usuario dado de baja exitosamente.');
            } catch (err) {
                alert('Error al dar de baja el usuario: ' + err.message);
                console.error('Error deactivating user:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-8">
                <div className="mb-6 flex justify-between items-center">
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver
                    </button>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center flex-grow">
                        Gestión de Usuarios
                    </h1>
                    <button
                        onClick={handleCreateUser}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md
                                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        Crear Nuevo Usuario
                    </button>
                </div>

                <UserListSearchForm
                    onSearch={handleSearch}
                    onStatusFilter={handleStatusFilter}
                    currentStatusFilter={filters.estatus}
                />

                {loading && (
                    <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="ml-4 text-gray-700 dark:text-gray-300 text-lg">Cargando usuarios...</p>
                    </div>
                )}

                {!loading && (
                    <UserListTable
                        users={users}
                        onEdit={handleEditUser}
                        onDeactivate={handleDeactivateUser}
                    />
                )}
            </div>
        </div>
    );
};

export default UserListPage;
