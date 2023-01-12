const cartName = "cart"
//création d'un object dans le panier
export function getCart(){
    let cart = localStorage.getItem(cartName) || "{}"
    return JSON.parse(cart)
}
//Affichage du nouveau contenue du panier
export function setCart(cart){
    localStorage.setItem(cartName, JSON.stringify(cart))
}
//Suppression d'un article dans le panier
export function deleteItem(){
    localStorage.removeItem(cartName)
}