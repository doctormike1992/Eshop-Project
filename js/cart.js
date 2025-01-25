import { cart, saveStorage } from "./cartStorage.js";
import { orders, saveOrders } from "./ordersStorage.js";

checkoutButton();
displayCart();
totalAmount();

/*===========================Display the Cart===========================*/
function displayCart() {
  cart.forEach((product) => {
    renderCart(product);
  });
}
/*===========================elete button===========================*/
function renderCart(product) {
  const cartContainer = document.querySelector(".products");

  const container = document.createElement("div");
  const cartDiv = document.createElement("div");
  const priceDiv = document.createElement("div");
  const quantityDiv = document.createElement("div");
  const taxDiv = document.createElement("div");
  const totalDiv = document.createElement("div");
  const deleteCartButton = document.createElement("button");
  const cartImage = document.createElement("img");
  const cartName = document.createElement("h3");
  const cartPrevPrice = document.createElement("p");
  const cartPrice = document.createElement("p");
  const cartMinus = document.createElement("button");
  const cartNum = document.createElement("p");
  const cartPlus = document.createElement("button");
  const cartTax = document.createElement("p");
  const cartTotal = document.createElement("p");

  cartImage.src = product.image;
  deleteCartButton.innerHTML = `<i class="fa-solid fa-x"></i>`;
  cartName.textContent = product.name;
  cartPrice.textContent = `$${product.price.toFixed(2)}`;
  cartMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';
  cartNum.textContent = `${product.quantity}`;
  cartPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';
  if (product.previusPrice) {
    cartPrevPrice.textContent = `$${product.previusPrice.toFixed(2)}`;
  }
  cartTax.textContent = "10%";
  cartTotal.textContent = `$${(product.price * product.quantity * 1.1).toFixed(
    2
  )}`;

  container.classList.add("productContainer");
  cartImage.classList.add("image");
  cartName.classList.add("name");
  deleteCartButton.classList.add("deleteButton");
  cartPrice.classList.add("price");
  cartDiv.classList.add("productDiv");
  cartMinus.classList.add("quantityMinus");
  cartNum.classList.add("quantityNum");
  cartPlus.classList.add("quantityPlus");
  priceDiv.classList.add("priceDiv");
  quantityDiv.classList.add("quantityDiv");
  taxDiv.classList.add("taxDiv");
  cartPrevPrice.classList.add("prevPrice");
  cartTax.classList.add("tax");
  totalDiv.classList.add("totalDiv");
  cartTotal.classList.add("total");

  cartDiv.appendChild(deleteCartButton);
  cartDiv.appendChild(cartImage);
  cartDiv.appendChild(cartName);
  taxDiv.appendChild(cartTax);
  if (product.previusPrice) {
    priceDiv.appendChild(cartPrevPrice);
  }

  priceDiv.appendChild(cartPrice);
  quantityDiv.appendChild(cartMinus);
  quantityDiv.appendChild(cartNum);
  quantityDiv.appendChild(cartPlus);
  totalDiv.appendChild(cartTotal);
  container.appendChild(cartDiv);
  container.appendChild(priceDiv);
  container.appendChild(quantityDiv);
  container.appendChild(taxDiv);
  container.appendChild(totalDiv);

  cartContainer.appendChild(container);

  deleteButton(deleteCartButton, product, cartContainer);
  Plus(cartPlus, cartNum, cartContainer, product);
  Minus(cartMinus, cartNum, cartContainer, product);
}
/*===========================Delete button===========================*/
function deleteButton(deleteCartButton, product, cartContainer) {
  deleteCartButton.addEventListener("click", () => {
    let newCart = [];
    newCart = cart.filter((item) => {
      return item.name !== product.name;
    });
    cart.length = 0;
    cart.push(...newCart);
    saveStorage();
    cartContainer.innerHTML = "";
    displayCart();
    totalAmount();
  });
}
/*===========================Quantity buttons===========================*/

function Plus(cartPlus, cartNum, cartContainer, product) {
  cartPlus.addEventListener("click", () => {
    let quantityNumber = Number(cartNum.textContent);
    if (cartNum.textContent >= 99) {
      return;
    } else {
      cartNum.textContent = quantityNumber + 1;
      product.quantity = Number(cartNum.textContent);
      saveStorage();
      cartContainer.innerHTML = "";
      displayCart();
      totalAmount();
    }
  });
}
function Minus(cartMinus, cartNum, cartContainer, product) {
  cartMinus.addEventListener("click", () => {
    let quantityNumber = Number(cartNum.textContent);
    if (quantityNumber <= 1) {
      return;
    } else {
      cartNum.textContent = quantityNumber - 1;
      product.quantity = Number(cartNum.textContent);
      saveStorage();
      cartContainer.innerHTML = "";
      displayCart();
      totalAmount();
    }
  });
}

/*=========================== Total function===========================*/
function totalAmount() {
  let totalPrice = 0;
  const totalSpan = document.querySelector(".total-price");
  const totalAmountDiv = document.querySelector(".totalAmount");
  if (cart.length === 0) {
    totalAmountDiv.style.display = "none";
    return;
  }
  const total = document.querySelectorAll(".total");
  total.forEach((product) => {
    totalPrice += Number(product.textContent.slice(1));
  });
  totalSpan.innerHTML = `$${totalPrice.toFixed(2)}`;
}

/*===========================Checkout functions===========================*/

function checkoutButton() {
  const checkoutButton = document.querySelector(".finish-order-button");
  if (cart.length === 0) {
    checkoutButton.style.display = "none";
  }
  checkoutButton.addEventListener("click", () => {
    cart.forEach((cartItem) => {
      const existing = orders.find((order) => order.name === cartItem.name);
      if (existing) {
        existing.quantity += cartItem.quantity;
      } else {
        orders.push({ ...cartItem });
      }
    });
    saveOrders();
    clearCart();
    window.location.href = "orders.html";
  });
}

function clearCart() {
  cart.length = 0;
  saveStorage();
  const cartContainer = document.querySelector(".products");
  cartContainer.innerHTML = "";
  checkoutButton();
  displayCart();
  totalAmount();
}
