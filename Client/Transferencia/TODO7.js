export function hideEmptyState() {
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