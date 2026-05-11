/**
 * ============================================
 * EJERCICIO DE MANIPULACIÓN DEL DOM
 * ============================================
 *
 * Objetivo: Aplicar conceptos del DOM para seleccionar elementos,
 * responder a eventos y crear nuevos elementos dinámicamente.
 *
 * Autor 1: [Miguel Flórez]
 * Autor 2: [Óscar Solano]
 * Fecha: [6/05/2026]
 * ============================================
 */

// ============================================
// 1. SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================

/**
 * Seleccionamos los elementos del DOM que necesitamos manipular.
 * Usamos getElementById para obtener referencias a los elementos únicos.
 */

// Formulario
const messageForm = document.getElementById("messageForm");

// Campos de entrada
const userNameInput = document.getElementById("userName");
const userMessageInput = document.getElementById("userMessage");

// Botón de envío
const submitBtn = document.getElementById("submitBtn");

// Elementos para mostrar errores
const userNameError = document.getElementById("userNameError");
const userMessageError = document.getElementById("userMessageError");

// Contenedor donde se mostrarán los mensajes
const messagesContainer = document.getElementById("messagesContainer");

// Estado vacío (mensaje que se muestra cuando no hay mensajes)
const emptyState = document.getElementById("emptyState");

// Contador de mensajes
const messageCount = document.getElementById("messageCount");

// Variable para llevar el conteo de mensajes
let totalMessages = 0;

// ============================================
// 2. FUNCIONES AUXILIARES
// ============================================

/**
 * Valida que un campo no esté vacío ni contenga solo espacios en blanco
 * @param {string} value - El valor a validar
 * @returns {boolean} - true si es válido, false si no lo es
 */

// TODO1: Implementar validación
// Pista: usa trim() para eliminar espacios al inicio y final
// Retorna true si después de trim() el string tiene longitud > 0

function isValidInput(value) {
    return value.trim().length > 0;
}
// * PREGUNTAS DE REFLEXIÓN:
//  * 
//  * 1. ¿Qué elemento del DOM estás seleccionando?
//  *    R: Se seleccionan los campos del formulario como userName
//  *    y userMessage para validar la información ingresada.
//  * 
//  * 2. ¿Qué evento provoca el cambio en la página?
//  *    R: El cambio ocurre cuando el usuario escribe o envía
//  *    información en el formulario.
//  * 
//  * 3. ¿Qué nuevo elemento se crea?
//  *    R: En el TODO1 no se crea ningún elemento nuevo, solamente
//  *    se valida el contenido ingresado por el usuario.
//  * 
//  * 4. ¿Dónde se inserta ese elemento dentro del DOM?
//  *    R: En esta parte del ejercicio no se inserta ningún elemento
//  *    en el DOM.
//  * 
//  * 5. ¿Qué ocurre en la página cada vez que repites la acción?
//  *    R: Cada vez que se valida el campo, el sistema comprueba si
//  *    el texto contiene caracteres válidos o solo espacios vacíos.
//  */
    
/**
 * Muestra un mensaje de error en un elemento específico
 * @param {HTMLElement} errorElement - Elemento donde mostrar el error
 * @param {string} message - Mensaje de error a mostrar
 */


// TODO2: Implementar función para mostrar error
// Pista: asigna el mensaje al textContent del elemento

function showError(errorElement, message) {
    errorElement.textContent = message;
}
/**
 * PREGUNTAS DE REFLEXIÓN:
 * 
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: Se seleccionan los elementos de error como
 *    userNameError y userMessageError.
 * 
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: El cambio ocurre cuando la validación detecta
 *    un campo vacío y se muestra un mensaje de error.
 * 
 * 3. ¿Qué nuevo elemento se crea?
 *    R: En este TODO no se crea un nuevo elemento,
 *    solamente se modifica el contenido de un elemento existente.
 * 
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: El mensaje de error aparece dentro de los elementos span
 *    destinados para mostrar errores en el formulario.
 * 
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: El mensaje de error se actualiza dependiendo
 *    de la validación realizada en el formulario.
 */


/**
 * Limpia el mensaje de error de un elemento específico
 * @param {HTMLElement} errorElement - Elemento del que limpiar el error
 */


// TODO3: Implementar función para limpiar error
// Pista: asigna un string vacío al textContent

function clearError(errorElement) {
    errorElement.textContent = "";
}
/**
 * PREGUNTAS DE REFLEXIÓN:
 * 
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: Se seleccionan los elementos donde se muestran
 *    los mensajes de error del formulario.
 * 
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: El cambio ocurre cuando el usuario corrige la información
 *    y el sistema limpia el mensaje de error.
 * 
 * 3. ¿Qué nuevo elemento se crea?
 *    R: En este TODO no se crea ningún elemento nuevo,
 *    solo se modifica un elemento existente.
 * 
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: No se inserta ningún elemento nuevo; se modifica
 *    el contenido de los elementos de error ya existentes.
 * 
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: Los mensajes de error desaparecen cuando se limpia
 *    el contenido del elemento correspondiente.
 */
/**
 * Valida todos los campos del formulario
 * @returns {boolean} - true si todos los campos son válidos, false si alguno no lo es
 */


// TODO4: Implementar validación completa del formulario
// 1. Obtener los valores de los inputs usando .value
// 2. Crear una variable para saber si el formulario es válido (inicialmente true)
// 3. Validar el campo de nombre de usuario
//    - Si no es válido, mostrar error y cambiar la variable a false
//    - Si es válido, limpiar el error
// 4. Validar el campo de mensaje
//    - Si no es válido, mostrar error y cambiar la variable a false
//    - Si es válido, limpiar el error
// 5. Retornar si el formulario es válido o no

function validateForm() {
    const userName = userNameInput.value;
    const userMessage = userMessageInput.value;

    let isValid = true;

    // Validar nombre de usuario
    if (!isValidInput(userName)) {
        showError(userNameError, "El nombre es obligatorio");
        userNameInput.classList.add("error");
        isValid = false;
    } else {
        clearError(userNameError);
        userNameInput.classList.remove("error");
    }

    // Validar mensaje
    if (!isValidInput(userMessage)) {
        showError(messageError, "El mensaje es obligatorio");
        userMessageInput.classList.add("error");
        isValid = false;
    } else {
        clearError(messageError);
        userMessageInput.classList.remove("error");
    }

    return isValid;
}
/**
 * PREGUNTAS DE REFLEXIÓN:
 * 
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: Se seleccionan los campos del formulario,
 *    los elementos de error y los inputs del usuario.
 * 
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: El cambio ocurre cuando el usuario intenta
 *    enviar el formulario y se ejecuta la validación.
 * 
 * 3. ¿Qué nuevo elemento se crea?
 *    R: En este TODO no se crean elementos nuevos,
 *    solo se validan y modifican elementos existentes.
 * 
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: Los mensajes de error se muestran dentro
 *    de los elementos span del formulario.
 * 
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: El formulario verifica nuevamente los datos,
 *    mostrando o limpiando errores dependiendo
 *    de la información ingresada.
 */
// Ejemplo de estructura:
/*
    const userName = userNameInput.value;
    const userMessage = userMessageInput.value;
    let isValid = true;
    
    // Validar nombre
    if (!isValidInput(userName)) {
        // Mostrar error
        // Agregar clase 'error' al input
        isValid = false;
    } else {
        // Limpiar error
        // Remover clase 'error' del input
    }
    
    // Validar mensaje (estructura similar)
    
    return isValid;
    */

/**
 * Obtiene la fecha y hora actual formateada
 * @returns {string} - Fecha y hora en formato legible
 */
function getCurrentTimestamp() {
    const now = new Date();
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return now.toLocaleDateString("es-ES", options);
}

/**
 * Obtiene las iniciales de un nombre
 * @param {string} name - Nombre completo
 * @returns {string} - Iniciales en mayúsculas
 */


// TODO5: Implementar función para obtener iniciales
// Pista:
// 1. Separar el nombre por espacios usando split(' ')
// 2. Tomar la primera letra de cada palabra
// 3. Unirlas y convertirlas a mayúsculas
// 4. Si solo hay una palabra, retornar las dos primeras letras

function getInitials(name) {
    const words = name.trim().split(" ");

    // Si solo hay una palabra
    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    // Tomar la primera letra de cada palabra
    const initials = words[0][0] + words[1][0];

    return initials.toUpperCase();
}
/**
 * PREGUNTAS DE REFLEXIÓN (TODO5 - getInitials):
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 * R: En este TODO no se selecciona ningún elemento del DOM, ya que solo se trabaja con una función que recibe un valor (string).
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 * R: No hay un evento del DOM directamente en este TODO. La función se ejecuta cuando se llama desde otra parte del código, por ejemplo al crear un mensaje.
 *
 * 3. ¿Qué nuevo elemento se crea?
 * R: No se crea un elemento del DOM en este TODO. Solo se genera un string con las iniciales del nombre del usuario.
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 * R: No se inserta directamente en el DOM aquí. El resultado (iniciales) se usa después al crear el avatar dentro del mensaje en el DOM.
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 * R: Cada vez que se ejecuta la función, se generan las iniciales del nombre ingresado y estas se muestran en el avatar del mensaje dentro del chat.


/**
 * Actualiza el contador de mensajes
 */
// TODO6: Implementar actualización del contador
// Pista: Usa template literals para crear el texto
// Formato: "X mensaje(s)" o "X mensajes"
/**
 * Oculta el estado vacío (mensaje cuando no hay mensajes)
 */

function updateMessageCount() {
    const count = messages.length;

    messageCount.textContent = `${count} ${
        count === 1 ? "mensaje" : "mensajes"
    }`;
}
/**
 * PREGUNTAS DE REFLEXIÓN (TODO6 - updateMessageCount):
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 * R: Se selecciona el elemento messageCount del DOM, que es donde se muestra el número total de mensajes.
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 * R: El cambio ocurre cada vez que se agrega un nuevo mensaje al chat, normalmente después del evento submit del formulario.
 *
 * 3. ¿Qué nuevo elemento se crea?
 * R: No se crea ningún nuevo elemento del DOM en este TODO. Solo se actualiza el texto del contador existente.
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 * R: No se inserta un nuevo elemento. Se actualiza directamente el contenido del elemento messageCount en el DOM.
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 * R: Cada vez que se envía un mensaje, el contador se actualiza dinámicamente mostrando cuántos mensajes existen,
 * cambiando entre "mensaje" o "mensajes" según la cantidad.
 */


// TODO7: Implementar función para ocultar el estado vacío
    // Pista: Agrega la clase 'hidden' al elemento emptyState
/**
 * Muestra el estado vacío (mensaje cuando no hay mensajes)
 */   
function hideEmptyState() {
    emptyState.classList.add("hidden");
}
/**
 * PREGUNTAS DE REFLEXIÓN (TODO7 - hideEmptyState):
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 * R: Se está utilizando el elemento emptyState, que representa el mensaje que aparece cuando no hay mensajes en el chat.
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 * R: El cambio ocurre cuando se agrega el primer mensaje al chat, generalmente después del evento submit del formulario.
 *
 * 3. ¿Qué nuevo elemento se crea?
 * R: No se crea ningún nuevo elemento del DOM en este TODO. Solo se modifica un elemento existente.
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 * R: No se inserta nada nuevo. Se modifica el elemento emptyState agregándole la clase 'hidden' dentro del DOM.
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 * R: Cada vez que se envía un mensaje, el estado vacío se oculta para que deje de mostrarse el mensaje de “no hay mensajes” cuando ya existen mensajes en el chat.
 */


// TODO8: Implementar función para mostrar el estado vacío
// Pista: Remueve la clase 'hidden' del elemento emptyState   

function showEmptyState() {
    emptyState.classList.remove("hidden");
}
/**
 * PREGUNTAS DE REFLEXIÓN (TODO8 - showEmptyState):
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 * R: Se está utilizando el elemento emptyState, que representa el mensaje que aparece cuando no hay mensajes en el chat.
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 * R: El cambio ocurre cuando el chat queda sin mensajes, por ejemplo si se elimina el último mensaje o no hay mensajes en el sistema.
 *
 * 3. ¿Qué nuevo elemento se crea?
 * R: No se crea ningún elemento nuevo del DOM en este TODO. Solo se manipula un elemento ya existente.
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 * R: No se inserta ningún elemento nuevo. Se modifica el elemento emptyState eliminando la clase 'hidden' para que vuelva a mostrarse en su ubicación original.
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 * R: Cada vez que se ejecuta esta función, vuelve a aparecer el mensaje de estado vacío indicando que no hay mensajes en el chat.
 */
    


// ============================================
// 3. CREACIÓN DE ELEMENTOS
// ============================================

/**
 * Crea un nuevo elemento de mensaje en el DOM
 * @param {string} userName - Nombre del usuario
 * @param {string} message - Contenido del mensaje
 */
const createMessageElement = (userName, message) => {
    // TODO9: Implementar la creación de un nuevo mensaje
    
    // PASO 1: Crear el contenedor principal del mensaje
    // Pista: document.createElement('div')
    // Asignar la clase 'message-card'

    const messageCard = document.createElement('div');
    messageCard.classList.add('message-card');
    
    // PASO 2: Crear la estructura HTML del mensaje
    // Puedes usar innerHTML con la siguiente estructura:
    /*
    <div class="message-card__header">
        <div class="message-card__user">
            <div class="message-card__avatar">[INICIALES]</div>
            <span class="message-card__username">[NOMBRE]</span>
        </div>
        <span class="message-card__timestamp">[FECHA]</span>
    </div>
    <div class="message-card__content">[MENSAJE]</div>
    */

    messageCard.innerHTML = `
    <div class="message-card__header">
        <div class="message-card__user">
            <div class="message-card__avatar">[INICIALES]</div>
            <span class="message-card__username">[NOMBRE]</span>
        </div>
        <span class="message-card__timestamp">[FECHA]</span>
    </div>
    <div class="message-card__content">[MENSAJE]</div>
    `;

    const avatarElement = messageCard.querySelector('.message-card__avatar');
    const usernameElement = messageCard.querySelector('.message-card__username');
    const timestampElement = messageCard.querySelector('.message-card__timestamp');
    const contentElement = messageCard.querySelector('.message-card__content');

    avatarElement.textContent = getInitials(userName);
    usernameElement.textContent = userName;
    timestampElement.textContent = getCurrentTimestamp();
    contentElement.textContent = message;

    // PASO 3: Insertar el nuevo elemento en el contenedor de mensajes
    // Pista: messagesContainer.appendChild(nuevoElemento)
    // O usar insertBefore para agregarlo al principio
    
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.insertBefore(messageCard, messagesContainer.firstChild);
    
    // PASO 4: Incrementar el contador de mensajes

    messageCount++;
    
    // PASO 5: Actualizar el contador visual

    const messageCountElement = document.getElementById('messageCount');
    messageCountElement.textContent = `Mensajes: ${messageCount}`;
    
    // PASO 6: Ocultar el estado vacío si está visible

    const emptyState = document.getElementById('emptyState');
    if (emptyState) {
        emptyState.style.display = 'none';
    }
}

/**
 * PREGUNTAS DE REFLEXIÓN:
 * 
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: El elemento div (contenedor principal del mensaje), con la clase 'message-card'. El elemento div (contenedor del header del mensaje), con la clase 'message-card__header'. El elemento div (contenedor del usuario), con la clase 'message-card__user'. El elemento div (avatar del usuario), con la clase 'message-card__avatar'. El elemento span (nombre del usuario), con la clase 'message-card__username'. El elemento span (timestamp del mensaje), con la clase 'message-card__timestamp'. El elemento div (contenido del mensaje), con la clase 'message-card__content'.
 * 
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: El evento 'submit' del formulario de envío de mensajes, que desencadena la función createMessageElement para crear y agregar un nuevo mensaje al contenedor de mensajes.
 * 
 * 3. ¿Qué nuevo elemento se crea?
 *    R: Un nuevo elemento div con la clase 'message-card'.
 * 
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: Se inserta dentro del contenedor de mensajes (messagesContainer).
 * 
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: Se agrega un nuevo mensaje al contenedor de mensajes y se actualiza el contador.
 */

// ============================================
// 4. MANEJO DE EVENTOS
// ============================================

/**
 * Maneja el evento de envío del formulario
 * @param {Event} event - Evento del formulario
 */
const handleFormSubmit = (event) => {
    // TODO10: Implementar el manejador del evento submit
    
    // PASO 1: Prevenir el comportamiento por defecto del formulario
    // Pista: event.preventDefault()

    event.preventDefault();
    
    // PASO 2: Validar el formulario
    // Si no es válido, detener la ejecución (return)

    const validForm = validateForm();
    if (!validForm) {
        return;
    }
    
    // PASO 3: Obtener los valores de los campos

    const userName = document.getElementById('userNameInput').value;
    const message = document.getElementById('messageInput').value;
    
    // PASO 4: Crear el nuevo elemento de mensaje
    // Llamar a createMessageElement con los valores obtenidos

    createMessageElement(userName, message);
    
    // PASO 5: Limpiar el formulario
    // Pista: messageForm.reset()

    const messageForm = document.getElementById('messageForm');
    messageForm.reset();
    
    // PASO 6: Limpiar los errores

    clearError();
    
    // PASO 7: Opcional - Enfocar el primer campo para facilitar agregar otro mensaje
    // Pista: userNameInput.focus()

    const userNameInput = document.getElementById('userName');
    userNameInput.focus();
}

/**
 * PREGUNTAS DE REFLEXIÓN:
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: Se está seleccionando el formulario con id 'messageForm' para manejar su evento de envío. Además, se seleccionan los campos de entrada para obtener sus valores y para enfocar el primer campo después de enviar el mensaje.
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: El evento de envío del formulario (submit).
 *
 * 3. ¿Qué nuevo elemento se crea?
 *    R: Se crea un nuevo elemento de mensaje.
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: Se inserta dentro del contenedor de mensajes.
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: Se agrega un nuevo mensaje a la lista de mensajes.
 */

/**
 * Limpia los errores cuando el usuario empieza a escribir
 */
const handleInputChange = () => {
    // TODO11: Implementar limpieza de errores al escribir

    // Esta función se ejecuta cuando el usuario escribe en un campo
    // Debe limpiar el error de ese campo específico

    event.preventDefault(); // Evitar el comportamiento predeterminado del evento

    const inputField = event.target; // Obtener el campo de entrada que se está editando

    clearError('inputField'); // Llamar a la función clearError con el campo específico
}

/**
 * PREGUNTAS DE REFLEXIÓN:
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: El elemento input en el que se ingresa el dato de texto, específicamente aquel en el que se genera el evento llamado por event.target.
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: El evento que provoca el cambio es el evento de entrada (input) o cambio (change) en el campo de texto, que se activa cada vez que el usuario escribe o modifica el contenido del campo.
 *
 * 3. ¿Qué nuevo elemento se crea?
 *    R: No se crea un nuevo elemento.
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: No se inserta un nuevo elemento.
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: Cada vez que se repite la acción de escribir en el campo de texto, se limpia el error asociado a ese campo específico, lo que mejora la experiencia del usuario al eliminar mensajes de error innecesarios mientras corrige su entrada.
 */

// ============================================
// 5. REGISTRO DE EVENTOS
// ============================================

/**
 * Aquí registramos todos los event listeners
 */

// TODO12: Registrar el evento 'submit' en el formulario
// Pista: messageForm.addEventListener('submit', handleFormSubmit);

messageForm.addEventListener('submit', handleFormSubmit);

/**
 * PREGUNTAS DE REFLEXIÓN TODO12:
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: Se está seleccionando el formulario con id 'messageForm' para manejar su evento de envío.
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: El evento de envío del formulario (submit).
 *
 * 3. ¿Qué nuevo elemento se crea?
 *    R: Se crea un nuevo elemento de mensaje.
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: El nuevo mensaje se inserta dentro del contenedor con id 'messagesContainer'.
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: Cada vez que se envía el formulario, se agrega un nuevo mensaje al contenedor, se incrementa el contador de mensajes, y si era el primer mensaje, se oculta el estado vacío. Además, el formulario se limpia para permitir ingresar un nuevo mensaje.
 */ 

// TODO13: Registrar eventos 'input' en los campos para limpiar errores al escribir
// Pista: userNameInput.addEventListener('input', handleInputChange);
// Pista: userMessageInput.addEventListener('input', handleInputChange);

userNameInput.addEventListener('input', handleInputChange);

userMessageInput.addEventListener('input', handleInputChange);

/**
 * PREGUNTAS DE REFLEXIÓN:
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: Se selecciona el formulario.
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: El ingreso o edición de caracteres en los campos del formulario
 *
 * 3. ¿Qué nuevo elemento se crea?
 *    R: No se crea un elemento nuevo
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: No se inserta un elemento nuevo
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: Se muestra una guía visual para los errores en los caracteres ingresados
 */ 

// ============================================
// 6. REFLEXIÓN Y DOCUMENTACIÓN
// ============================================

/**
 * PREGUNTAS DE REFLEXIÓN:
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R:
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R:
 *
 * 3. ¿Qué nuevo elemento se crea?
 *    R:
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R:
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R:
 */

// ============================================
// 7. INICIALIZACIÓN (OPCIONAL)
// ============================================

/**
 * Esta función se ejecuta cuando el DOM está completamente cargado
 */
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM completamente cargado");
    console.log("📝 Aplicación de registro de mensajes iniciada");

    // Aquí puedes agregar cualquier inicialización adicional
    // Por ejemplo, cargar mensajes guardados del localStorage
});

// ============================================
// 8. FUNCIONALIDADES ADICIONALES (BONUS)
// ============================================

/**
 * RETOS ADICIONALES OPCIONALES:
 *
 * 1. Agregar un botón para eliminar mensajes individuales
 * 2. Implementar localStorage para persistir los mensajes
 * 3. Agregar un contador de caracteres en el textarea
 * 4. Implementar un botón para limpiar todos los mensajes
 * 5. Agregar diferentes colores de avatar según el nombre del usuario
 * 6. Permitir editar mensajes existentes
 * 7. Agregar emojis o reacciones a los mensajes
 * 8. Implementar búsqueda/filtrado de mensajes
 */
