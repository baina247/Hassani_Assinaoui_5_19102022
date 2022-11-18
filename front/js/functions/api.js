const baseUrl = "http://localhost:3000/api/products/"

export async function getAllProducts(){
    let products = await fetch('http://localhost:3000/api/products/')
    .then((response) => response.json());
 
    return products;
}
export async function getProduct(id){
    const product = await fetch("http://localhost:3000/api/products/" + id)
    .then((response) => response.json())  
      
    return product
}
