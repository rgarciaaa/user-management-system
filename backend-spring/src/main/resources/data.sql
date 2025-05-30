INSERT INTO USUARIO (
    LOGIN, PASSWORD, NOMBRE, CLIENTE, EMAIL, FECHAALTA,
    ESTATUS, INTENTOS, FECHAMODIFICACION, FECHA_VIGENCIA, FECHAREVOCADO
)
VALUES (
    'admin',
    '0DPiKuNIrrVmD8IUCuw1hQxNqZc=', -- Password: admin
    'Administrador',
    1.0,
    'admin@example.com',
    CURRENT_DATE,
    'A', -- Activo
    0,
    CURRENT_DATE,
    DATEADD('DAY', 365, CURRENT_DATE),
    NULL
);

INSERT INTO USUARIO (
    LOGIN, PASSWORD, NOMBRE, CLIENTE, EMAIL, FECHAALTA,
    ESTATUS, INTENTOS, FECHAMODIFICACION, FECHA_VIGENCIA, FECHAREVOCADO
)
VALUES (
    'juanp',
    'g3193eRj2s8d0V4x8K2z9Y7w6p=', -- Password: password
    'Juan',
    101.0,
    'juan.perez@example.com',
    DATEADD('YEAR', -2, CURRENT_DATE), -- Fecha de alta hace 2 años
    'A', -- Activo
    0,
    CURRENT_DATE,
    DATEADD('YEAR', 3, CURRENT_DATE), -- Vigencia en 3 años
    NULL
);

INSERT INTO USUARIO (
    LOGIN, PASSWORD, NOMBRE, CLIENTE, EMAIL, FECHAALTA,
    ESTATUS, INTENTOS, FECHAMODIFICACION, FECHA_VIGENCIA, FECHAREVOCADO
)
VALUES (
    'mariag',
    'h4204fSk3t9e1W5y9L3a0Z8x7q=', -- Password: password
    'Maria',
    102.0,
    'maria.gomez@example.com',
    DATEADD('MONTH', -6, CURRENT_DATE), -- Fecha de alta hace 6 meses
    'B', -- Inactivo
    0,
    CURRENT_DATE,
    DATEADD('MONTH', 6, CURRENT_DATE),
    CURRENT_DATE -- Fecha de revocación hoy (inactivo por alguna razón)
);

INSERT INTO USUARIO (
    LOGIN, PASSWORD, NOMBRE, CLIENTE, EMAIL, FECHAALTA,
    ESTATUS, INTENTOS, FECHAMODIFICACION, FECHA_VIGENCIA, FECHAREVOCADO
)
VALUES (
    'pedrom',
    'i5315gTl4u0f2X6z0M4b1A9y8r=', -- Password: password
    'Pedro',
    101.0,
    'pedro.martinez@example.com',
    DATEADD('YEAR', -1, CURRENT_DATE), -- Fecha de alta hace 1 año
    'A', -- Activo
    0,
    CURRENT_DATE,
    DATEADD('MONTH', 3, CURRENT_DATE), -- Vigencia en 3 meses (cerca de caducar)
    NULL
);

INSERT INTO USUARIO (
    LOGIN, PASSWORD, NOMBRE, CLIENTE, EMAIL, FECHAALTA,
    ESTATUS, INTENTOS, FECHAMODIFICACION, FECHA_VIGENCIA, FECHAREVOCADO
)
VALUES (
    'anafg',
    'j6426hUm5v1g3Y7a1N5c2B0z9s=', -- Password: password
    'Ana',
    103.0,
    'ana.fernandez@example.com',
    DATEADD('DAY', -45, CURRENT_DATE), -- Fecha de alta hace 45 días
    'R', -- Revocado
    0,
    CURRENT_DATE,
    DATEADD('MONTH', -1, CURRENT_DATE), -- Fecha de vigencia pasada
    DATEADD('WEEK', -2, CURRENT_DATE) -- Revocado hace 2 semanas
);

INSERT INTO USUARIO (
    LOGIN, PASSWORD, NOMBRE, CLIENTE, EMAIL, FECHAALTA,
    ESTATUS, INTENTOS, FECHAMODIFICACION, FECHA_VIGENCIA, FECHAREVOCADO
)
VALUES (
    'luisr',
    'k7537iVn6w2h4Z8b2O6d3C1a0t=', -- Password: password
    'Luis',
    104.0,
    'luis.ramirez@example.com',
    DATEADD('MONTH', -3, CURRENT_DATE), -- Fecha de alta hace 3 meses
    'A', -- Activo
    0,
    CURRENT_DATE,
    DATEADD('YEAR', 1, CURRENT_DATE),
    NULL
);

INSERT INTO USUARIO (
    LOGIN, PASSWORD, NOMBRE, CLIENTE, EMAIL, FECHAALTA,
    ESTATUS, INTENTOS, FECHAMODIFICACION, FECHA_VIGENCIA, FECHAREVOCADO
)
VALUES (
    'sofiah',
    'l8648jWo7x3i5A9c3P7e4D2b1u=', -- Password: password
    'Sofia',
    102.0,
    'sofia.hernandez@example.com',
    DATEADD('DAY', -7, CURRENT_DATE), -- Fecha de alta hace 7 días (nuevo)
    'A', -- Activo
    0,
    CURRENT_DATE,
    DATEADD('YEAR', 5, CURRENT_DATE),
    NULL
);

INSERT INTO USUARIO (
    LOGIN, PASSWORD, NOMBRE, CLIENTE, EMAIL, FECHAALTA,
    ESTATUS, INTENTOS, FECHAMODIFICACION, FECHA_VIGENCIA, FECHAREVOCADO
)
VALUES (
    'carlosa',
    'm9759kXp8y4j6B0d4Q8f5E3c2v=', -- Password: password
    'Carlos',
    105.0,
    'carlos.aguilar@example.com',
    DATEADD('YEAR', -5, CURRENT_DATE), -- Fecha de alta hace 5 años
    'A', -- Activo
    0,
    CURRENT_DATE,
    DATEADD('DAY', -15, CURRENT_DATE), -- Fecha de vigencia expirada
    NULL
);

INSERT INTO USUARIO (
    LOGIN, PASSWORD, NOMBRE, CLIENTE, EMAIL, FECHAALTA,
    ESTATUS, INTENTOS, FECHAMODIFICACION, FECHA_VIGENCIA, FECHAREVOCADO
)
VALUES (
    'laurav',
    'n0860lYq9z5k7C1e5R9g6F4d3w=', -- Password: password
    'Laura',
    103.0,
    'laura.vargas@example.com',
    DATEADD('MONTH', -18, CURRENT_DATE), -- Fecha de alta hace 18 meses
    'B', -- Inactivo
    0,
    CURRENT_DATE,
    DATEADD('YEAR', 2, CURRENT_DATE),
    NULL
);

INSERT INTO USUARIO (
    LOGIN, PASSWORD, NOMBRE, CLIENTE, EMAIL, FECHAALTA,
    ESTATUS, INTENTOS, FECHAMODIFICACION, FECHA_VIGENCIA, FECHAREVOCADO
)
VALUES (
    'migueld',
    'o1971mZr0a6l8D2f6S0h7G5e4x=', -- Password: password
    'Miguel',
    104.0,
    'miguel.diaz@example.com',
    DATEADD('DAY', -30, CURRENT_DATE), -- Fecha de alta hace 30 días
    'R', -- Revocado
    0,
    CURRENT_DATE,
    DATEADD('DAY', -10, CURRENT_DATE), -- Vigencia expirada
    DATEADD('DAY', -5, CURRENT_DATE) -- Revocado hace 5 días
);