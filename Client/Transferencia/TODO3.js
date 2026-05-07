export function clearError(errorElement) {
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