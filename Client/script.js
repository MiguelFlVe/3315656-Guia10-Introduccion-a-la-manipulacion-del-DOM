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

let currentUserId = null;
let dbUsers = [];
let dbTasks = [];

async function loadLocalData() {
    try {
        const response = await fetch("../Server/db.json");
        if (!response.ok) throw new Error("No se pudo cargar la base de datos");
        const data = await response.json();
        dbUsers = data.users || [];
        dbTasks = data.tasks || [];
    } catch (error) {
        console.warn("No se pudo cargar db.json, usando JSONPlaceholder");
    }
}

// ============================================
// 2. FUNCIONES AUXILIARES
// ============================================

function isValidInput(value) {
    return value.trim().length > 0;
}

function showError(errorElement, message) {
    errorElement.textContent = message;
}

function clearError(errorElement) {
    errorElement.textContent = "";
}

function clearAllErrors() {
    clearError(userDocumentError);
    clearError(taskTitleError);
    clearError(taskDescriptionError);
    clearError(taskStatusError);
}

function showUserCard() {
    userCard.classList.remove("hidden");
}

function hideUserCard() {
    userCard.classList.add("hidden");
}

function showUserMessage(message, isError = false) {
    userSearchMessage.textContent = message;
    userSearchMessage.classList.remove("hidden");
    if (isError) {
        userSearchMessage.classList.add("info-message--error");
    } else {
        userSearchMessage.classList.remove("info-message--error");
    }
}

function hideUserMessage() {
    userSearchMessage.classList.add("hidden");
}

function enableTaskForm() {
    taskFormFieldset.disabled = false;
}

function disableTaskForm() {
    taskFormFieldset.disabled = true;
}

function hideEmptyState() {
    tasksEmptyState.classList.add("hidden");
}

function showEmptyState() {
    tasksEmptyState.classList.remove("hidden");
}

function validateUserSearch() {
    const document = userDocumentInput.value;
    if (!isValidInput(document)) {
        showError(userDocumentError, "El documento es obligatorio");
        return false;
    }
    clearError(userDocumentError);
    return true;
}

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

// ============================================
// 3. MANEJO DE EVENTOS - BÚSQUEDA DE USUARIO
// ============================================

async function handleUserSearch(event) {
    event.preventDefault();

    if (!validateUserSearch()) {
        return;
    }

    const document = userDocumentInput.value.trim();

    let user = null;

    if (dbUsers.length > 0) {
        user = dbUsers.find(u => u.id === parseInt(document));
    }

    if (!user) {
        try {
            const response = await fetch(`http://10.1.100.119:3050/users/${document}`);
            if (response.ok) {
                user = await response.json();
            }
        } catch (error) {
            console.warn("JSONPlaceholder no disponible");
        }
    }

    if (user) {
        currentUserId = Number(user.id);
        userNameDisplay.textContent = user.name;
        userDocumentDisplay.textContent = user.id;
        userEmailDisplay.textContent = user.email;

        hideUserMessage();
        showUserCard();
        enableTaskForm();
        loadUserTasks(currentUserId);
    } else {
        hideUserCard();
        disableTaskForm();
        currentUserId = null;
        showUserMessage("Usuario no encontrado en el sistema", true);
    }
}

// ============================================
// 4. MANEJO DE EVENTOS - REGISTRO DE TAREA
// ============================================

function handleTaskSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleTaskSubmit ejecutado");
    
    if (!currentUserId) {
        showError(taskStatusError, "Debe buscar un usuario primero");
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

    console.log("Nueva tarea:", newTask);

    fetch("http://10.1.100.119:3050/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
    })
    .then(response => {
        if (response.ok) {
            console.log("Tarea guardada en backend");
        }
    })
    .catch(error => {
        console.warn("Backend no disponible");
    });

    dbTasks.push(newTask);
    addTaskToTable(newTask.id, newTask.title, newTask.description, newTask.status, currentUserId);
    taskForm.reset();
    
    console.log("Tarea agregada a la tabla");
}

function saveTasksToStorage() {
    try {
        localStorage.setItem("tasks", JSON.stringify(dbTasks));
    } catch (error) {
        console.warn("No se pudo guardar en localStorage");
    }
}

async function loadUserTasks(userId) {
    console.log("Cargando tareas para usuario:", userId);
    tasksTableBody.innerHTML = "";
    
    let allTasks = [];

    try {
        const response = await fetch("http://10.1.100.119:3050/tasks");
        if (response.ok) {
            allTasks = await response.json();
            console.log("Tareas del backend:", allTasks);
            
            if (Array.isArray(allTasks) && allTasks.length > 0) {
                dbTasks = allTasks;
            }
        } else {
            throw new Error("Backend no disponible");
        }
    } catch (error) {
        console.warn("Backend no disponible, cargando desde localStorage");
        const stored = localStorage.getItem("tasks");
        if (stored) {
            allTasks = JSON.parse(stored);
        }
        allTasks = [...dbTasks, ...allTasks.filter(t => !dbTasks.some(dt => dt.id === t.id))];
    }

    console.log("Todas las tareas:", allTasks);
    
    const userIdNum = Number(userId);
    const userTasks = allTasks.filter(t => 
        Number(t.userId) === userIdNum || 
        Number(t.id_usuario) === userIdNum || 
        Number(t.user_id) === userIdNum
    );
    console.log("Tareas del usuario:", userTasks);

    if (userTasks.length === 0) {
        showEmptyState();
    } else {
        hideEmptyState();
        userTasks.forEach(task => {
            addTaskToTable(
                task.id, 
                task.title || task.titulo, 
                task.description || task.descripcion || task.body, 
                task.status || task.estado, 
                userId
            );
        });
    }
}

function addTaskToTable(taskId, title, description, status, userId) {
    if (tasksTableBody.children.length === 0) {
        hideEmptyState();
    }

    const row = document.createElement("tr");
    row.classList.add("tasks__row");

    const statusClass = getStatusClass(status);
    const user = dbUsers.find(u => u.id === userId);
    const userName = user ? user.name : `Usuario ${userId}`;

    row.innerHTML = `
        <td class="tasks__cell">${escapeHtml(title)}</td>
        <td class="tasks__cell">${escapeHtml(description)}</td>
        <td class="tasks__cell"><span class="task-status task-status--${statusClass}">${getStatusText(status)}</span></td>
        <td class="tasks__cell">${escapeHtml(userName)}</td>
    `;

    tasksTableBody.appendChild(row);
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

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

function handleInputChange(event) {
    const inputField = event.target;
    const errorElement = inputField.nextElementSibling;
    if (errorElement && errorElement.classList.contains("form__error")) {
        clearError(errorElement);
        inputField.classList.remove("error");
    }
}

// ============================================
// 5. REGISTRO DE EVENTOS
// ============================================

userSearchForm.addEventListener("submit", handleUserSearch);
document.getElementById("submitTaskBtn").addEventListener("click", handleTaskSubmit);

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