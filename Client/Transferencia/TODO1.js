export function isValidInput(value) {
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