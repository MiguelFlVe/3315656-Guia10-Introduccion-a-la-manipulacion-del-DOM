import {
    clearError,
    validateForm,
    createMessageElement
} from "../index.js";

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