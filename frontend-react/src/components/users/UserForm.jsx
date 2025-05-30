import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        LOGIN: '',
        PASSWORD: '',
        NOMBRE: '',
        CLIENTE: '',
        EMAIL: '',
        FECHAALTA: '',
        FECHABAJA: '',
        STATUS: 'A',
        INTENTOS: 0,
        FECHAREVOCADO: '',
        FECHA_VIGENCIA: '',
        NO_ACCESO: '',
        APELLIDO_PATERNO: '',
        APELLIDO_MATERNO: '',
        AREA: '',
        FECHAMODIFICACION: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                LOGIN: user.login || '',
                PASSWORD: '', // No pre-rellenar la contraseña por seguridad en edición
                NOMBRE: user.nombre || '',
                CLIENTE: user.cliente || '',
                EMAIL: user.email || '',
                FECHAALTA: user.fechaAlta ? user.fechaAlta : '',
                FECHABAJA: user.fechaBaja ? user.fechaBaja : '',
                STATUS: user.estatus || 'A', // 'estatus' en minúsculas en el user prop
                INTENTOS: user.intentos || 0,
                FECHAREVOCADO: user.fechaRevocado ? user.fechaRevocado : '',
                FECHA_VIGENCIA: user.fechaVigencia ? user.fechaVigencia : '',
                NO_ACCESO: user.noAcceso || '',
                APELLIDO_PATERNO: user.apellidoPaterno || '',
                APELLIDO_MATERNO: user.apellidoMaterno || '',
                AREA: user.area || '',
                FECHAMODIFICACION: user.fechaModificacion ? user.fechaModificacion : '',
            });
        } else {
            // Si es un nuevo usuario, inicializa FECHAALTA y FECHAMODIFICACION con la fecha actual
            const today = new Date().toISOString().split('T')[0];
            setFormData(prev => ({
                ...prev,
                FECHAALTA: today,
                FECHAMODIFICACION: today,
                INTENTOS: 0, // Asegura que intentos sea 0 para nuevos usuarios
                STATUS: 'A' // Asegura que el status sea 'A' para nuevos usuarios
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' || name === 'CLIENTE' || name === 'INTENTOS' || name === 'NO_ACCESO' || name === 'AREA'
                    ? (value === '' ? '' : parseFloat(value))
                    : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const dataToSend = {
            login: formData.LOGIN,
            password: formData.PASSWORD,
            nombre: formData.NOMBRE,
            cliente: parseFloat(formData.CLIENTE) || 0,
            email: formData.EMAIL,
            fechaAlta: formData.FECHAALTA,
            fechaBaja: formData.FECHABAJA || null,
            estatus: formData.STATUS,
            intentos: parseInt(formData.INTENTOS) || 0,
            fechaRevocado: formData.FECHAREVOCADO || null,
            fechaVigencia: formData.FECHA_VIGENCIA || null,
            noAcceso: parseInt(formData.NO_ACCESO) || 0,
            apellidoPaterno: formData.APELLIDO_PATERNO,
            apellidoMaterno: formData.APELLIDO_MATERNO,
            area: parseInt(formData.AREA) || 0,
            fechaModificacion: formData.FECHAMODIFICACION,
        };

        // Validación básica
        if (!dataToSend.login || !dataToSend.nombre || dataToSend.cliente === '' || !dataToSend.estatus) {
            alert('Por favor, completa los campos obligatorios: Login, Nombre, Cliente, Status.');
            return;
        }
        // La contraseña solo es obligatoria para nuevos usuarios
        if (!user && (!dataToSend.password || dataToSend.password.trim() === '')) {
             alert('La contraseña es obligatoria para nuevos usuarios.');
             return;
        }

        onSubmit(dataToSend);
    };

    return (
        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-xl mb-8 transition-colors duration-300">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
                {user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LOGIN */}
                <div className="flex flex-col">
                    <label htmlFor="LOGIN" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LOGIN <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="LOGIN"
                        name="LOGIN"
                        value={formData.LOGIN}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        maxLength={20}
                        required
                        disabled={!!user}
                    />
                    {user && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">El LOGIN no puede ser modificado.</p>}
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col">
                    <label htmlFor="PASSWORD" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PASSWORD {user ? '' : <span className="text-red-500">*</span>}</label>
                    <input
                        type="password"
                        id="PASSWORD"
                        name="PASSWORD"
                        value={formData.PASSWORD}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        maxLength={30}
                        required={!user} // Requerido solo para creación
                    />
                     {user && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Dejar en blanco para no cambiar la contraseña.</p>}
                </div>

                {/* NOMBRE */}
                <div className="flex flex-col">
                    <label htmlFor="NOMBRE" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NOMBRE <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="NOMBRE"
                        name="NOMBRE"
                        value={formData.NOMBRE}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        maxLength={50}
                        required
                    />
                </div>

                {/* CLIENTE */}
                <div className="flex flex-col">
                    <label htmlFor="CLIENTE" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CLIENTE <span className="text-red-500">*</span></label>
                    <input
                        type="number"
                        id="CLIENTE"
                        name="CLIENTE"
                        value={formData.CLIENTE}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        step="0.01"
                        required
                    />
                </div>

                {/* EMAIL */}
                <div className="flex flex-col">
                    <label htmlFor="EMAIL" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">EMAIL</label>
                    <input
                        type="email"
                        id="EMAIL"
                        name="EMAIL"
                        value={formData.EMAIL}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        maxLength={50}
                    />
                </div>

                {/* FECHAALTA */}
                <div className="flex flex-col">
                    <label htmlFor="FECHAALTA" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">FECHA ALTA <span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        id="FECHAALTA"
                        name="FECHAALTA"
                        value={formData.FECHAALTA}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed"
                        disabled // Se maneja automáticamente
                        required
                    />
                </div>

                {/* STATUS */}
                <div className="flex flex-col">
                    <label htmlFor="STATUS" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">STATUS <span className="text-red-500">*</span></label>
                    <select
                        id="STATUS"
                        name="STATUS"
                        value={formData.STATUS}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        required
                    >
                        <option value="A">Activo</option>
                        <option value="B">Inactivo</option>
                        <option value="R">Revocado</option>
                    </select>
                </div>

                {/* INTENTOS */}
                <div className="flex flex-col">
                    <label htmlFor="INTENTOS" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">INTENTOS <span className="text-red-500">*</span></label>
                    <input
                        type="number"
                        id="INTENTOS"
                        name="INTENTOS"
                        value={formData.INTENTOS}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed"
                        disabled // Se maneja automáticamente
                        required
                    />
                </div>

                {/* FECHABAJA */}
                <div className="flex flex-col">
                    <label htmlFor="FECHABAJA" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">FECHA BAJA</label>
                    <input
                        type="date"
                        id="FECHABAJA"
                        name="FECHABAJA"
                        value={formData.FECHABAJA}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* FECHAREVOCADO */}
                <div className="flex flex-col">
                    <label htmlFor="FECHAREVOCADO" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">FECHA REVOCADO</label>
                    <input
                        type="date"
                        id="FECHAREVOCADO"
                        name="FECHAREVOCADO"
                        value={formData.FECHAREVOCADO}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* FECHA_VIGENCIA */}
                <div className="flex flex-col">
                    <label htmlFor="FECHA_VIGENCIA" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">FECHA VIGENCIA</label>
                    <input
                        type="date"
                        id="FECHA_VIGENCIA"
                        name="FECHA_VIGENCIA"
                        value={formData.FECHA_VIGENCIA}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* NO_ACCESO */}
                <div className="flex flex-col">
                    <label htmlFor="NO_ACCESO" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NO. ACCESO</label>
                    <input
                        type="number"
                        id="NO_ACCESO"
                        name="NO_ACCESO"
                        value={formData.NO_ACCESO}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        step="1"
                    />
                </div>

                {/* APELLIDO_PATERNO */}
                <div className="flex flex-col">
                    <label htmlFor="APELLIDO_PATERNO" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">APELLIDO PATERNO</label>
                    <input
                        type="text"
                        id="APELLIDO_PATERNO"
                        name="APELLIDO_PATERNO"
                        value={formData.APELLIDO_PATERNO}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        maxLength={50}
                    />
                </div>

                {/* APELLIDO_MATERNO */}
                <div className="flex flex-col">
                    <label htmlFor="APELLIDO_MATERNO" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">APELLIDO MATERNO</label>
                    <input
                        type="text"
                        id="APELLIDO_MATERNO"
                        name="APELLIDO_MATERNO"
                        value={formData.APELLIDO_MATERNO}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        maxLength={50}
                    />
                </div>

                {/* AREA */}
                <div className="flex flex-col">
                    <label htmlFor="AREA" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">AREA</label>
                    <input
                        type="number"
                        id="AREA"
                        name="AREA"
                        value={formData.AREA}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        step="1"
                    />
                </div>
                
                {/* FECHAMODIFICACION */}
                <div className="flex flex-col">
                    <label htmlFor="FECHAMODIFICACION" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">FECHA MODIFICACION <span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        id="FECHAMODIFICACION"
                        name="FECHAMODIFICACION"
                        value={formData.FECHAMODIFICACION}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed"
                        disabled // Se maneja automáticamente
                        required
                    />
                </div>

                {/* Botones de acción */}
                <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-md transition-colors duration-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        {user ? 'Guardar Cambios' : 'Crear Usuario'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;