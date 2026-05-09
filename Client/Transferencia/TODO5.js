export function getInitials(name) {
    const words = name.trim().split(" ");

    // Si solo hay una palabra
    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    // Tomar la primera letra de cada palabra
    const initials = words[0][0] + words[1][0];

    return initials.toUpperCase();
}

/**
 * PREGUNTAS DE REFLEXIÓN (TODO5 - getInitials):
 *
 * 1. ¿Qué elemento del DOM estás seleccionando?
 * R: En este TODO no se selecciona ningún elemento del DOM, ya que solo se trabaja con una función que recibe un valor (string).
 *
 * 2. ¿Qué evento provoca el cambio en la página?
 * R: No hay un evento del DOM directamente en este TODO. La función se ejecuta cuando se llama desde otra parte del código, por ejemplo al crear un mensaje.
 *
 * 3. ¿Qué nuevo elemento se crea?
 * R: No se crea un elemento del DOM en este TODO. Solo se genera un string con las iniciales del nombre del usuario.
 *
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 * R: No se inserta directamente en el DOM aquí. El resultado (iniciales) se usa después al crear el avatar dentro del mensaje en el DOM.
 *
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 * R: Cada vez que se ejecuta la función, se generan las iniciales del nombre ingresado y estas se muestran en el avatar del mensaje dentro del chat.
 */