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
    const quantityChoice = document.querySelector("#quantity").value;

    if (quantityChoice > 0 && quantityChoice <=100 && quantityChoice != 0 && colorChoice != 0) { 
        let cart = getCart()
        //on verifie si le produit existe dans le panier
        if( productId in cart){
            //verifier si la couleur existe dans le panier
            //elle existe on incremente la valeur de la quantité


            //si elle n'existe pas, on crée cette couleur avec sa quantité
            cart[productId][colorChoice]= quantityChoice
        }//le canapé n'existe pas dans le panier
        else{
        
            const color = document.querySelector("#colors").value;
            const quantitySelected = document.querySelector("#quantity").value;
            
            cart[productId] = {
                [color]: quantitySelected
            }
        
         
        }
        setCart(cart)
        
        alert("Le produit est dans votre panier !");  
       /*  if (localStorage.getItem("cart")) {
    
            let productCart = JSON.parse(localStorage.getItem("cart"));
            console.log(productCart);

            let colorKanap = document.querySelector("#colors").value;
            let qtyKanap = document.querySelector("#quantity").value;

            const resultFind = productCart.find(
                (el) => el.idKanap === productId && el.colorKanap === colorKanap);

                //Si le produit est déjà dans le panier
                console.log("result find est egal a :");
                console.log(resultFind);
                console.log("fin result find");

                if (resultFind) {
                    console.log("resultfind kanap = " + resultFind.qtyKanap);
                    console.log("qtykanap = " + qtyKanap);
                    let newQuantite = parseInt(qtyKanap) + parseInt(resultFind.qtyKanap);
                    console.log("newQtt est egal a : " + newQuantite);
                    resultFind.qtyKanap = newQuantite;
                    localStorage.setItem("cart", JSON.stringify(productCart));
                    console.log("productCart egal :");
                    console.log(productCart);
                    console.log("fin productCart");

                //Si le produit n'est pas dans le panier
                } else {
                    
                    let productCart = JSON.parse(localStorage.getItem("cart"));

                    let idKanap = productId;
                    let nameKanap = document.querySelector("#title").textContent;
                    let colorKanap = document.querySelector("#colors").value;
                    let qtyKanap = document.querySelector("#quantity").value;
                    let imgKanap = img.src; 
                    let altImg = img.alt;
                    let priceKanap = document.querySelector("#price").textContent;
                    
                    console.log(img);
                    console.log(idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap);
                
                    let productCartObj = {
                        idKanap : productId,
                        nameKanap : nameKanap,
                        colorKanap : colorKanap,
                        qtyKanap  : qtyKanap,
                        imgKanap : imgKanap,
                        altImg : altImg,
                        priceKanap : priceKanap
                    };
                
                    productCart.push(productCartObj);
                
                    let objCart = JSON.stringify(productCart);
                    localStorage.setItem("cart", objCart);
                
                    alert("Dans votre panier !");
                }

        } else {

            let productCart = [];

            let idKanap = productId;
            let nameKanap = document.querySelector("#title").textContent;
            let colorKanap = document.querySelector("#colors").value;
            let qtyKanap = document.querySelector("#quantity").value;
            let imgKanap = img.src; 
            let altImg = img.alt;
            let priceKanap = document.querySelector("#price").textContent;
            
            console.log(img);
            console.log(idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap);
        
            let productCartObj = {
                idKanap : productId,
                nameKanap : nameKanap,
                colorKanap : colorKanap,
                qtyKanap  : qtyKanap,
                imgKanap : imgKanap,
                altImg : altImg,
                priceKanap : priceKanap,
            };
        
            productCart.push(productCartObj);
        
            let objCart = JSON.stringify(productCart);
            localStorage.setItem("cart", objCart);
        
            alert("Dans votre panier !");    
        } */
    }else{
        alert ("veuillez renseigner tous les champs")
    }
}

/**
 * 
cart = {
    1432432 : {
        "red": 3
        "blue": 2
    },
    2343242:{
        "green":2
    }
}





 */