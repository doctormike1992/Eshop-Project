import { cart, saveStorage } from "./cartStorage.js";
import { orders, saveOrders } from "./ordersStorage.js";

checkoutButton();
displayCart();
Cost();
totalPlusTax();
tax();

/*===========================Display the Cart===========================*/
function displayCart() {
  if (cart.length === 0) {
    const container = document.getElementById("items");
    container.innerHTML = "Your cart is empty";
    container.style.color = "red";
    return;
  }
  cart.forEach((product) => {
    renderCart(product);
  });
}
/*===========================elete button===========================*/
function renderCart(product) {
  const container = document.getElementById("items");
  const cartDiv = document.createElement("div");
  const cartImage = document.createElement("img");
  const cartName = document.createElement("p");
  const cartPrice = document.createElement("p");
  const cartMinus = document.createElement("button");
  const cartNum = document.createElement("span");
  const cartPlus = document.createElement("button");
  const cartSelector = document.createElement("div");
  const cartChange = document.createElement("button");
  const cartDelete = document.createElement("button");
  const cartSave = document.createElement("button");
  const imageContainer = document.createElement("div");
  const cartExtra = document.createElement("div");

  cartImage.src = product.image;
  cartName.textContent = product.name;
  cartPrice.textContent = `${product.quantity} x $${product.price.toFixed(2)}`;
  cartMinus.textContent = "-";
  cartNum.textContent = `${product.quantity}`;
  cartPlus.textContent = "+";
  cartChange.textContent = "Change";
  cartDelete.textContent = "Delete";
  cartSave.textContent = "Save";

  cartImage.classList.add("image");
  cartName.classList.add("name");
  cartPrice.classList.add("price");
  cartDiv.classList.add("productDiv");
  cartSelector.classList.add("quantitySelector");
  cartMinus.classList.add("quantityMinus");
  cartNum.classList.add("quantityNum");
  cartPlus.classList.add("quantityPlus");
  cartDelete.classList.add("deleteItem");
  cartChange.classList.add("changeQuantity");
  cartSave.classList.add("saveQuantity");
  imageContainer.classList.add("imageContainer");
  cartExtra.classList.add("cartExtra");

  cartDiv.appendChild(imageContainer);
  imageContainer.appendChild(cartImage);
  cartSelector.appendChild(cartMinus);
  cartSelector.appendChild(cartNum);
  cartSelector.appendChild(cartPlus);
  container.appendChild(cartDiv);
  cartDiv.appendChild(cartExtra);
  cartExtra.appendChild(cartName);
  cartExtra.appendChild(cartPrice);
  cartExtra.appendChild(cartChange);
  cartExtra.appendChild(cartSave);
  cartExtra.appendChild(cartSelector);
  cartExtra.appendChild(cartDelete);

  deleteButton(cartDelete, product, container);
  Plus(cartPlus, cartNum);
  Minus(cartMinus, cartNum);
  changeQuantity(cartSave, product, cartNum, container);
  changeButton(cartChange, cartSelector, cartSave);
}
/*===========================Delete button===========================*/
function deleteButton(cartDelete, product, container) {
  cartDelete.addEventListener("click", () => {
    let newCart = [];
    newCart = cart.filter((item) => {
      return item.name !== product.name;
    });
    cart.length = 0;
    cart.push(...newCart);
    saveStorage();
    container.innerHTML = "";
    displayCart();
    Cost();
    totalPlusTax();
    tax();
  });
}
/*===========================Quantity buttons===========================*/

function Plus(cartPlus, cartNum) {
  cartPlus.addEventListener("click", () => {
    let quantityNumber = Number(cartNum.textContent);
    if (cartNum.textContent >= 10) {
      return;
    } else {
      cartNum.textContent = quantityNumber + 1;
    }
  });
}
function Minus(cartMinus, cartNum) {
  cartMinus.addEventListener("click", () => {
    let quantityNumber = Number(cartNum.textContent);
    if (quantityNumber <= 1) {
      return;
    } else {
      cartNum.textContent = quantityNumber - 1;
    }
  });
}
/*===========================Quantity change and save===========================*/

function changeQuantity(cartSave, product, cartNum, container) {
  cartSave.addEventListener("click", () => {
    product.quantity = Number(cartNum.textContent);
    saveStorage();
    container.innerHTML = "";
    displayCart();
    Cost();
    totalPlusTax();
    tax();
  });
}

function changeButton(cartChange, cartSelector, cartSave) {
  cartChange.addEventListener("click", () => {
    cartChange.style.display = "none";
    cartSelector.style.visibility = "visible";
    cartSave.style.display = "block";
  });
}
/*===========================Cost and Total function===========================*/
function Cost() {
  let total = 0;
  const cost = document.querySelector(".cost");
  cart.forEach((product) => {
    total += product.price * product.quantity;
  });
  const costNumber = Number(total);
  cost.textContent = `$${costNumber.toFixed(2)}`;
  return costNumber;
}
function totalPlusTax() {
  const totalWithTax = document.querySelector(".total");
  let totalAmount = 0;
  let total = Cost();
  let tax = total * 0.1;
  let totalPlusTax = total + tax;
  totalAmount = Number(totalPlusTax);
  totalWithTax.textContent = `$${totalAmount.toFixed(2)}`;
}
function tax() {
  const tax = document.querySelector(".tax");
  if (cart.length === 0) {
    tax.textContent = "0%";
  } else {
    tax.textContent = "10%";
  }
}
/*===========================Checkout functions===========================*/

function clearCart() {
  cart.length = 0;
  saveStorage();
  displayCart();
}

function checkoutButton() {
  const checkoutButton = document.querySelector(".purchase");
  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      return;
    }
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
    Cost();
    totalPlusTax();
    tax();
    const container = document.getElementById("items");
    container.innerHTML = "Thank you for your Purchase";
    container.style.color = "green";
    setTimeout(() => {
      container.style.color = "red";
      container.innerHTML = "Your cart is empty";
    }, 2000);
  });
}
