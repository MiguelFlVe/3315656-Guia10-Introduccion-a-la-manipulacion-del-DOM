export function validateForm() {
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