# GuIA Generativa 🤖📚

Plataforma web educativa diseñada para fomentar el uso ético, legal y efectivo de la Inteligencia Artificial Generativa mediante aprendizaje modular secuencial, evaluaciones diagnósticas y un simulador interactivo conectado a la **Gemini API**.

**Autor:** Rosales Guzman Jose Emiliano

---

## 🎯 Objetivo del Proyecto
Desarrollar una plataforma web interactiva que capacite a estudiantes y usuarios generales en los fundamentos operativos de la IA generativa, la protección de datos personales sensibles (PII), el respeto a los derechos de autor y la ingeniería de *prompts* estructurados, certificando su aprendizaje mediante folios de validación.

---

## ✨ Características Principales
* **Autenticación y Persistencia de Progreso:** Inicio de sesión, registro dinámico de estudiantes y seguimiento automático del porcentaje de avance con desbloqueo secuencial de módulos.
* **4 Módulos Educativos Evaluables:**
  1. **Módulo I — Tipos de IA:** Diferencias entre IA tradicional, modelos de lenguaje (LLMs), difusión y modelos multimodales.
  2. **Módulo II — Normatividad:** Protección de datos personales (LFPDPPP / GDPR), anonimización y propiedad intelectual.
  3. **Módulo III — Prompting:** Construcción de instrucciones efectivas bajo la estructura *Rol + Contexto + Tarea + Formato*.
  4. **Módulo IV — Simulador Ético IA:** Entorno práctico en tiempo real con control de intentos disponibles.
* **Interceptor de Privacidad (PII):** Filtro de seguridad en el *backend* que detecta y bloquea *prompts* con datos sensibles (teléfonos, correos o información identificable) antes de enviarlos a la API externa, desplegando alertas de normatividad.
* **Agente Tutor con Gemini API:** Integración con el SDK oficial `@google/genai` para evaluar la estructura y ética de los *prompts* en vivo, incluyendo respaldo automático ante alta demanda.
* **Certificación en PDF:** Emisión de certificado de aprobación personalizado con calificación promedio, fecha y folio único (`GUIA-2026-001`) listo para exportar a PDF.

---

## 🛠️ Stack Tecnológico y Arquitectura
* **Frontend:** HTML5, CSS3 puro (diseño responsivo y soporte de impresión `@media print`) y JavaScript Vanilla (ES6+ con `Fetch API` y `localStorage`).
* **Backend:** Node.js, Express.js, CORS, `dotenv` y SDK oficial `@google/genai` (modelos `gemini-3.8-flash` / `gemini-3.8-flash-lite`).
* **Base de Datos (Diseño Relacional Fase III):** Modelo normalizado de 8 entidades en MySQL/MariaDB (`Usuarios`, `Modulos`, `Lecciones`, `Evaluaciones`, `Simuladores_IA`, `Progreso_Lecciones`, `Resultados_Evaluaciones`, `Historial_Prompts`).

---

## 📂 Estructura del Repositorio

```text
GuIA/
├── backend/
│   ├── .env                  # Variables de entorno (GEMINI_API_KEY)
│   ├── package.json          # Dependencias de Node.js
│   └── server.js             # API REST, filtro local de PII y conexión con Gemini
├── frontend/
│   ├── index.html            # Vistas de Login, Dashboard, Lecciones, Simulador y Certificado
│   ├── style.css             # Hoja de estilos y reglas de impresión PDF
│   └── app.js                # Lógica de navegación, evaluaciones y consumo de API
└── README.md                 # Documentación general del proyecto
