CREATE DATABASE IF NOT EXISTS guia_generativa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE guia_generativa_db;

CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasenna VARCHAR(255) NOT NULL,
    rol ENUM('Estudiante', 'Admin') NOT NULL DEFAULT 'Estudiante',
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Modulos (
    id_modulo INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    orden INT NOT NULL UNIQUE
);

CREATE TABLE Lecciones (
    id_leccion INT AUTO_INCREMENT PRIMARY KEY,
    id_modulo INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    tipo_contenido ENUM('Texto', 'Video', 'Simulador') NOT NULL,
    FOREIGN KEY (id_modulo) REFERENCES Modulos(id_modulo) ON DELETE CASCADE
);

CREATE TABLE Evaluaciones (
    id_evaluacion INT AUTO_INCREMENT PRIMARY KEY,
    id_modulo INT NOT NULL UNIQUE,
    calificacion_minima DECIMAL(4,2) NOT NULL DEFAULT 8.00,
    preguntas_json JSON NOT NULL,
    FOREIGN KEY (id_modulo) REFERENCES Modulos(id_modulo) ON DELETE CASCADE
);

CREATE TABLE Simuladores_IA (
    id_simulador INT AUTO_INCREMENT PRIMARY KEY,
    id_leccion INT NOT NULL UNIQUE,
    limite_interacciones INT NOT NULL DEFAULT 5,
    FOREIGN KEY (id_leccion) REFERENCES Lecciones(id_leccion) ON DELETE CASCADE
);

CREATE TABLE Progreso_Lecciones (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_leccion INT NOT NULL,
    completada BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_completado DATETIME NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_leccion) REFERENCES Lecciones(id_leccion) ON DELETE CASCADE,
    UNIQUE KEY uk_usuario_leccion (id_usuario, id_leccion)
);

CREATE TABLE Resultados_Evaluaciones (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_evaluacion INT NOT NULL,
    puntaje_obtenido DECIMAL(4,2) NOT NULL,
    certificado_url VARCHAR(255) NULL,
    fecha_realizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_evaluacion) REFERENCES Evaluaciones(id_evaluacion) ON DELETE CASCADE
);

CREATE TABLE Historial_Prompts (
    id_prompt INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_simulador INT NOT NULL,
    texto_prompt TEXT NOT NULL,
    bloqueado_por_normativa BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_simulador) REFERENCES Simuladores_IA(id_simulador) ON DELETE CASCADE
);
