import { clearError } from '../index.js';

const handleInputChange = () => {
    // TODO11: Implementar limpieza de errores al escribir

    // Esta función se ejecuta cuando el usuario escribe en un campo
    // Debe limpiar el error de ese campo específico

    event.preventDefault(); // Evitar el comportamiento predeterminado del evento

    const inputField = event.target; // Obtener el campo de entrada que se está editando

    clearError('inputField'); // Llamar a la función clearError con el campo específico
}

/**
 * PREGUNTAS DE REFLEXIÓN:
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: El elemento input en el que se ingresa el dato de texto, específicamente aquel en el que se genera el evento llamado por event.target.
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: El evento que provoca el cambio es el evento de entrada (input) o cambio (change) en el campo de texto, que se activa cada vez que el usuario escribe o modifica el contenido del campo.
 *
 * 3. ¿Qué nuevo elemento se crea?
 *    R: No se crea un nuevo elemento.
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: No se inserta un nuevo elemento.
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: Cada vez que se repite la acción de escribir en el campo de texto, se limpia el error asociado a ese campo específico, lo que mejora la experiencia del usuario al eliminar mensajes de error innecesarios mientras corrige su entrada.
 */

export { handleInputChange };