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

export async function sendForm(data){
    //envoyer les données en method POST
  return  await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { 
        Accept: "application/json", 
        "Content-Type": "application/json", 
        },
        body: JSON.stringify(data)
})
.then(result => result.json())
}