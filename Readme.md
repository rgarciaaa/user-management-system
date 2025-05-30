#  Sistema de Gestión de Usuarios 

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)

---

Este proyecto es un **sistema de gestión de usuarios** desarrollado con **React** en el frontend y **Spring Boot** en el backend. Ofrece una interfaz intuitiva para administrar usuarios, incluyendo listado, filtros y la capacidad de modificar su estatus.

---

## 🌟 Características Clave

* **Autenticación de Usuarios:** Acceso seguro a la plataforma.
* **Gestión de Usuarios:**
    * Listado de usuarios por estatus (`ACTIVOS`, `INACTIVOS`, `REVOCADOS`).
    * Búsqueda por nombre y rangos de fecha.
    * **Creación de nuevos usuarios.**
    * **Desactivación de usuarios.**
* **Diseño Moderno:** Interfaz de usuario limpia con **Tailwind CSS**.

---

## 🛠️ Tecnologías Principales

* **Frontend:** React, Vite, React Router DOM, Tailwind CSS.
* **Backend:** Spring Boot, Spring Security, Spring Data JPA, H2 Database (en memoria para desarrollo).

---

## 🚀 Guía de Ejecución Rápida

Para poner en marcha la aplicación, sigue estos pasos:

### 1. Requisitos

Asegúrate de tener instalado: **JDK 17+**, **Node.js (LTS)** con **npm/Yarn**, y **Maven**.

### 2. Clonar el Repositorio

```bash
git https://github.com/rgarciaaa/user-management-system.git
cd user-management-app
```

### 3. Iniciar el Backend (Spring Boot)

Navega al directorio backend-spring y ejecuta:

```bash
cd backend-spring
mvn spring-boot:run
```

El backend se iniciará en http://localhost:8080.
Se cargará una base de datos H2 en memoria con usuarios de prueba.


### 4. Iniciar el Frontend (React)

En una nueva terminal, navega al directorio frontend-react y ejecuta:

```bash
cd frontend-react
npm install
npm run dev
```

El frontend se abrirá en tu navegador en http://localhost:5173.

### 🌐 Uso de la Aplicación

```text
1. Abre http://localhost:5173 en tu navegador.
2. Inicia sesión con credenciales de prueba, por ejemplo:
   Usuario: admin
   Contraseña: admin
3. Explora el panel de gestión de usuarios.
```