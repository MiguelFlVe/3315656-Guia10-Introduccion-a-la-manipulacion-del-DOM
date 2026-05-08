import { clearError } from '../index.js';

const handleInputChange = () => {
    // TODO11: Implementar limpieza de errores al escribir

    // Esta función se ejecuta cuando el usuario escribe en un campo
    // Debe limpiar el error de ese campo específico

    event.preventDefault(); // Evitar el comportamiento predeterminado del evento

    const inputField = event.target; // Obtener el campo de entrada que se está editando

    clearError('inputField'); // Llamar a la función clearError con el campo específico
}

export { handleInputChange };