export function updateMessageCount() {
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