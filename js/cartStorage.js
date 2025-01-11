
export let cart = JSON.parse(localStorage.getItem('cart')) || [] ;

export function saveStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


