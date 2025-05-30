package com.rgarciaaa.usermanagement.controller;

import com.rgarciaaa.usermanagement.model.User;
import com.rgarciaaa.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // POST /api/users
    @PostMapping
    public ResponseEntity<?> createUser(@Validated @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            createdUser.setPassword(null);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED); // 201 Created
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT); // 409 Conflict
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor al crear el usuario: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    // GET /api/users?nombre=Juan&fechaAltaInicial=2023-01-01&fechaAltaFinal=2023-12-31&estatus=A
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) LocalDate fechaAltaInicial,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) LocalDate fechaAltaFinal,
            @RequestParam(required = false) String estatus) {
        try {
            List<User> users = userService.findAllUsers(nombre, fechaAltaInicial, fechaAltaFinal, estatus);
            users.forEach(user -> user.setPassword(null));
            return new ResponseEntity<>(users, HttpStatus.OK); // 200 OK
        } catch (Exception e) {
            System.err.println("Error al obtener usuarios: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    // GET /api/users/{login}
    @GetMapping("/{login}")
    public ResponseEntity<User> getUserByLogin(@PathVariable String login) {
        try {
            Optional<User> user = userService.findByLogin(login);
            if (user.isPresent()) {
                user.get().setPassword(null);
                return new ResponseEntity<>(user.get(), HttpStatus.OK); // 200 OK
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
            }
        } catch (Exception e) {
            System.err.println("Error al obtener usuario por login: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    // PUT /api/users/{login}
    @PutMapping("/{login}")
    public ResponseEntity<?> updateUser(@PathVariable String login, @Validated @RequestBody User user) {
        try {
            if (!login.equals(user.getLogin())) {
                return new ResponseEntity<>("El login del path no coincide con el login del cuerpo del usuario.", HttpStatus.BAD_REQUEST); // 400 Bad Request
            }
            User updatedUser = userService.updateUser(user);
            updatedUser.setPassword(null);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK); // 200 OK
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST); // 400 Bad Request
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor al actualizar el usuario: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    // PATCH /api/users/{login}/deactivate
    @PatchMapping("/{login}/deactivate")
    public ResponseEntity<?> deactivateUser(@PathVariable String login) {
        try {
            userService.deactivateUser(login); // <--- Usar login
            return new ResponseEntity<>("Usuario con login '" + login + "' dado de baja exitosamente.", HttpStatus.NO_CONTENT); // 204 No Content
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND); // 404 Not Found
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor al dar de baja el usuario: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    // PATCH /api/users/{login}/reactivate
    @PatchMapping("/{login}/reactivate")
    public ResponseEntity<?> reactivateUser(@PathVariable String login) {
        try {
            userService.reactivateUser(login); // <--- Usar login
            return new ResponseEntity<>("Usuario con login '" + login + "' reactivado exitosamente.", HttpStatus.NO_CONTENT); // 204 No Content
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor al reactivar el usuario: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}