const baseUrl = "http://localhost:3000/api/products/"

export async function getAllProducts() {
    try {
        let products = await fetch("http://localhost:3000/api/products/")
            .then((response) => response.json());

        return products;

    } catch (err) {
        console.error("Erreur lors du chargement de l'API pour récupérer les produits:", err);
    }
}

export async function getProduct(id) {
    try {
        const product = await fetch("http://localhost:3000/api/products/" + id)
            .then((response) => response.json())

        return product

    } catch (err) {
        console.error("Erreur lors du chargement de l'API pour récupérer les ID:", err);
    }
}

export async function sendForm(data) {
    try {
        //envoyer les données en method POST
        return await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(result => result.json())

    } catch (err) {
        console.error("Erreur lors du chargement de l'API pour récupérer la commande:", err);
    }
}