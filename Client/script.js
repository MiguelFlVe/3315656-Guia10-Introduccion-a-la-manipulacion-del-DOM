/**
 * ============================================
 * EJERCICIO DE MANIPULACIÓN DEL DOM
 * GESTIÓN DE TAREAS POR USUARIO
 * ============================================
 *
 * Objetivo: Aplicar conceptos del DOM para buscar usuarios
 * y registrar tareas asociadas sin recargar la página.
 *
 * Autor 1: [Miguel Flórez]
 * Autor 2: [Óscar Solano]
 * Fecha: [12/05/2026]
 * ============================================
 */

// ============================================
// 1. SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================
// Aquí se guardan las referencias a los elementos del HTML que se usan
// durante toda la aplicación: formularios, mensajes, tabla de tareas, etc.

const STORAGE_KEYS = {
    TASKS: "taskManagerTasks"
};

const apiUrl = 'http://192.168.0.13:5500/';

const userSearchForm = document.getElementById("userSearchForm");
const userDocumentInput = document.getElementById("userDocument");
const userDocumentError = document.getElementById("userDocumentError");

const userCard = document.getElementById("userCard");
const userNameDisplay = document.getElementById("userNameDisplay");
const userDocumentDisplay = document.getElementById("userDocumentDisplay");
const userEmailDisplay = document.getElementById("userEmailDisplay");

const userSearchMessage = document.getElementById("userSearchMessage");

const taskForm = document.getElementById("taskForm");
const taskFormFieldset = document.getElementById("taskFormFieldset");

const taskTitleInput = document.getElementById("taskTitle");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskStatusSelect = document.getElementById("taskStatus");

const taskTitleError = document.getElementById("taskTitleError");
const taskDescriptionError = document.getElementById("taskDescriptionError");
const taskStatusError = document.getElementById("taskStatusError");

const tasksTableBody = document.getElementById("tasksTableBody");
const tasksEmptyState = document.getElementById("tasksEmptyState");

// Usuarios y tareas de respaldo cuando el backend no está disponible.
const FALLBACK_USERS = [];

const FALLBACK_TASKS = [];

let currentUserId = null; // Guarda el ID del usuario actualmente seleccionado.
let dbUsers = []; // Lista de usuarios cargados del backend o de respaldo.
let dbTasks = []; // Lista de tareas cargadas del backend o localmente.

// Normaliza un valor de ID a cadena sin espacios extra.
function normalizeId(value) {
    return String(value ?? "").trim();
}

// Carga datos de usuarios y tareas desde el backend. Si falla, usa datos de respaldo.
// También combina las tareas guardadas en localStorage con las tareas cargadas.
async function loadLocalData() {
    try {
        const [usersResponse, tasksResponse] = await Promise.all([
            fetch(`${apiUrl}users`),
            fetch(`${apiUrl}tasks`)
        ]);

        if (!usersResponse.ok || !tasksResponse.ok) {
            throw new Error("No se pudo cargar datos del backend");
        }

        const [usersData, tasksData] = await Promise.all([
            usersResponse.json(),
            tasksResponse.json()
        ]);

        dbUsers = (Array.isArray(usersData) ? usersData : usersData.users || [])
            .map(user => ({
                ...user,
                id: normalizeId(user.id)
            }));

        dbTasks = (Array.isArray(tasksData) ? tasksData : tasksData.tasks || [])
            .map(task => ({
                ...task,
                id: normalizeId(task.id),
                userId: normalizeId(task.userId)
            }));
    } catch (error) {
        console.warn("No se pudo cargar datos desde el backend, intentando cargar datos locales de repo", error);
        const loadedFromRepo = await loadFallbackData();

        if (!loadedFromRepo) {
            dbUsers = [...FALLBACK_USERS];
            dbTasks = [...FALLBACK_TASKS];
        }
    }

    const storedTasks = loadSavedTasks();
    if (storedTasks.length > 0) {
        dbTasks = [
            ...dbTasks,
            ...storedTasks.filter(task => !dbTasks.some(local => normalizeId(local.id) === normalizeId(task.id)))
        ];
    }
}

async function loadFallbackData() {
    try {
        const response = await fetch("../Server/db.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const fallbackUsers = Array.isArray(data.users) ? data.users : [];
        const fallbackTasks = Array.isArray(data.tasks) ? data.tasks : [];

        dbUsers = fallbackUsers.map(user => ({
            ...user,
            id: normalizeId(user.id)
        }));

        dbTasks = fallbackTasks.map(task => ({
            ...task,
            id: normalizeId(task.id),
            userId: normalizeId(task.userId)
        }));

        return true;
    } catch (error) {
        console.warn("No se pudo cargar datos desde Server/db.json", error);
        return false;
    }
}

// ============================================
// 2. FUNCIONES AUXILIARES
// ============================================

// Determina si un valor de entrada no está vacío.
function isValidInput(value) {
    return value.trim().length > 0;
}

// Muestra mensaje de error junto a un campo.
function showError(errorElement, message) {
    errorElement.textContent = message;
}

// Limpia el texto de error de un campo.
function clearError(errorElement) {
    errorElement.textContent = "";
}

// Elimina todos los mensajes de error visibles en la página.
function clearAllErrors() {
    clearError(userDocumentError);
    clearError(taskTitleError);
    clearError(taskDescriptionError);
    clearError(taskStatusError);
}

// Muestra la tarjeta de usuario con la información del usuario encontrado.
function showUserCard() {
    userCard.classList.remove("hidden");
}

// Oculta la tarjeta de usuario cuando no hay ningún usuario seleccionado.
function hideUserCard() {
    userCard.classList.add("hidden");
}

// Muestra un mensaje de información o error debajo del formulario de búsqueda.
function showUserMessage(message, isError = false) {
    userSearchMessage.textContent = message;
    userSearchMessage.classList.remove("hidden");
    if (isError) {
        userSearchMessage.classList.add("info-message--error");
    } else {
        userSearchMessage.classList.remove("info-message--error");
    }
}

// Oculta el mensaje de búsqueda de usuario.
function hideUserMessage() {
    userSearchMessage.classList.add("hidden");
}

// Activa el formulario de tareas para permitir el registro de nuevas tareas.
function enableTaskForm() {
    taskFormFieldset.disabled = false;
}

// Desactiva el formulario de tareas cuando no hay usuario seleccionado.
function disableTaskForm() {
    taskFormFieldset.disabled = true;
}

// Oculta el estado de tabla vacía.
function hideEmptyState() {
    tasksEmptyState.classList.add("hidden");
}

// Muestra el indicador de tabla vacía cuando no hay tareas para el usuario.
function showEmptyState() {
    tasksEmptyState.classList.remove("hidden");
}

// Valida el formulario de búsqueda de usuario.
function validateUserSearch() {
    const documentValue = normalizeId(userDocumentInput.value);
    if (!isValidInput(documentValue)) {
        showError(userDocumentError, "El documento es obligatorio");
        return false;
    }
    clearError(userDocumentError);
    return true;
}

// Valida los campos del formulario de tarea y marca los errores correspondientes.
function validateTaskForm() {
    let isValid = true;

    if (!isValidInput(taskTitleInput.value)) {
        showError(taskTitleError, "El título es obligatorio");
        taskTitleInput.classList.add("error");
        isValid = false;
    } else {
        clearError(taskTitleError);
        taskTitleInput.classList.remove("error");
    }

    if (!isValidInput(taskDescriptionInput.value)) {
        showError(taskDescriptionError, "La descripción es obligatoria");
        taskDescriptionInput.classList.add("error");
        isValid = false;
    } else {
        clearError(taskDescriptionError);
        taskDescriptionInput.classList.remove("error");
    }

    if (!isValidInput(taskStatusSelect.value)) {
        showError(taskStatusError, "Selecciona un estado");
        taskStatusSelect.classList.add("error");
        isValid = false;
    } else {
        clearError(taskStatusError);
        taskStatusSelect.classList.remove("error");
    }

    return isValid;
}

// Busca un usuario en la lista cargada mediante su documento/inID.
function findUserByDocument(documentValue) {
    const normalizedDocument = normalizeId(documentValue);
    return dbUsers.find(user => normalizeId(user.id) === normalizedDocument);
}

// Devuelve las tareas asociadas a un usuario específico.
// Considera nombres de campo comunes de distintas fuentes de datos.
function getUserTasks(userId) {
    const normalizedUserId = normalizeId(userId);
    return dbTasks.filter(task =>
        normalizeId(task.userId) === normalizedUserId ||
        normalizeId(task.user_id) === normalizedUserId ||
        normalizeId(task.id_usuario) === normalizedUserId
    );
}

// ============================================
// 3. MANEJO DE EVENTOS - BÚSQUEDA DE USUARIO
// ============================================

// Procesa el envío del formulario de búsqueda de usuario.
async function handleUserSearch(event) {
    event.preventDefault();
    clearAllErrors();
    hideUserMessage();

    if (!validateUserSearch()) {
        return;
    }

    const documentValue = normalizeId(userDocumentInput.value);
    const user = findUserByDocument(documentValue);

    if (user) {
        currentUserId = normalizeId(user.id);
        userNameDisplay.textContent = user.name;
        userDocumentDisplay.textContent = user.id;
        userEmailDisplay.textContent = user.email;

        hideUserMessage();
        showUserCard();
        enableTaskForm();
        loadUserTasks(currentUserId);
    } else {
        currentUserId = null;
        hideUserCard();
        disableTaskForm();
        clearTasksTable();
        showUserMessage("Usuario no encontrado en el sistema", true);
    }
}

// ============================================
// 4. MANEJO DE EVENTOS - REGISTRO DE TAREA
// ============================================

// Procesa el envío del formulario de nueva tarea.
async function handleTaskSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    clearAllErrors();

    if (!currentUserId) {
        showError(taskStatusError, "Debe buscar un usuario primero");
        taskStatusSelect.classList.add("error");
        return;
    }

    if (!validateTaskForm()) {
        return;
    }

    const newTask = {
        id: String(Date.now()),
        userId: currentUserId,
        title: taskTitleInput.value.trim(),
        description: taskDescriptionInput.value.trim(),
        status: taskStatusSelect.value,
        createdAt: new Date().toISOString()
    };

    const savedTask = await saveTaskToBackend(newTask);
    dbTasks.push(savedTask);
    saveTasksToStorage();
    addTaskToTable(savedTask);
    taskForm.reset();
    taskStatusSelect.value = "";
}

// Guarda todas las tareas en localStorage para persistencia local.
function saveTasksToStorage() {
    try {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(dbTasks));
    } catch (error) {
        console.warn("No se pudo guardar en localStorage", error);
    }
}

// Intenta guardar la tarea en el backend remoto y devuelve la tarea guardada.
// Si falla, se devuelve la tarea original para uso local.
async function saveTaskToBackend(task) {
    try {
        const response = await fetch(`${apiUrl}tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const saved = await response.json();
        showUserMessage("Tarea guardada en el backend.");
        return {
            ...task,
            id: normalizeId(saved.id || task.id),
            userId: normalizeId(saved.userId || task.userId)
        };
    } catch (error) {
        showUserMessage(`Error al guardar: ${error.message}. La tarea se guardó localmente.`, true);
        return task;
    }
}

// Lee las tareas almacenadas en localStorage.
function loadSavedTasks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.warn("No se pudo leer localStorage", error);
        return [];
    }
}

// Carga las tareas del usuario actual en la tabla de tareas.
function loadUserTasks(userId) {
    clearTasksTable();
    const userTasks = getUserTasks(userId);

    if (userTasks.length === 0) {
        showEmptyState();
        return;
    }

    hideEmptyState();
    userTasks.forEach(task => addTaskToTable(task));
}

// Inserta una fila nueva en la tabla de tareas con los datos de la tarea.
function addTaskToTable(task) {
    if (tasksTableBody.children.length === 0) {
        hideEmptyState();
    }

    const row = document.createElement("tr");
    row.classList.add("tasks__row");

    const statusClass = getStatusClass(task.status);
    const user = dbUsers.find(u => normalizeId(u.id) === normalizeId(task.userId));
    const userName = user ? user.name : `Usuario ${normalizeId(task.userId)}`;

    const titleCell = document.createElement("td");
    titleCell.classList.add("tasks__cell");
    titleCell.textContent = task.title;

    const descriptionCell = document.createElement("td");
    descriptionCell.classList.add("tasks__cell");
    descriptionCell.textContent = task.description;

    const statusCell = document.createElement("td");
    statusCell.classList.add("tasks__cell");
    const statusBadge = document.createElement("span");
    statusBadge.classList.add("task-status", `task-status--${statusClass}`);
    statusBadge.textContent = getStatusText(task.status);
    statusCell.appendChild(statusBadge);

    const userCell = document.createElement("td");
    userCell.classList.add("tasks__cell");
    userCell.textContent = userName;

    row.appendChild(titleCell);
    row.appendChild(descriptionCell);
    row.appendChild(statusCell);
    row.appendChild(userCell);

    tasksTableBody.appendChild(row);
}

// Escapa texto para evitar inyección de HTML en la tabla.
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Devuelve la clase CSS correspondiente al estado de la tarea.
function getStatusClass(status) {
    switch (status) {
        case "pendiente":
            return "pending";
        case "en-proceso":
            return "in-progress";
        case "completada":
            return "completed";
        default:
            return "pending";
    }
}

// Devuelve el texto legible para cada estado de la tarea.
function getStatusText(status) {
    switch (status) {
        case "pendiente":
            return "Pendiente";
        case "en-proceso":
            return "En Proceso";
        case "completada":
            return "Completada";
        default:
            return status;
    }
}

// Maneja la edición de los campos de entrada para eliminar mensajes de error.
function handleInputChange(event) {
    const inputField = event.target;
    const errorElement = inputField.nextElementSibling;
    if (errorElement && errorElement.classList.contains("form__error")) {
        clearError(errorElement);
        inputField.classList.remove("error");
    }
}

// Limpia todas las filas de la tabla de tareas y muestra estado vacío.
function clearTasksTable() {
    tasksTableBody.innerHTML = "";
    showEmptyState();
}

// ============================================
// 5. REGISTRO DE EVENTOS
// ============================================

userSearchForm.addEventListener("submit", handleUserSearch);
taskForm.addEventListener("submit", handleTaskSubmit);

userDocumentInput.addEventListener("input", handleInputChange);
taskTitleInput.addEventListener("input", handleInputChange);
taskDescriptionInput.addEventListener("input", handleInputChange);
taskStatusSelect.addEventListener("change", handleInputChange);

// ============================================
// 6. INICIALIZACIÓN
// ============================================

document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOM completamente cargado");
    await loadLocalData();
    console.log("Aplicación de gestión de tareas iniciada");
});