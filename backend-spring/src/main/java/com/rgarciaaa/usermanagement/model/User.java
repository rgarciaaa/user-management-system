package com.rgarciaaa.usermanagement.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "usuario")
public class User {

    @Id
    @Column(name = "login", length = 20, nullable = false)
    private String login;

    @Column(name = "password", length = 30, nullable = false)
    private String password;

    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @Column(name = "cliente", nullable = false)
    private Float cliente;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "fechaalta", nullable = false)
    private LocalDate fechaAlta;

    @Column(name = "fechabaja")
    private LocalDate fechaBaja;

    @Column(name = "estatus", nullable = false, length = 1)
    private String estatus;

    @Column(name = "intentos", nullable = false)
    private Float intentos;

    @Column(name = "fecharevocado")
    private LocalDate fechaRevocado;

    @Column(name = "fecha_vigencia")
    private LocalDate fechaVigencia;

    @Column(name = "no_acceso")
    private Integer noAcceso;

    @Column(name = "apellido_paterno", length = 50)
    private String apellidoPaterno;

    @Column(name = "apellido_materno", length = 50)
    private String apellidoMaterno;

    @Column(name = "area", length = 4)
    private Integer area;

    @Column(name = "fechamodificacion", nullable = false)
    private LocalDate fechaModificacion;

}
