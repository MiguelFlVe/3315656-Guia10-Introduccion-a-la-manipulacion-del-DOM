export function updateMessageCount() {
    const count = messages.length;

    messageCount.textContent = `${count} ${
        count === 1 ? "mensaje" : "mensajes"
    }`;
}