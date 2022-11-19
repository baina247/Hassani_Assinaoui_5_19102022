import { getProduct } from "./functions/api.js";
import { getCart, setCart } from "./functions/localstorage.js";
//récupération de l'id
const productId =  new URL(window.location.href).searchParams.get("id");


//récupération de l'article
displayProduct(productId);

async function displayProduct(id) {
    //récupération des sélécteurs
    let productTitle = document.getElementById("title");
    let productPrice = document.getElementById("price");
    let productDescription = document.getElementById("description");
    let productColors = document.getElementById("colors");
    let productImg = document.querySelector(".item__img");
    let img = document.createElement("img");
    productImg.appendChild(img);
    const product = await getProduct(id)

    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);    
    productTitle.innerHTML = product.name;
    productPrice.innerHTML = product.price;
    productDescription.innerHTML = product.description;
    document.title = product.name;

    product.colors.forEach(color =>{
        let option = document.createElement("option");
        option.setAttribute("value", color);
        option.innerHTML = color;
        productColors.appendChild(option);
    })
     
         
}

// Ajouté un article au panier
let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);

function addToCart() {

    const colorChoice = document.querySelector("#colors").value;
    const quantityChoice = parseInt(document.querySelector("#quantity").value);

    if (quantityChoice > 0 && quantityChoice <=100 && quantityChoice != 0 && colorChoice != 0) { 
        let cart = getCart()
        //on verifie si le produit existe dans le panier
        if( productId in cart){
            //verifier si la couleur existe dans le panier
            if(colorChoice in  cart[productId]){
                 //elle existe on incremente la valeur de la quantité
                 cart[productId][colorChoice] +=  quantityChoice
            }else{
                //si elle n'existe pas, on crée cette couleur avec sa quantité
                cart[productId][colorChoice] = quantityChoice
            }
        }//le canapé n'existe pas dans le panier
        else{

            cart[productId] = {
                [colorChoice]: quantityChoice
            }
        }
        setCart(cart)
        
        alert("Le produit est dans votre panier !");  
       
    }else{
        alert ("Veuillez renseigner tous les champs !")
    }
}

/**
 * 
cart = {
    1432432 : {
        "red": 3 + 2 
        "blue": 2
    },
    2343242:{
        "green":2
    }
}





 */