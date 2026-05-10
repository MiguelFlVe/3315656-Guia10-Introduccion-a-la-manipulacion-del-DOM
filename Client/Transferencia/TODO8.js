export function showEmptyState() {
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