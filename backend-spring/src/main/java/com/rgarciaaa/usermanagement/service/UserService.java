package com.rgarciaaa.usermanagement.service;

import com.rgarciaaa.usermanagement.model.User;
import com.rgarciaaa.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Método para validar las credenciales de un usuario al iniciar sesión
    public Optional<User> validarLogin(String login, String password) throws Exception {
        Optional<User> userOpt = userRepository.findById(login); // Buscar por login (que es la PK)
        if (userOpt.isEmpty()) {
            return Optional.empty(); // Usuario no encontrado
        }

        User user = userOpt.get();

        // Validar fecha vigencia
        if (user.getFechaVigencia() != null && user.getFechaVigencia().isBefore(LocalDate.now())) {
            System.out.println("Intento de login para usuario con vigencia expirada: " + login);
            return Optional.empty();
        }

        // Validar contraseña (SHA + Base64)
        String hashedPassword = shaBase64(password);
        if (!user.getPassword().equals(hashedPassword)) {
            System.out.println("Intento de login fallido para usuario: " + login + " - Contraseña incorrecta.");
            return Optional.empty(); // Contraseña incorrecta
        }

        return Optional.of(user);
    }

    private String shaBase64(String input) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-1");
        byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(digest);
    }

    // Método para crear un nuevo usuario
    @Transactional // Asegura que toda la operación se ejecute como una única transacción de DB
    public User createUser(User user) throws Exception {
        if (user.getLogin() == null || user.getLogin().trim().isEmpty()) {
            throw new IllegalArgumentException("El login de usuario no puede estar vacío.");
        }

        // Verificar si el login ya existe
        if (userRepository.existsById(user.getLogin())) { // Usamos existsById porque 'login' es la PK
            throw new IllegalArgumentException("El usuario con login '" + user.getLogin() + "' ya existe. Por favor, elige otro.");
        }

        // Validar y hashear la contraseña
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            String encryptedPassword = shaBase64(user.getPassword());
            user.setPassword(encryptedPassword);
        } else {
            throw new IllegalArgumentException("La contraseña es obligatoria para nuevos usuarios.");
        }

        // Asignar valores por defecto para campos de creación
        user.setFechaAlta(LocalDate.now()); // Fecha de alta al momento de la creación
        user.setFechaModificacion(LocalDate.now()); // Fecha de modificación inicial
        user.setIntentos((float) 0); // Intentos de login a 0
        user.setNoAcceso(0); // No. de accesos a 0
        if (user.getEstatus() == null || user.getEstatus().trim().isEmpty()) {
            user.setEstatus("A"); // Estatus por defecto para nuevos usuarios
        }

        // Guardar el nuevo usuario en la base de datos
        return userRepository.save(user);
    }

    // Método para obtener todos los usuarios con filtros
    @Transactional(readOnly = true)
    public List<User> findAllUsers(String nombre, LocalDate fechaAltaInicial, LocalDate fechaAltaFinal, String estatus) {

        List<User> allUsers = userRepository.findAll(); // Obtiene todos los usuarios

        return allUsers.stream()
                .filter(user -> nombre == null || user.getNombre().toLowerCase().contains(nombre.toLowerCase())) // Filtra por nombre (insensible a mayúsculas/minúsculas)
                .filter(user -> estatus == null || user.getEstatus().equalsIgnoreCase(estatus)) // Filtra por estatus (insensible a mayúsculas/minúsculas)
                .filter(user -> fechaAltaInicial == null || (user.getFechaAlta() != null && !user.getFechaAlta().isBefore(fechaAltaInicial))) // Filtra por fecha de alta inicial
                .filter(user -> fechaAltaFinal == null || (user.getFechaAlta() != null && !user.getFechaAlta().isAfter(fechaAltaFinal))) // Filtra por fecha de alta final
                .collect(Collectors.toList());
    }

    // Método para encontrar un usuario por su login (clave primaria)
    @Transactional(readOnly = true)
    public Optional<User> findByLogin(String login) {
        if (login == null || login.trim().isEmpty()) {
            throw new IllegalArgumentException("El login no puede ser nulo o vacío para buscar un usuario.");
        }
        return userRepository.findById(login); // Buscar por la PK 'login'
    }

    // Método para actualizar un usuario existente
    @Transactional
    public User updateUser(User user) throws Exception {
        if (user.getLogin() == null || user.getLogin().trim().isEmpty()) {
            throw new IllegalArgumentException("El login del usuario a actualizar no puede estar vacío.");
        }

        User existingUser = userRepository.findById(user.getLogin())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con login: " + user.getLogin()));

        // Actualizar solo los campos que se permiten modificar desde el frontend
        existingUser.setNombre(user.getNombre());
        existingUser.setApellidoPaterno(user.getApellidoPaterno());
        existingUser.setApellidoMaterno(user.getApellidoMaterno());
        existingUser.setCliente(user.getCliente());
        existingUser.setEmail(user.getEmail());
        existingUser.setArea(user.getArea());
        existingUser.setEstatus(user.getEstatus());
        existingUser.setFechaVigencia(user.getFechaVigencia());
        existingUser.setIntentos(user.getIntentos());
        existingUser.setNoAcceso(user.getNoAcceso());

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            String newHashedPassword = shaBase64(user.getPassword());
            existingUser.setPassword(newHashedPassword);
        }

        existingUser.setFechaModificacion(LocalDate.now());

        return userRepository.save(existingUser);
    }

    // Método para dar de baja (desactivar) un usuario
    @Transactional
    public void deactivateUser(String login) {
        User user = userRepository.findById(login)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con login: " + login));

        if (!"B".equalsIgnoreCase(user.getEstatus())) {
            user.setEstatus("B");
            user.setFechaRevocado(LocalDate.now());
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("El usuario con login '" + login + "' ya está inactivo.");
        }
    }

    // Método para reactivar un usuario
    @Transactional
    public void reactivateUser(String login) {
        User user = userRepository.findById(login)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con login: " + login));

        if ("B".equalsIgnoreCase(user.getEstatus()) || "R".equalsIgnoreCase(user.getEstatus())) {
            user.setEstatus("A");
            user.setFechaRevocado(null);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("El usuario con login '" + login + "' ya está activo o no puede ser reactivado.");
        }
    }
}