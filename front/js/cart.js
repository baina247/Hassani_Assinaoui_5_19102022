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
            // let productImg = document.querySelector(".item__img");
            let img = document.createElement("img");
            img.setAttribute("src", canapInfo.imageUrl);
            img.setAttribute("alt", canapInfo.altTxt); 
            productDivImg.appendChild(img);
            // productImg.alt = localStorageProduct.altImgProduit;
            
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
                //sécurité sur la quantité de produit mini et maxi autorisé
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
            productDeleted.innerHTML = "Supprimer";
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
/**
 * function de calcul de total du panier
 */
async function calculTotal(){
    let totalQuantities = 0
    let totalPrice = 0
    const cart = Object.entries(getCart())

    //récupérer le panier
    for (const product of cart){
   
       const productId = product[0]
       const quantities = Object.values(product[1])
        //reduce methode /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
        const initialValue = 0;
        const totalQuantity = quantities.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
        );

        console.log(totalQuantity)

        const canapInfo = await getProduct(productId)
        const price = canapInfo.price

            console.log(price)

        totalPrice += price * totalQuantity
        totalQuantities += totalQuantity
    }
       console.log(totalPrice)
       console.log(totalQuantities)
    
    //on va afficher le total en quantité et en prix   
   document.getElementById("totalQuantity").textContent = totalQuantities;
   document.getElementById("totalPrice").textContent = totalPrice;
}

//-----------------------------------------------------------------------------------
// 4) Formulaire avant validation de la commande
//-----------------------------------------------------------------------------------

    //formulaire regex
    const form = document.querySelector(".cart__order__form")
    
    form.addEventListener("submit", async function(event){
        const firstName = document.querySelector("#firstName").value
        const lastName = document.querySelector("#lastName").value
        const city = document.querySelector("#city").value
        const address = document.querySelector("#address").value
        const email = document.querySelector("#email").value
        event.preventDefault()

        const cart = await getCart()

        if(validFirstName() && validLastName() && validAddress() && validCity() && validEmail()){
            //récupérer les données du formulaire + la commande

            // const data =  construction de la data
            const data = {
                contact: {
                    firstName,
                    lastName,
                    address,
                    city,
                    email,
                }, 
                products:Object.keys(cart),
            };

            //traiter les donners et les envoyer à l'api
            const result = await  sendForm(data)

            //redirection vers la page de redirection avec l'id de la commande
            if(result.orderId != null){

                //vider le panier
                deleteItem()
                
                //redirection vers la page confirmation avec l'orderId en parametre d(url)
                window.location.href = `/front/html/confirmation.html?confirmation=${result.orderId}`;

            }else{
                alert ("Une erreur s'est produite lors de l'envoi de votre commande !")
            }
        }
    })

    //Expression regulières
    let regExEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let regExFirstNameLastNameCity = new RegExp("^[a-zA-Z ,.'-]+$");
    let regExAddress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

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
