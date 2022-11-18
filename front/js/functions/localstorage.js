const cartName = "cart"

export function getCart(){
    let cart = localStorage.getItem(cartName) || "{}"
    return JSON.parse(cart)
}

export function setCart(cart){
    localStorage.setItem(cartName, JSON.stringify(cart))
}