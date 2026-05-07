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

export { createMessageElement };