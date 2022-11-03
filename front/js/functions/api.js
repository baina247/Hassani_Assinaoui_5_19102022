const baseUrl = "http://localhost:3000/api/products/"

export function getAllProducts(){
    //recupérer les produits

    return products
}
export function getProduct(){

    //recupérer les produits

    return products
}

async function getAllProducts(){
    let products = await fetch('http://localhost:3000/api/products/');
    console.log("Produits récupérés !")
    return products.json();
}

async function getProduct(){
    let result = await getProduct()
    .then( (products) => {
        for (let i=0; i < products.length; i++) {
            
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
            productImg.src = products[i].imageUrl;
            productImg.alt = products[i].altTxt;

            //insertion titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = products[i].name;

            //insertion description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productName);
            productDescription.classList.add("productName");
            productDescription.innerHTML = products[i].description;
        }
    });
    console.log("Produits crées !")
}