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
