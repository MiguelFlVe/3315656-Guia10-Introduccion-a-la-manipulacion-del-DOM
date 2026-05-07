export function showError(errorElement, message) {
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
