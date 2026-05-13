/**
 * ============================================
 * SISTEMA DE GESTIÓN DE TAREAS POR USUARIO
 * ============================================
 *
 * Objetivo: Buscar usuarios existentes en el servidor
 * local y registrar tareas asociadas a cada uno,
 * usando manipulación del DOM y fetch API con async/await.
 *
 * Flujo principal:
 * 1. Usuario ingresa un ID (1-10) en el buscador
 * 2. Se consulta el servidor GET /users/{id}
 * 3. Si existe → se muestran sus datos y se habilita
 *    el formulario de registro de tareas
 * 4. Si no existe → mensaje "Usuario no encontrado"
 * 5. Al registrar una tarea → POST /tasks y se agrega
 *    una fila a la tabla dinámica
 *
 * Autor 1: [Miguel Flórez]
 * Autor 2: [Óscar Solano]
 * Fecha: [6/05/2026]
 * ============================================
 */

// ============================================
// 1. SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================
// Cada variable almacena una referencia directa a un
// elemento del HTML. Esto evita tener que buscarlos
// cada vez que los necesitamos.
// ============================================

// ---- Sección 1: Buscar Usuario ----
const userSearchForm = document.getElementById("userSearchForm");
const userIdInput = document.getElementById("userIdInput");
const userIdError = document.getElementById("userIdError");
const searchBtn = document.getElementById("searchBtn");

const userResult = document.getElementById("userResult");
const userAvatar = document.getElementById("userAvatar");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

const userNotFound = document.getElementById("userNotFound");

// ---- Sección 2: Registrar Tarea ----
const taskSection = document.getElementById("taskSection");
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskStatus = document.getElementById("taskStatus");
const taskTitleError = document.getElementById("taskTitleError");
const taskDescError = document.getElementById("taskDescError");
const addTaskBtn = document.getElementById("addTaskBtn");

// ---- Sección 3: Tabla de Tareas ----
const tasksSection = document.getElementById("tasksSection");
const tasksBody = document.getElementById("tasksBody");
const taskCount = document.getElementById("taskCount");
const tasksEmpty = document.getElementById("tasksEmpty");

// ============================================
// 2. VARIABLES DE ESTADO
// ============================================
// currentUser: almacena el objeto del usuario
//   encontrado para asociar las tareas a él.
// taskCounter: lleva la cuenta de tareas
//   registradas para numerarlas en la tabla.
// API_BASE: URL base del servidor local.
// ============================================

let currentUser = null;
let taskCounter = 0;

// URL base del servidor json-server
// Se ejecuta en puerto 3000 por defecto
const API_BASE = "http://192.168.2.12:3050";

// ============================================
// 3. FUNCIONES AUXILIARES
// ============================================

/**
 * Valida que un campo no esté vacío.
 * @param {string} value - El texto a validar
 * @returns {boolean} - true si tiene contenido
 */
function isValidInput(value) {
    return value.trim().length > 0;
}

/**
 * Muestra un mensaje de error en un elemento.
 * @param {HTMLElement} element - Donde mostrar el error
 * @param {string} message - Texto del error
 */
function showError(element, message) {
    element.textContent = message;
}

/**
 * Limpia el mensaje de error de un elemento.
 * @param {HTMLElement} element - Elemento a limpiar
 */
function clearError(element) {
    element.textContent = "";
}

/**
 * Obtiene las iniciales de un nombre.
 * Ej: "Ana Torres" → "AT"
 * @param {string} name - Nombre completo
 * @returns {string} - Iniciales en mayúsculas
 */
function getInitials(name) {
    const words = name.trim().split(" ");
    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Actualiza el contador de tareas en el encabezado.
 * Muestra "X tareas" o "1 tarea" según la cantidad.
 */
function updateTaskCount() {
    const count = taskCounter;
    taskCount.textContent = `${count} ${count === 1 ? "tarea" : "tareas"}`;
}

// ============================================
// 4. BÚSQUEDA DE USUARIO
// ============================================

/**
 * Busca un usuario en el servidor por su ID.
 * 
 * async/await:
 * - async permite usar await dentro de la función
 * - await pausa la ejecución hasta que fetch
 *   recibe la respuesta del servidor
 * - fetch lanza una petición HTTP GET al endpoint
 * 
 * @param {number} id - ID del usuario (1-10)
 * @returns {object|null} - Datos del usuario o null
 */
async function buscarUsuario(id) {
    try {
        // fetch devuelve una Promise (promesa).
        // await espera a que el servidor responda.
        const respuesta = await fetch(`${API_BASE}/users/${id}`);

        // Si el servidor responde con 404 (no encontrado)
        // o cualquier código que no sea 200-299
        if (!respuesta.ok) {
            return null;
        }

        // Convertimos la respuesta a JSON (otra Promise)
        const usuario = await respuesta.json();
        return usuario;

    } catch (error) {
        // Si hay un error de red (servidor apagado,
        // sin internet, etc.) capturamos aquí
        console.error("Error al buscar usuario:", error);
        return null;
    }
}

/**
 * Limpia la tabla de tareas y resetea el contador.
 * Se usa cuando se cambia de usuario.
 */
function limpiarTabla() {
    tasksBody.innerHTML = "";
    taskCounter = 0;
    updateTaskCount();
    tasksEmpty.classList.remove("hidden");
}

/**
 * Carga las tareas existentes de un usuario desde el servidor.
 * GET /tasks?userId=:id devuelve todas las tareas asociadas
 * a ese usuario. Luego las renderiza en la tabla.
 * 
 * @param {number} userId - ID del usuario
 */
async function cargarTareasDeUsuario(userId) {
    try {
        const respuesta = await fetch(`${API_BASE}/tasks?userId=${userId}`);

        if (!respuesta.ok) {
            console.error("Error al cargar tareas:", respuesta.status);
            return;
        }

        const tareas = await respuesta.json();

        // Renderizar cada tarea existente en la tabla
        tareas.forEach(tarea => {
            // json-server devuelve { id, title, body, status, userId }
            // pero nosotros guardamos { title, description, status, userId }
            // Normalizamos: si viene "body" lo usamos como description
            const tareaNormalizada = {
                title: tarea.title,
                description: tarea.description || tarea.body || "",
                status: tarea.status || "pendiente"
            };
            agregarFilaATabla(tareaNormalizada);
        });

    } catch (error) {
        console.error("Error de red al cargar tareas:", error);
    }
}

/**
 * Muestra los datos del usuario en la interfaz.
 * También habilita las secciones de tareas y carga
 * las tareas existentes del usuario.
 * 
 * @param {object} user - Objeto del usuario
 */
function mostrarUsuario(user) {
    // Asignamos el avatar con las iniciales
    userAvatar.textContent = getInitials(user.name);

    // Asignamos nombre y email a los spans
    userName.textContent = user.name;
    userEmail.textContent = user.email;

    // Ocultamos el mensaje de error por si estaba visible
    userNotFound.classList.add("hidden");

    // Mostramos el resultado con animación
    userResult.classList.remove("hidden");

    // Habilitamos las secciones de tareas
    taskSection.classList.remove("hidden");
    tasksSection.classList.remove("hidden");

    // Limpiar la tabla antes de cargar tareas nuevas
    limpiarTabla();

    // Cargar las tareas existentes del usuario
    cargarTareasDeUsuario(user.id);
}

/**
 * Muestra el mensaje de "Usuario no encontrado"
 * y oculta el resultado anterior.
 */
function mostrarErrorUsuario() {
    userResult.classList.add("hidden");
    taskSection.classList.add("hidden");
    tasksSection.classList.add("hidden");
    userNotFound.classList.remove("hidden");
}

// ============================================
// 5. REGISTRO DE TAREAS
// ============================================

/**
 * Envía una nueva tarea al servidor mediante POST.
 * 
 * fetch con método POST:
 * - method: "POST" indica que vamos a CREAR un recurso
 * - headers: le decimos al servidor que enviamos JSON
 * - body: los datos convertidos a string JSON
 * 
 * @param {object} tarea - { title, description, status, userId }
 * @returns {object|null} - Tarea creada o null si hay error
 */
async function registrarTareaEnServidor(tarea) {
    try {
        const respuesta = await fetch(`${API_BASE}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarea)
        });

        if (!respuesta.ok) {
            console.error("Error al registrar tarea:", respuesta.status);
            return null;
        }

        const tareaCreada = await respuesta.json();
        return tareaCreada;

    } catch (error) {
        console.error("Error de red al registrar tarea:", error);
        return null;
    }
}

/**
 * Valida los campos del formulario de tareas.
 * @returns {boolean} - true si todos son válidos
 */
function validarFormularioTarea() {
    let valido = true;

    // Validar título
    if (!isValidInput(taskTitle.value)) {
        showError(taskTitleError, "El título es obligatorio");
        taskTitle.classList.add("error");
        valido = false;
    } else {
        clearError(taskTitleError);
        taskTitle.classList.remove("error");
    }

    // Validar descripción
    if (!isValidInput(taskDescription.value)) {
        showError(taskDescError, "La descripción es obligatoria");
        taskDescription.classList.add("error");
        valido = false;
    } else {
        clearError(taskDescError);
        taskDescription.classList.remove("error");
    }

    return valido;
}

/**
 * Crea una fila <tr> en la tabla de tareas usando
 * createElement + appendChild (sin innerHTML directo).
 * 
 * createElement crea un nuevo elemento HTML en memoria.
 * appendChild lo inserta dentro de otro elemento existente.
 * 
 * @param {object} tarea - { title, description, status }
 */
function agregarFilaATabla(tarea) {
    // Incrementamos el contador global de tareas
    taskCounter++;

    // Ocultamos el mensaje vacío si está visible
    tasksEmpty.classList.add("hidden");

    // ---- Crear la fila (<tr>) ----
    const fila = document.createElement("tr");

    // ---- Columna 1: Número (#) ----
    const celdaNum = document.createElement("td");
    celdaNum.textContent = taskCounter;
    fila.appendChild(celdaNum);

    // ---- Columna 2: Título ----
    const celdaTitulo = document.createElement("td");
    celdaTitulo.textContent = tarea.title;
    fila.appendChild(celdaTitulo);

    // ---- Columna 3: Descripción ----
    const celdaDesc = document.createElement("td");
    celdaDesc.textContent = tarea.description;
    fila.appendChild(celdaDesc);

    // ---- Columna 4: Estado (con badge de color) ----
    const celdaEstado = document.createElement("td");

    // Creamos un span para el badge de estado
    const badge = document.createElement("span");
    badge.classList.add("task-status");

    // Asignamos la clase de color según el estado
    // task-status--pendiente, task-status--en_progreso, task-status--completada
    badge.classList.add(`task-status--${tarea.status}`);

    // Texto legible del estado
    const etiquetas = {
        pendiente: "Pendiente",
        en_progreso: "En progreso",
        completada: "Completada"
    };
    badge.textContent = etiquetas[tarea.status] || tarea.status;

    celdaEstado.appendChild(badge);
    fila.appendChild(celdaEstado);

    // ---- Insertar la fila en el <tbody> ----
    tasksBody.appendChild(fila);

    // Actualizar el contador visual de tareas
    updateTaskCount();
}

// ============================================
// 6. MANEJADORES DE EVENTOS
// ============================================

/**
 * Manejador del formulario de búsqueda de usuario.
 * 
 * event.preventDefault() evita que el navegador
 * recargue la página al enviar el formulario.
 * Sin esto, perderíamos todo el estado de la app.
 */
async function manejarBusquedaUsuario(event) {
    // Evita la recarga de la página
    event.preventDefault();

    // Obtener el ID ingresado por el usuario
    const id = userIdInput.value.trim();

    // Validar que el ID no esté vacío
    if (!isValidInput(id)) {
        showError(userIdError, "Ingresa un ID válido (1-10)");
        userIdInput.classList.add("error");
        return;
    }

    // Validar que el ID esté entre 1 y 10
    const idNum = parseInt(id, 10);
    if (idNum < 1 || idNum > 10) {
        showError(userIdError, "El ID debe estar entre 1 y 10");
        userIdInput.classList.add("error");
        return;
    }

    // Limpiar errores del campo
    clearError(userIdError);
    userIdInput.classList.remove("error");

    // Mostrar estado de carga (opcional)
    searchBtn.textContent = "Buscando...";
    searchBtn.disabled = true;

    // ---- Buscar usuario en el servidor ----
    // await: espera a que la petición termine
    const usuario = await buscarUsuario(idNum);

    // Restaurar el botón
    searchBtn.innerHTML = `<span class="btn__text">Buscar Usuario</span> <span class="btn__icon">&#128269;</span>`;
    searchBtn.disabled = false;

    if (usuario) {
        // ✅ Usuario encontrado
        currentUser = usuario;
        mostrarUsuario(usuario);
    } else {
        // ❌ Usuario no encontrado
        currentUser = null;
        mostrarErrorUsuario();
    }
}

/**
 * Manejador del formulario de registro de tareas.
 * Crea una tarea, la envía al servidor y la agrega a la tabla.
 */
async function manejarRegistroTarea(event) {
    // ❌ Evita la recarga de la página
    event.preventDefault();

    // Validar que haya un usuario seleccionado
    if (!currentUser) {
        alert("Primero debes buscar un usuario");
        return;
    }

    // Validar los campos del formulario
    if (!validarFormularioTarea()) {
        return;
    }

    // Construir el objeto de la tarea
    const nuevaTarea = {
        title: taskTitle.value.trim(),
        description: taskDescription.value.trim(),
        status: taskStatus.value,
        userId: currentUser.id
    };

    // Deshabilitar botón durante el envío
    addTaskBtn.textContent = "Registrando...";
    addTaskBtn.disabled = true;

    // Enviar la tarea al servidor (POST)
    const tareaCreada = await registrarTareaEnServidor(nuevaTarea);

    // Restaurar botón
    addTaskBtn.innerHTML = `<span class="btn__text">Agregar Tarea</span> <span class="btn__icon">+</span>`;
    addTaskBtn.disabled = false;

    if (tareaCreada) {
        // ✅ Tarea registrada correctamente
        // Agregar fila a la tabla con createElement
        agregarFilaATabla(nuevaTarea);

        // Limpiar el formulario para seguir agregando tareas
        taskForm.reset();

        // Enfocar el primer campo para escribir rápido
        taskTitle.focus();
    } else {
        alert("Error al registrar la tarea. ¿El servidor está corriendo?");
    }
}

/**
 * Limpia los errores cuando el usuario empieza a escribir.
 * Esto mejora la experiencia: el error desaparece
 * mientras el usuario corrige el campo.
 * 
 * @param {Event} event - Evento 'input' del campo
 */
function limpiarErrorAlEscribir(event) {
    const input = event.target;

    // Limpiamos la clase error visual
    input.classList.remove("error");

    // Limpiamos el mensaje de error asociado
    // Según el ID del input, buscamos su error correspondiente
    if (input.id === "userIdInput") {
        clearError(userIdError);
    } else if (input.id === "taskTitle") {
        clearError(taskTitleError);
    } else if (input.id === "taskDescription") {
        clearError(taskDescError);
    }
}

// ============================================
// 7. REGISTRO DE EVENT LISTENERS
// ============================================
// Los event listeners "escuchan" las acciones del
// usuario (clic, tecleo, envío de formulario) y
// ejecutan una función cuando ocurren.
// ============================================

// ---- Formulario de búsqueda de usuario ----
// 'submit' se dispara al hacer clic en "Buscar Usuario"
// o presionar Enter dentro del campo de ID
userSearchForm.addEventListener("submit", manejarBusquedaUsuario);

// ---- Formulario de registro de tareas ----
taskForm.addEventListener("submit", manejarRegistroTarea);

// ---- Limpieza de errores al escribir ----
// Cada vez que el usuario escribe en estos campos,
// se limpia el error automáticamente
userIdInput.addEventListener("input", limpiarErrorAlEscribir);
taskTitle.addEventListener("input", limpiarErrorAlEscribir);
taskDescription.addEventListener("input", limpiarErrorAlEscribir);

// ============================================
// 8. INICIALIZACIÓN
// ============================================
// DOMContentLoaded se ejecuta cuando todo el HTML
// ha sido cargado y procesado por el navegador.
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM completamente cargado");
    console.log("📋 Sistema de gestión de tareas iniciado");
    console.log(`🔗 Servidor esperado en: ${API_BASE}`);

    // Verificación opcional: mostrar si el servidor responde
    fetch(`${API_BASE}/users`)
        .then(res => {
            if (res.ok) console.log("✅ Servidor conectado");
        })
        .catch(() => {
            console.warn("⚠️ Servidor no disponible. Ejecuta: npm run dev");
        });
});
