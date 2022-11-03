const baseUrl = "http://localhost:3000/api/products/"

export async function getAllProducts(){
    let products = await fetch('http://localhost:3000/api/products/')
    .then((response) => response.json());
 
    return products;
}
export async function getProduct(id){

    //recupérer les produits
    let result = await getProducts()
    .then( (product) => {
        for (let i=0; i < product.length; i++) {

            //insertion élement "a"
            let productLink = document.createElement("a");
            document.querySelector("items").appendChild(productLink);
            productLink.href.appendChild(productArticle);

            //insertion élement "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            //insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = product[i].imageUrl;
            productImg.alt = product[i].altTxt;

            //insertion titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = product[i].name;

            //insertion description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productName);
            productDescription.classList.add("productName");
            productDescription.innerHTML = product[i].description;
        }
    });
    console.log("Produits crées !")
}
