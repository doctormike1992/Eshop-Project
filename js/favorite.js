// import {
//   products,
//   MoreColors,
//   OnSale,
//   loadFromBackend,
//   BestSeller,
// } from "../data/products.js";
import { cart, saveStorage } from "./cartStorage.js";
import { favorite, saveFavorite } from "./favoriteStorage.js";

/*===========================Calling the Functions===========================*/
const productsContainer = document.querySelector(".products");

displayFavorite();
cartIcon();

/*=======Display all products when page loads=======*/

function displayFavorite() {
  const alphaBet = [...favorite].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  alphaBet.forEach((product) => {
    renderProducts(product);
  });
}

/*=======Render the Array of Favorites========*/
function renderProducts(product) {
  const productsDiv = document.createElement("div");
  const productImage = document.createElement("img");
  const productName = document.createElement("p");
  const productPrice = document.createElement("p");
  const quantityMinus = document.createElement("button");
  const quantityNum = document.createElement("span");
  const quantityPlus = document.createElement("button");
  const productAdd = document.createElement("button");
  const productAdded = document.createElement("p");
  const quantitySelector = document.createElement("div");
  const favoriteButton = document.createElement("button");
  const favoriteDiv = document.createElement("div");
  const pricesDiv = document.createElement("div");
  const qunantityColors = document.createElement("div");

  productImage.src = product.image;
  productName.textContent = product.name;
  productPrice.textContent = `$${product.price.toFixed(2)}`;
  productAdd.innerHTML = `ADD TO CART <i class="fa-solid fa-bag-shopping"></i>`;
  productAdded.textContent = "✔ Added";
  quantityMinus.textContent = "-";
  quantityNum.textContent = "1";
  quantityPlus.textContent = "+";
  favoriteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  productImage.classList.add("image");
  productName.classList.add("name");
  productPrice.classList.add("price");
  productAdd.classList.add("addButton");
  productsDiv.classList.add("productsDiv");
  productAdded.classList.add("Added");
  quantityMinus.classList.add("quantityMinus");
  quantityNum.classList.add("quantityNum");
  quantityPlus.classList.add("quantityPlus");
  quantitySelector.classList.add("quantitySelector");
  favoriteButton.classList.add("favoriteButton");
  favoriteDiv.classList.add("favoriteDiv");
  pricesDiv.classList.add("pricesDiv");
  qunantityColors.classList.add("qunantityColors");

  favoriteDiv.appendChild(favoriteButton);
  productsDiv.appendChild(favoriteDiv);
  productsDiv.appendChild(productImage);
  productsDiv.appendChild(productName);
  quantitySelector.appendChild(quantityMinus);
  quantitySelector.appendChild(quantityNum);
  quantitySelector.appendChild(quantityPlus);
  qunantityColors.appendChild(quantitySelector);
  productsDiv.appendChild(qunantityColors);
  pricesDiv.appendChild(productPrice);
  productsDiv.appendChild(pricesDiv);
  productsDiv.appendChild(productAdd);
  productsDiv.appendChild(productAdded);
  productsContainer.appendChild(productsDiv);

  /*=Render the On Sales Products=*/
  // if (product instanceof OnSale) {
  //   const salesDiv = document.createElement("div");
  //   const previusPrice = document.createElement("div");
  //   salesDiv.innerHTML = product.showOnSale();
  //   previusPrice.innerHTML = product.showPreviusPrice();
  //   salesDiv.classList.add("salesDiv");
  //   previusPrice.classList.add("previusPriceDiv");
  //   favoriteDiv.appendChild(salesDiv);
  //   pricesDiv.appendChild(previusPrice);
  // }

  // /*=Render the differend Colors of Products=*/
  // if (product instanceof MoreColors) {
  //   const colorsContainer = product.showColors();
  //   qunantityColors.appendChild(colorsContainer);
  // }
  // Render the Best Sellers Products
  // if (product instanceof BestSeller) {
  //   const BestSeller = document.createElement("div");
  //   BestSeller.innerHTML = product.showBestSeller();
  //   BestSeller.classList.add("BestSeller");
  //   favoriteDiv.appendChild(BestSeller);
  // }

  Plus(quantityPlus, quantityNum);
  Minus(quantityMinus, quantityNum);
  addButton(productAdd, product, productAdded, quantityNum);
  addButtonHover(productAdd);
  removeButtonHover(productAdd);
  addFavorite(favoriteButton, product);
}

// Favotire button event listener
function addFavorite(favoriteButton, product) {
  favoriteButton.addEventListener("click", () => {
    const index = favorite.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      favorite.splice(index, 1);
    }
    saveFavorite();
    productsContainer.innerHTML = "";
    displayFavorite();
    console.log(favorite);
  });
}

/*=Event Listeners for the Quantity Buttons=*/
function Plus(quantityPlus, quantityNum) {
  quantityPlus.addEventListener("click", () => {
    let quantityNumber = Number(quantityNum.textContent);
    if (quantityNum.textContent >= 10) {
      return;
    } else {
      quantityNum.textContent = quantityNumber + 1;
    }
  });
}
function Minus(quantityMinus, quantityNum) {
  quantityMinus.addEventListener("click", () => {
    let quantityNumber = Number(quantityNum.textContent);
    if (quantityNumber <= 1) {
      return;
    } else {
      quantityNum.textContent = quantityNumber - 1;
    }
  });
}
/*=Event Listeners for the Add to Cart buttons=*/
function addButton(productAdd, product, productAdded, quantityNum) {
  let addedTime;
  productAdd.addEventListener("click", () => {
    const productQuantity = Number(quantityNum.textContent);
    const existing = cart.find((item) => {
      return item.name === product.name;
    });
    if (existing) {
      existing.quantity = Number(existing.quantity) + productQuantity;
      saveStorage();
    } else {
      const cartItems = { ...product, quantity: productQuantity };
      cart.push(cartItems);

      saveStorage();
    }

    productAdded.style.opacity = "1";

    cartIcon();

    if (addedTime) {
      clearTimeout(addedTime);
    }
    let time = setTimeout(() => {
      productAdded.style.opacity = "0";
    }, 2000);
    addedTime = time;
  });
}

// Hover effect on the Add to Cart button
function addButtonHover(productAdd) {
  productAdd.addEventListener("mouseenter", () => {
    productAdd.innerHTML = `ADD TO CART <i class="fa-solid fa-bag-shopping fa-bounce"></i>`;
  });
}
function removeButtonHover(productAdd) {
  productAdd.addEventListener("mouseleave", () => {
    productAdd.innerHTML = `ADD TO CART <i class="fa-solid fa-bag-shopping"></i>`;
  });
}

/*=cart icon Number=*/
function cartIcon() {
  const iconNumber = document.querySelector(".cartQuantity");
  let quantity = 0;
  cart.forEach((item) => {
    const itemQuantity = Number(item.quantity);
    quantity += itemQuantity;
  });

  iconNumber.innerHTML = `${quantity}`;
}
