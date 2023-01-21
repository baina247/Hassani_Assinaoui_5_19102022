let messageDisplayed = false;

function getConfirmationId() {
  if (messageDisplayed) {
    return;
  }
  messageDisplayed = true;
  const url = new URL(window.location.href);
  return url.searchParams.get("confirmation");
}

function getConfirmationId() {
    const url = new URL(window.location.href);
    return url.searchParams.get("confirmation");
  }
  
  const id = getConfirmationId();
  console.log(id);
  
  const orderId = document.getElementById("orderId");
  if (orderId) {
    orderId.textContent = id;
  } else {
    console.error("Erreur : L'élément orderId introuvable sur la page.");
  }
  //Message de remerciement a la clientele
  const message = document.createElement("p");
  message.textContent = "Merci pour votre achat !";
  
  const confirmation = document.querySelector(".confirmation");
  confirmation.appendChild(message);

  //sessionStorage.clear() si on souhaite uniquement effacer les données de la session en cours sinon l'usage de localStorage.clear()
  sessionStorage.clear();
  