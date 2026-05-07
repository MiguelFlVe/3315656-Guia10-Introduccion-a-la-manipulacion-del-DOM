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