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

export { createMessageElement };