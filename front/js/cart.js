import { getProduct, sendForm } from "./functions/api.js";
import {getCart, deleteItem, setCart} from "./functions/localstorage.js"

//récupération de l'article
initDisplayCart();

async function initDisplayCart() {
    let localStorageProduct = await  getCart()
    if ( Object.keys(localStorageProduct).length === 0) {

        const cartTitle = document.querySelector("h1");
        const cartSection = document.querySelector(".cart");
    
        cartTitle.innerHTML = "Votre panier est vide !";
        cartSection.style.display = "none";
    
    } else {
        console.log(localStorageProduct)
        const canapKeys = Object.keys(localStorageProduct)
      
        for (let i=0; i < canapKeys.length; i++) {
            let section = document.querySelector("#cart__items")

            const canapId = canapKeys[i]

            const canapInfo = await getProduct(canapId)

            const colors = Object.keys(localStorageProduct[canapId])

            colors.forEach(async function (color) {
                let localStorageProduct2 = await  getCart()

            const quantity = localStorageProduct2[canapId][color]

            // Création de la balise "article" et insertion dans la section
            let productArticle = document.createElement("article");
            section.appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute("data-id", canapId);
            productArticle.setAttribute("data-color", color);
    
            // Insertion de l'élément "div" pour l'image produit
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";
    
            // Insertion de l'image
            let img = document.createElement("img");
            img.setAttribute("src", canapInfo.imageUrl);
            img.setAttribute("alt", canapInfo.altTxt); 
            productDivImg.appendChild(img);
            
            // Insertion de l'élément "div" pour la description produit
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";
    
            // Insertion de l'élément "div"
            let productItemContentTitlePrice = document.createElement("div");
            productItemContent.appendChild(productItemContentTitlePrice);
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";
            
            // Insertion du titre h2
            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = canapInfo.name;
    
            // Insertion de la couleur
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = color;
            productColor.style.fontSize = "20px";
    
            // Insertion du prix
            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = canapInfo.price  + "€";
    
            // Insertion de l'élément "div"
            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";
    
            // Insertion de l'élément "div"
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            
            // Insertion de "Qty : "
            let productQty = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQty);
            productQty.innerHTML = "Qty : ";

            // Insertion de la quantité
            let productQuantity = document.createElement("input");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = quantity;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
            productQuantity.addEventListener("change", async (e) => {

                //on va rechercher l'id de l'article à modifier
                const idToModify = e.currentTarget.closest('article').dataset.id
                //on va rechercher la couleur de l'article à modifier
                const colorToModify = e.currentTarget.closest('article').dataset.color
                //valeur de la nouvelle quantité
                let newQuantity =  parseInt(e.target.value)
                console.log(newQuantity)
                //Ajout de conditions de sécurité pour limité la quantité minimum et maximum qu'on puisse entrer en étant dans le panier.
                if(newQuantity < 1 ){
                    newQuantity = 1
                    e.currentTarget.value = 1
                }
                if(newQuantity > 100 ){
                    newQuantity = 100
                    e.currentTarget.value = 100
                }
                //contenue du panier
                const cart = await  getCart()

                //Nouvelle valeur à actualiser
                cart[idToModify][colorToModify] = newQuantity

                //actualisation des nouvelles valeurs
                setCart(cart)

                //actualisation des données après changement
                calculTotal()
            })
    
            // Insertion de l'élément "div"
            let productItemContentSettingsRemove = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsRemove);
            productItemContentSettingsRemove.className = "cart__item__content__settings__remove";
    
            // Insertion de "p" supprimer
            let productDeleted = document.createElement("p");
            productItemContentSettingsRemove.appendChild(productDeleted);
            productDeleted.className = "deleteItem";
            productDeleted.textContent = "Supprimer";
            productDeleted.addEventListener("click", async (e) => {
                e.preventDefault;
                //on va rechercher l'id de l'article à supprimer
                const idToDelete = e.currentTarget.closest('article').dataset.id
                //on va rechercher la couleur de l'article à supprimer
                const colorToDelete = e.currentTarget.closest('article').dataset.color
                const cart = await  getCart()
                
                //supprimer l'element du panier et la ligne dans le html
                delete cart[idToDelete][colorToDelete]
                if (Object.keys(cart[idToDelete]).length === 0){
                    delete cart[idToDelete]
                }
                // envoyer les nouvelles données dans le localStorage
                setCart(cart);               
    
                // avertir de la suppression et recharger la page
                alert('Votre article a bien été supprimé.');
                
                //Rapide rechargement de la page
                return location.reload();
 
            })

            });
        }
        calculTotal()
    }
}
//Fonction de calcule du total de produit et du prix
async function calculTotal() {
    let totalQuantity = 0;
    let totalPrice = 0;
    const cart = getCart();

    //Parcourir les produits du panier
    for (const productId in cart) {
        //Obtenir les informations sur le produit 
        const product = await getProduct(productId);
        //Parcourir les couleurs des produits dans le panier
        for (const color in cart[productId]) {
            //calculer la quantité totale et le prix total du produit
            totalQuantity += cart[productId][color];
            totalPrice += cart[productId][color] * product.price;
        }
    }
    //Mettre à jour la quantité totale et le prix dans l'interface utilisateur
    document.getElementById("totalQuantity").textContent = totalQuantity;
    document.getElementById("totalPrice").textContent = totalPrice;
}

//-----------------------------------------------------------------------------------
// 4) Formulaire avant validation de la commande
//-----------------------------------------------------------------------------------

// Form Validation Regex / Expression régulière de validation de formulaire
const form = document.querySelector('.cart__order__form');
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const cityInput = document.querySelector('#city');
const addressInput = document.querySelector('#address');
const emailInput = document.querySelector('#email');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const city = cityInput.value;
  const address = addressInput.value;
  const email = emailInput.value;

  const cart = await getCart();

  if (validFirstName(firstName) && validLastName(lastName) && validAddress(address) && validCity(city) && validEmail(email)) {
    // Collect form data and order / Collecter les données du formulaire et commander
    const data = {
      contact: {
        firstName,
        lastName,
        address,
        city,
        email,
      },
      products: Object.keys(cart),
    };

    // Send data to API / Envoi de donnée dans l'API
    const result = await sendForm(data);

    // Redirect to confirmation page with order ID / Rediriger vers la page de confirmation avec l'ID de commande
    if (result.orderId) {
      // Clear cart / Vider le panier
      deleteItem();
      window.location.href = `/front/html/confirmation.html?confirmation=${result.orderId}`;
    } else {
      alert('Une erreur est survenue lors de la soumission de votre commande !');
    }
  }
});

//Expression regulières
const regExEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
const regExFirstNameLastNameCity = /^[a-zA-Z ,.'-]+$/;
const regExAddress = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;

//validation du prénom
const validFirstName = function() {
    const inputFirstName = document.querySelector("#firstName")
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    let result = true;

    if (regExFirstNameLastNameCity.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
        result = false
    }
    return result
};

//validation du nom
const validLastName = function() {
    const inputLastName = document.querySelector("#lastName")
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    let result = true;

    if (regExFirstNameLastNameCity.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
        result = false
    }
    return result
};

//validation de l'adresse
const validAddress = function() {
    const inputAddress = document.querySelector("#address")
    let addressErrorMsg = inputAddress.nextElementSibling;
    let result = true;

    if (regExAddress.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.';
        result =  false
    }
    return result
};

//validation de la ville
const validCity = function() {
    const inputCity =  document.querySelector("#city")
    let cityErrorMsg = inputCity.nextElementSibling;
    let result = true;

    if (regExFirstNameLastNameCity.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville.';
        result =  false
    }
    return result
};

//validation de l'email
const validEmail = function() {
    const inputEmail = document.querySelector("#email")
    let emailErrorMsg = inputEmail.nextElementSibling;
    let result = true;

    if (regExEmail.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner votre adresse email.';
        result =  false
    }
    return result
};
