import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../../components/users/UserForm';

const UserFormPage = () => {
    const { login } = useParams();
    const navigate = useNavigate();

    const [userToEdit, setUserToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (login) {
                setLoading(true);
                setFetchError(null);
                setSubmitError(null);

                try {
                    const response = await fetch(`http://localhost:8080/api/users/${login}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || `Error ${response.status}: No se pudo cargar el usuario.`);
                    }

                    const userData = await response.json();

                    const formattedUserData = { ...userData };
                    if (formattedUserData.fechaAlta) formattedUserData.fechaAlta = formattedUserData.fechaAlta.split('T')[0];
                    if (formattedUserData.fechaVigencia) formattedUserData.fechaVigencia = formattedUserData.fechaVigencia.split('T')[0];
                    if (formattedUserData.fechaModificacion) formattedUserData.fechaModificacion = formattedUserData.fechaModificacion.split('T')[0];
                    if (formattedUserData.fechaRevocado) formattedUserData.fechaRevocado = formattedUserData.fechaRevocado.split('T')[0];
                    
                    setUserToEdit(formattedUserData);

                } catch (err) {
                    console.error('Error al cargar el usuario para edición:', err);
                    setFetchError(err.message || 'Error desconocido al cargar el usuario.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setUserToEdit(null);
            }
        };

        fetchUser();
    }, [login]);

    const handleFormSubmit = async (userData) => {
        console.log('Datos del formulario enviados:', userData);
        setLoading(true);
        setSubmitError(null);

        try {
            let response;
            let successMessage;
            let redirectLogin;

            const dataToSend = { ...userData };

            if (!login) {
                if (!dataToSend.password || dataToSend.password.trim() === '') {
                    throw new Error("La contraseña es obligatoria para nuevos usuarios.");
                }
            } else {
                if (dataToSend.password === '') {
                    delete dataToSend.password;
                }
            }

            if (login) {
                response = await fetch(`http://localhost:8080/api/users/${login}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
                successMessage = 'Usuario actualizado exitosamente.';
                redirectLogin = dataToSend.login;
            } else {
                response = await fetch('http://localhost:8080/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
                successMessage = 'Usuario creado exitosamente.';
                
                if (!response.ok) { 
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Error ${response.status}: Error al crear el usuario.`);
                }
                const createdUser = await response.json();
                redirectLogin = createdUser.login;
            }

            alert(successMessage);

            navigate(`/dashboard?login=${redirectLogin}`);

        } catch (err) {
            console.error('Error al guardar el usuario:', err);
            setSubmitError(err.message || 'Error desconocido al guardar el usuario.');
            alert(`Hubo un error al guardar el usuario: ${err.message}. Por favor, inténtalo de nuevo.`);
        } finally {
            setLoading(false);
        }
    };

    const handleFormCancel = () => {
        navigate(-1); 
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-gray-700 dark:text-gray-300 text-lg">Cargando formulario...</p>
            </div>
        );
    }

    if (fetchError && login) { 
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col justify-center items-center">
                <p className="text-red-600 dark:text-red-400 font-semibold text-center text-xl">{fetchError}</p>
                <button
                    onClick={() => navigate('/users')}
                    className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    Volver a la lista de usuarios
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-6 transition-colors duration-300">
            <div className="max-w-4xl mx-auto py-8">
                <div className="mb-6 flex justify-start">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver
                    </button>
                </div>

                {submitError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error al guardar: </strong>
                        <span className="block sm:inline">{submitError}</span>
                    </div>
                )}

                <UserForm
                    user={userToEdit}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                />
            </div>
        </div>
    );
};

export default UserFormPage;