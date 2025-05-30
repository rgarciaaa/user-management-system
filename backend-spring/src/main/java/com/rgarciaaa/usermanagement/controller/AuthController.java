package com.rgarciaaa.usermanagement.controller;

import com.rgarciaaa.usermanagement.model.User;
import com.rgarciaaa.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            String login = loginData.get("login");
            String password = loginData.get("password");
            Optional<User> userOpt = userService.validarLogin(login, password);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).body("Usuario o contraseña incorrectos, o usuario expirado");
            }
            User user = userOpt.get();
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error en el servidor: " + e.getMessage());
        }
    }
}
