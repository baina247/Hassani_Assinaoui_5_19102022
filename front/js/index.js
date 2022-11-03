import  { getAllProducts }  from  "./functions/api.js";

// aller chercher la liste des canapes via l'api
async function displayProducts(){
       const products = await getAllProducts();

//faire une boucle sur cette liste de canapé
        products.forEach( (product) => {
              
                        console.log(product)
                        const items = document.querySelector("#items")
                    //insertion élement "a"
                    let productLink = document.createElement("a");
                    //construire vers la apge produit
                    items.appendChild(productLink);
                    let productArticle = document.createElement("article");
                    productLink.href = `product.html?id=${product._id}`
                    productLink.appendChild(productArticle);
                    console.log(productLink)
        
                    //insertion élement "article"
                   
                    productLink.appendChild(productArticle);
        
                    //insertion de l'image
                    let productImg = document.createElement("img");
                    productArticle.appendChild(productImg);
                    productImg.src = product.imageUrl;
                    productImg.alt = product.altTxt;
        
                    //insertion titre "h3"
                    let productName = document.createElement("h3");
                    productArticle.appendChild(productName);
                    productName.classList.add("productName");
                    productName.innerHTML = product.name;
        
                    //insertion description "p"
                    let productDescription = document.createElement("p");
                    productArticle.appendChild(productName);
                    productDescription.classList.add("productName");
                    productDescription.innerHTML = product.description;
        
            });
//pour chaque canape creer une cart et remplir les données de la carte avec les données du produit 
}

displayProducts()
