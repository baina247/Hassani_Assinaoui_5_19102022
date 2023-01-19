const cartName = "cart";

// Obtenir le panier du stockage local
export function getCart() {
    try {
        // Vérifier si le panier existe dans le stockage local
        const cart = localStorage.getItem(cartName);
        // Si le panier existe, analysez-le en tant que JSON et renvoyez-le
        return cart ? JSON.parse(cart) : {};
    } catch(err) {
        console.error("Erreur lors de l'obtention du panier à partir du stockage local:", err);
        return {};
    }
}

// Définir le panier dans le stockage local
export function setCart(cart) {
    try {
        // Stringifiez l'objet du panier et placez-le dans le stockage local
        localStorage.setItem(cartName, JSON.stringify(cart));
    } catch(err) {
        console.error("Erreur lors de la configuration du panier dans le stockage local:", err);
    }
}

// Supprimer le panier du stockage local
export function deleteItem() {
    try {
        localStorage.removeItem(cartName);
    } catch(err) {
        console.error("Erreur lors de la suppression du panier du stockage local:", err);
    }
}
