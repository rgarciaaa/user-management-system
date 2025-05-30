package com.rgarciaaa.usermanagement.service;

import com.rgarciaaa.usermanagement.model.User;
import com.rgarciaaa.usermanagement.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User testUserActive;
    private User testUserInactive;

    @BeforeEach
    void setUp() {
        // Inicializa objetos User para usar en los tests
        testUserActive = new User();
        testUserActive.setLogin("testuser1");
        testUserActive.setPassword("hashedpass1");
        testUserActive.setNombre("Test User Active");
        testUserActive.setCliente(100.0f);
        testUserActive.setEmail("test1@example.com");
        testUserActive.setFechaAlta(LocalDate.of(2023, 1, 15));
        testUserActive.setEstatus("A"); // Activo
        testUserActive.setIntentos(0.0f);
        testUserActive.setFechaModificacion(LocalDate.now());
        testUserActive.setFechaVigencia(LocalDate.of(2024, 1, 15));
        testUserActive.setFechaBaja(null);
        testUserActive.setFechaRevocado(null);
        testUserActive.setNoAcceso(0);
        testUserActive.setApellidoPaterno("Paterno");
        testUserActive.setApellidoMaterno("Materno");
        testUserActive.setArea(1001);

        testUserInactive = new User();
        testUserInactive.setLogin("testuser2");
        testUserInactive.setPassword("hashedpass2");
        testUserInactive.setNombre("Test User Inactive");
        testUserInactive.setCliente(101.0f);
        testUserInactive.setEmail("test2@example.com");
        testUserInactive.setFechaAlta(LocalDate.of(2022, 5, 20));
        testUserInactive.setEstatus("I"); // Inactivo
        testUserInactive.setIntentos(0.0f);
        testUserInactive.setFechaModificacion(LocalDate.now());
        testUserInactive.setFechaVigencia(LocalDate.of(2023, 5, 20));
        testUserInactive.setFechaBaja(LocalDate.of(2023, 5, 20)); // Ejemplo: fecha de baja
        testUserInactive.setFechaRevocado(LocalDate.now());
        testUserInactive.setNoAcceso(1);
        testUserInactive.setApellidoPaterno("Apellido");
        testUserInactive.setApellidoMaterno("Inactivo");
        testUserInactive.setArea(1002);
    }

    @Test
    void testFindUserByLogin_UserFound() {
        when(userRepository.findById("testuser1")).thenReturn(Optional.of(testUserActive));

        Optional<User> foundUser = userService.findByLogin("testuser1");

        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getLogin()).isEqualTo("testuser1");
        verify(userRepository, times(1)).findById("testuser1");
    }

    @Test
    void testFindUserByLogin_UserNotFound() {
        when(userRepository.findById("nonexistent")).thenReturn(Optional.empty());

        Optional<User> foundUser = userService.findByLogin("nonexistent");

        assertThat(foundUser).isNotPresent();
        verify(userRepository, times(1)).findById("nonexistent");
    }

    @Test
    void testCreateUser() throws Exception {
        when(userRepository.save(any(User.class))).thenReturn(testUserActive);

        User createdUser = userService.createUser(testUserActive);

        assertThat(createdUser).isNotNull();
        assertThat(createdUser.getLogin()).isEqualTo("testuser1");
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testUpdateUser_UserFound() throws Exception {
        when(userRepository.findById("testuser1")).thenReturn(Optional.of(testUserActive));
        when(userRepository.save(any(User.class))).thenReturn(testUserActive);

        User updatedDetails = new User();
        updatedDetails.setLogin("testuser1");
        updatedDetails.setNombre("Updated Name");
        updatedDetails.setEmail("updated@example.com");
        updatedDetails.setEstatus("I");
        updatedDetails.setApellidoPaterno("NuevoPaterno");
        updatedDetails.setArea(2000);

        User resultUser = userService.updateUser(updatedDetails);

        assertThat(resultUser).isNotNull();
        assertThat(resultUser.getNombre()).isEqualTo("Updated Name");
        assertThat(resultUser.getEmail()).isEqualTo("updated@example.com");
        assertThat(resultUser.getEstatus()).isEqualTo("I");
        assertThat(resultUser.getFechaModificacion()).isNotNull();
        assertThat(resultUser.getApellidoPaterno()).isEqualTo("NuevoPaterno");
        assertThat(resultUser.getArea()).isEqualTo(2000);

        verify(userRepository, times(1)).findById("testuser1");
        verify(userRepository, times(1)).save(testUserActive);
    }

    @Test
    void testUpdateUser_UserNotFound() {
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.updateUser(new User());
        });

        assertThat(exception.getMessage()).isEqualTo("El login del usuario a actualizar no puede estar vacío.");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testDeactivateUser_UserFound() {
        when(userRepository.findById("testuser1")).thenReturn(Optional.of(testUserActive));
        when(userRepository.save(any(User.class))).thenReturn(testUserActive);

        userService.deactivateUser("testuser1");

        assertThat(testUserActive).isNotNull();
        assertThat(testUserActive.getLogin()).isEqualTo("testuser1");
        assertThat(testUserActive.getEstatus()).isEqualTo("B");
        assertThat(testUserActive.getFechaRevocado()).isEqualTo(LocalDate.now());

        verify(userRepository, times(1)).findById("testuser1");
        verify(userRepository, times(1)).save(testUserActive);
    }

    @Test
    void testDeactivateUser_UserNotFound() {
        when(userRepository.findById("nonexistent")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.deactivateUser("nonexistent");
        });

        assertThat(exception.getMessage()).isEqualTo("Usuario no encontrado con login: nonexistent");
        verify(userRepository, times(1)).findById("nonexistent");
        verify(userRepository, never()).save(any(User.class));
    }
}