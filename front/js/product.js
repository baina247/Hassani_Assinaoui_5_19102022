//récupération de l'id
const productId =  new URL(window.location.href).searchParams.get("id");

//récupération des sélécteurs
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productColors = document.getElementById("colors");
let productImg = document.querySelector(".item__img");
let img = document.createElement("img");
    productImg.appendChild(img);

//récupération de l'article
getArticle();

async function getArticle() {
    await fetch("http://localhost:3000/api/products/" + productId)
   .then((response) => response.json())    
   .then(product => {
       img.setAttribute("src", product.imageUrl);
       img.setAttribute("alt", product.altTxt);    
       productTitle.innerHTML = product.name;
       productPrice.innerHTML = product.price;
       productDescription.innerHTML = product.description;
       document.title = product.name;

       for (let i=0; i < product.colors.length; i++) {
           let color = document.createElement("option");
           color.setAttribute("value", product.colors[i]);
           color.innerHTML = product.colors[i];
           productColors.appendChild(color);
       }  
   });          
}