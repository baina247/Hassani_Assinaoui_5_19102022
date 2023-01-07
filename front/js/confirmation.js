const id = new URL(window.location.href).searchParams.get("confirmation");
console.log(id);

const orderId = document.getElementById("orderId");
orderId.innerHTML = id;

localStorage.clear();