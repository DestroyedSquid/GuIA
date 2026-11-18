// Estado inicial del estudiante (persistente en localStorage)
const ESTADO_INICIAL = {
  autenticado: false,
  nombre: "Rosales Guzman Jose Emiliano",
  correo: "Jose@gmail.com",
  intentosSimulador: 5,
  modulos: [
    {
      id: 1,
      titulo: "Módulo I: Tipos de IA",
      estado: "in_progress", // done | in_progress | locked
      calificacion: null,
      leccionActual: "Modelos de Lenguaje, Imagen y Audio",
      teoria: `
        <p>La <strong>Inteligencia Artificial Generativa</strong> crea contenido nuevo (texto, código, imágenes, audio) aprendiendo patrones estadísticos de grandes volúmenes de datos, a diferencia de la IA tradicional que solo clasifica o predice.</p>
        <ul>
          <li><strong>LLMs (Modelos de Lenguaje):</strong> Como Gemini, procesan y generan texto, resúmenes y código.</li>
          <li><strong>Modelos de Difusión:</strong> Generan imágenes a partir de descripciones textuales.</li>
          <li><strong>Modelos Multimodales:</strong> Entienden y combinan texto, imagen, audio y video simultáneamente.</li>
        </ul>
      `,
      preguntas: [
        {
          q: "¿Cuál es la diferencia principal de la IA Generativa frente a la IA tradicional?",
          opciones: ["Crea contenido nuevo original a partir de patrones aprendidos", "Solo sirve para ordenar hojas de cálculo", "No requiere datos de entrenamiento"],
          correcta: 0
        },
        {
          q: "¿Qué tipo de modelo procesa simultáneamente texto, imagen y audio?",
          opciones: ["Modelo lineal", "Modelo Multimodal", "Base de datos relacional"],
          correcta: 1
        }
      ]
    },
    {
      id: 2,
      titulo: "Módulo II: Normatividad",
      estado: "locked",
      calificacion: null,
      leccionActual: "Privacidad (PII) y Derechos de Autor",
      teoria: `
        <p>El uso profesional de la IA exige cumplir con leyes de protección de datos (como la <strong>LFPDPPP</strong> en México y el <strong>GDPR</strong> europeo) y respeto a la propiedad intelectual.</p>
        <ul>
          <li><strong>Datos Personales Sensibles (PII):</strong> Nunca ingreses nombres reales de clientes, teléfonos, correos, CURP o historiales médicos en prompts públicos.</li>
          <li><strong>Anonimización:</strong> Sustituye datos reales por identificadores genéricos (ej. "Cliente A").</li>
          <li><strong>Derechos de Autor:</strong> Evita solicitar copias literales de obras protegidas.</li>
        </ul>
      `,
      preguntas: [
        {
          q: "¿Qué significan las siglas PII en seguridad y normatividad de IA?",
          opciones: ["Protocolo Interno de Internet", "Información Personal Identificable (datos sensibles)", "Procesamiento Inteligente de Imágenes"],
          correcta: 1
        },
        {
          q: "¿Cuál es la práctica correcta antes de resumir un caso real con IA?",
          opciones: ["Anonimizar eliminando nombres, teléfonos y correos", "Subir el documento con todos los datos originales", "Compartir la contraseña del cliente"],
          correcta: 0
        }
      ]
    },
    {
      id: 3,
      titulo: "Módulo III: Prompting",
      estado: "locked",
      calificacion: null,
      leccionActual: "Estructura Rol + Contexto + Tarea + Formato",
      teoria: `
        <p>La <strong>Ingeniería de Prompts</strong> consiste en redactar instrucciones precisas para reducir ambigüedades y evitar alucinaciones del modelo.</p>
        <ul>
          <li><strong>Rol:</strong> Define quién debe ser la IA (ej. <em>"Actúa como auditor de ciberseguridad..."</em>).</li>
          <li><strong>Contexto:</strong> Explica el escenario y audiencia.</li>
          <li><strong>Tarea:</strong> Indica exactamente qué acción realizar.</li>
          <li><strong>Formato:</strong> Especifica si deseas una tabla, lista de puntos o párrafo breve.</li>
        </ul>
      `,
      preguntas: [
        {
          q: "¿Cuáles son los 4 elementos recomendados de un prompt estructurado?",
          opciones: ["Rol, Contexto, Tarea y Formato", "Color, Tamaño, Fuente y Margen", "Usuario, Contraseña, Puerto y Host"],
          correcta: 0
        },
        {
          q: "¿Para qué sirve asignar un 'Rol' al inicio de un prompt?",
          opciones: ["Para acotar el tono, vocabulario y enfoque experto de la respuesta", "Para que la IA responda más lento", "Para saltarse las leyes de privacidad"],
          correcta: 0
        }
      ]
    },
    {
      id: 4,
      titulo: "Módulo IV: Simulador IA",
      estado: "locked",
      calificacion: null,
      leccionActual: "Práctica ética en vivo con Gemini API",
      esSimulador: true
    }
  ]
};

let estado = JSON.parse(localStorage.getItem("guia_generativa_state")) || structuredClone(ESTADO_INICIAL);

function guardarEstado() {
  localStorage.setItem("guia_generativa_state", JSON.stringify(estado));
}

// ==================== INICIALIZACIÓN Y AUTH ====================
window.addEventListener("DOMContentLoaded", () => {
  if (estado.autenticado) {
    mostrarApp();
  }
});

function alternarAuth(vista) {
  document.getElementById("form-login").classList.toggle("hidden", vista !== "login");
  document.getElementById("form-registro").classList.toggle("hidden", vista !== "registro");
}

function iniciarSesion(e) {
  e.preventDefault();
  const correo = document.getElementById("login-email").value.trim();
  estado.correo = correo;
  estado.autenticado = true;
  guardarEstado();
  mostrarApp();
}

function registrarUsuario(e) {
  e.preventDefault();
  estado.nombre = document.getElementById("reg-nombre").value.trim();
  estado.correo = document.getElementById("reg-email").value.trim();
  estado.autenticado = true;
  guardarEstado();
  mostrarApp();
}

function cerrarSesion() {
  estado.autenticado = false;
  guardarEstado();
  document.getElementById("app-shell").classList.add("hidden");
  document.getElementById("view-auth").classList.remove("hidden");
}

function mostrarApp() {
  document.getElementById("view-auth").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
  document.getElementById("user-display").textContent = estado.nombre;
  navegar("inicio");
}

// ==================== NAVEGACIÓN ====================
function navegar(vista) {
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(`view-${vista}`).classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === vista);
  });

  if (vista === "inicio") renderDashboard();
  if (vista === "simulador") actualizarIntentosUI();
  if (vista === "certificado") renderCertificado();
}

// ==================== DASHBOARD Y MÓDULOS ====================
function renderDashboard() {
  const grid = document.getElementById("modules-grid");
  grid.innerHTML = "";

  const completados = estado.modulos.filter(m => m.estado === "done").length;
  const porcentaje = Math.round((completados / estado.modulos.length) * 100);
  document.getElementById("progress-text").textContent = `${porcentaje}%`;
  document.getElementById("progress-fill").style.width = `${porcentaje}%`;

  estado.modulos.forEach((mod, idx) => {
    const card = document.createElement("div");
    let claseEstado = "status-locked";
    let textoEstado = "Bloqueado";
    let detalleExtra = `Requisito: Completar Módulo ${idx}.`;
    let textoBoton = "🔒 Bloqueado";
    let deshabilitado = true;

    if (mod.estado === "done") {
      claseEstado = "status-done";
      textoEstado = "Completado";
      detalleExtra = `Calificación: <strong>${mod.calificacion} / 10</strong>`;
      textoBoton = mod.esSimulador ? "Ver Certificado" : "Repasar / Ver Certificado";
      deshabilitado = false;
    } else if (mod.estado === "in_progress") {
      claseEstado = "status-progress";
      textoEstado = "En progreso";
      detalleExtra = `Lección actual: ${mod.leccionActual}`;
      textoBoton = mod.esSimulador ? "Abrir Simulador IA →" : "Continuar →";
      deshabilitado = false;
    }

    card.className = `module-card ${claseEstado}`;
    card.innerHTML = `
      <div>
        <h3>${mod.titulo}</h3>
        <div class="module-meta">
          <p>Estado: <strong>${textoEstado}</strong></p>
          <p>${detalleExtra}</p>
        </div>
      </div>
      <button class="module-btn" ${deshabilitado ? "disabled" : ""} onclick="accionModulo(${mod.id})">
        ${textoBoton}
      </button>
    `;
    grid.appendChild(card);
  });
}

function accionModulo(id) {
  const mod = estado.modulos.find(m => m.id === id);
  if (!mod || mod.estado === "locked") return;

  if (mod.esSimulador) {
    if (mod.estado === "done") {
      navegar("certificado");
    } else {
      navegar("simulador");
    }
    return;
  }

  // Cargar vista de lección y examen
  const contenedor = document.getElementById("modulo-contenido");
  let preguntasHTML = mod.preguntas.map((p, i) => `
    <div class="quiz-question">
      <p>${i + 1}. ${p.q}</p>
      ${p.opciones.map((op, opIdx) => `
        <label class="quiz-option">
          <input type="radio" name="preg-${i}" value="${opIdx}" required> ${op}
        </label>
      `).join("")}
    </div>
  `).join("");

  contenedor.innerHTML = `
    <h2>${mod.titulo}</h2>
    <div class="lesson-theory">${mod.teoria}</div>
    <h3>Evaluación del Módulo (Mínimo 8.0 para aprobar)</h3>
    <form onsubmit="evaluarModulo(event, ${mod.id})">
      ${preguntasHTML}
      <button type="submit" class="btn-primary">Enviar Respuestas y Calificar</button>
    </form>
  `;

  navegar("modulo");
}

function evaluarModulo(e, id) {
  e.preventDefault();
  const mod = estado.modulos.find(m => m.id === id);
  let aciertos = 0;

  mod.preguntas.forEach((p, i) => {
    const seleccionado = document.querySelector(`input[name="preg-${i}"]:checked`);
    if (seleccionado && Number(seleccionado.value) === p.correcta) {
      aciertos++;
    }
  });

  const calif = aciertos === mod.preguntas.length ? 10.0 : (aciertos > 0 ? 8.0 : 5.0);

  if (calif >= 8.0) {
    mod.estado = "done";
    mod.calificacion = calif.toFixed(1);

    // Desbloquear el siguiente módulo
    const siguiente = estado.modulos.find(m => m.id === id + 1);
    if (siguiente && siguiente.estado === "locked") {
      siguiente.estado = "in_progress";
    }

    guardarEstado();
    alert(`¡Felicidades! Aprobaste ${mod.titulo} con calificación de ${mod.calificacion} / 10.`);
    navegar("inicio");
  } else {
    alert(`Obtuviste ${calif.toFixed(1)} / 10. Repasa la lección e inténtalo de nuevo.`);
  }
}

// ==================== SIMULADOR ÉTICO CON GEMINI API ====================
function actualizarIntentosUI() {
  document.getElementById("sim-intentos").textContent = `${estado.intentosSimulador} / 5`;
}

function cargarEjemploPII() {
  document.getElementById("prompt-input").value =
    "Resume los datos médicos y el teléfono de mi cliente Juan Pérez: 5512345678";
}

function cargarEjemploSeguro() {
  document.getElementById("prompt-input").value =
    "Actúa como asesor de comunicación clínica. Redacta en 3 puntos clave las recomendaciones generales de prevención cardiovascular para un paciente adulto anónimo.";
}

async function enviarPromptAlSimulador(e) {
  e.preventDefault();
  const input = document.getElementById("prompt-input");
  const btn = document.getElementById("btn-enviar-prompt");
  const chat = document.getElementById("chat-history");
  const promptText = input.value.trim();

  if (!promptText) return;

  if (estado.intentosSimulador <= 0) {
    alert("Has agotado tus 5 intentos. Reinicia el progreso para volver a practicar.");
    return;
  }

  // Mostrar mensaje del usuario
  chat.innerHTML += `<div class="msg-user">${escapeHTML(promptText)}</div>`;
  input.value = "";
  btn.disabled = true;
  btn.textContent = "Analizando...";

  const loadingId = "loading-" + Date.now();
  chat.innerHTML += `<div id="${loadingId}" class="msg-agent">Validando normatividad PII y consultando a Gemini API...</div>`;
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("http://localhost:3000/api/simulador", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ promptText })
    });

    const data = await response.json();
    document.getElementById(loadingId).remove();

    if (data.bloqueado) {
      estado.intentosSimulador--;
      guardarEstado();
      actualizarIntentosUI();

      chat.innerHTML += `
        <div class="msg-alert">
          <strong>⚠️ ${escapeHTML(data.alerta)}</strong><br>
          <small>Corrige el prompt eliminando datos personales e inténtalo de nuevo.</small>
        </div>`;
    } else if (data.respuestaIA) {
      chat.innerHTML += `
        <div class="msg-success">
          <strong>✅ Prompt Ético Validado por Gemini API:</strong>
          <p style="margin-top:8px; white-space: pre-line;">${escapeHTML(data.respuestaIA)}</p>
        </div>`;

      // Marcar Módulo IV como completado (100% del curso)
      const modSim = estado.modulos.find(m => m.id === 4);
      modSim.estado = "done";
      modSim.calificacion = "10.0";
      guardarEstado();

      chat.innerHTML += `
        <div class="msg-agent">
          🎉 ¡Has completado el Módulo IV y alcanzado el <strong>100% de progreso</strong>! Ya puedes descargar tu certificado oficial.
          <br><br><button class="btn-primary" onclick="navegar('certificado')">Ver mi Certificado →</button>
        </div>`;
    } else {
      chat.innerHTML += `<div class="msg-alert">Error del servidor: ${escapeHTML(data.error || "Respuesta inválida")}</div>`;
    }
  } catch (error) {
    document.getElementById(loadingId)?.remove();
    chat.innerHTML += `
      <div class="msg-alert">
        No se pudo conectar con el servidor backend en <code>http://localhost:3000</code>. Asegúrate de tener ejecutando <code>node server.js</code> en tu terminal.
      </div>`;
  } finally {
    btn.disabled = false;
    btn.textContent = "Enviar ➤";
    chat.scrollTop = chat.scrollHeight;
  }
}

// ==================== CERTIFICADO Y UTILIDADES ====================
function renderCertificado() {
  const algunAprobado = estado.modulos.some(m => m.estado === "done");
  document.getElementById("certificado-bloqueado").classList.toggle("hidden", algunAprobado);
  document.getElementById("certificado-oficial").classList.toggle("hidden", !algunAprobado);

  if (algunAprobado) {
    document.getElementById("cert-student-name").textContent = estado.nombre;
    const califs = estado.modulos.filter(m => m.calificacion).map(m => Number(m.calificacion));
    const promedio = califs.length ? (califs.reduce((a, b) => a + b, 0) / califs.length).toFixed(1) : "9.5";
    document.getElementById("cert-grade").textContent = `${promedio} / 10`;
  }
}

function activarModoExpo() {
  estado.modulos.forEach((m, i) => {
    if (i < 3) {
      m.estado = "done";
      m.calificacion = "9.5";
    } else {
      m.estado = "in_progress";
    }
  });
  guardarEstado();
  alert("Modo Exposición activado: Módulos I al III aprobados y Módulo IV (Simulador Gemini) desbloqueado.");
  navegar("inicio");
}

function reiniciarProgreso() {
  const nombreActual = estado.nombre;
  const correoActual = estado.correo;
  estado = structuredClone(ESTADO_INICIAL);
  estado.autenticado = true;
  estado.nombre = nombreActual;
  estado.correo = correoActual;
  guardarEstado();
  renderDashboard();
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}