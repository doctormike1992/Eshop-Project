import {
  products,
  MoreColors,
  OnSale,
  loadFromBackend,
  BestSeller,
} from "../data/products.js";
import { cart, saveStorage } from "./cartStorage.js";
import { favorite, saveFavorite } from "./favoriteStorage.js";

/*===========================Calling the Functions===========================*/
const productsContainer = document.querySelector(".products");

loadFromBackend();
showCategories();
categorySearch();
searchBar();
cartIcon();

///hide the nav when we hover the products
productsContainer.addEventListener("mouseenter", () => {
  const menuBar = document.querySelector(".barMenu input");
  const hiddenMenu = document.querySelector(".dropdown");
  menuBar.checked = false;
  hiddenMenu.classList.remove("show");
  hiddenMenu.style = "display: none";
});

/*=======Display all products when page loads=======*/

export function displayAll() {
  const alphaBet = [...products].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  alphaBet.forEach((product) => {
    renderProducts(product);
  });
}

/*===========================Categories Button===========================*/
function showCategories() {
  const menuBar = document.querySelector(".barMenu");
  const hiddenMenu = document.querySelector(".dropdown");

  menuBar.addEventListener("change", () => {
    if (hiddenMenu.classList.contains("show")) {
      hiddenMenu.classList.remove("show");
      hiddenMenu.style = "display: none";
    } else {
      hiddenMenu.classList.add("show");
      hiddenMenu.style = "display:flex";
    }
  });
}

let selectedCategory = null;
/*=========Display products based on category-subcategory it was chosen======*/
function categorySearch() {
  const categoryContainer = document.querySelector(".dropdown");

  categoryContainer.addEventListener("click", (event) => {
    const clickedA = event.target.closest(".category");
    if (!clickedA) return;
    selectedCategory = clickedA.getAttribute("data-category");
    productsContainer.innerHTML = "";
    
   

    const alphaBet = [...products].sort((a, b) => a.name.localeCompare(b.name));
    alphaBet.forEach((product) => {
      if (
        product.category === selectedCategory ||
        product.subcategory === selectedCategory ||
        product.type === selectedCategory
      ) {
        renderProducts(product);
      }
    });
  });
}
/////Search Bar//////
function searchBar() {
  const bigSearch = document.querySelector(".searchInput");
  const smallSearch = document.querySelector(".smallSearch");

  bigSearch.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    productsContainer.innerHTML = "";

    const filtered = products.filter((product) => {
      const inCategory = selectedCategory
        ? product.category === selectedCategory ||
          product.subcategory === selectedCategory ||
          product.type === selectedCategory
        : true;
      const matchesSearch = product.name.toLowerCase().includes(searchValue);
      return inCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      productsContainer.innerHTML = "NO ITEMS FOUND";
    } else {
      filtered.forEach((product) => renderProducts(product));
    }
  });

  smallSearch.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    productsContainer.innerHTML = "";

    const filtered = products.filter((product) => {
      const inCategory = selectedCategory
        ? product.category === selectedCategory ||
          product.subcategory === selectedCategory ||
          product.type === selectedCategory
        : true;
      const matchesSearch = product.name.toLowerCase().includes(searchValue);
      return inCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      productsContainer.innerHTML = "NO ITEMS FOUND";
    } else {
      filtered.forEach((product) => renderProducts(product));
    }
  });
}
//Search bar display for the small screen
const glassIcon = document.querySelector(".glass input");
const smallSearch = document.querySelector(".smallSearch");
glassIcon.addEventListener("change", () => {
  if (glassIcon.checked === true) {
    smallSearch.style = "display: flex";
  } else {
    smallSearch.style = "display: none";
  }
});

/*=======Render the Array of Products========*/
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
  favoriteButton.innerHTML = '<i class="fa-regular fa-heart"></i>';

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
  if (product instanceof OnSale) {
    const salesDiv = document.createElement("div");
    const previusPrice = document.createElement("div");
    salesDiv.innerHTML = product.showOnSale();
    previusPrice.innerHTML = product.showPreviusPrice();
    salesDiv.classList.add("salesDiv");
    previusPrice.classList.add("previusPriceDiv");
    favoriteDiv.appendChild(salesDiv);
    pricesDiv.appendChild(previusPrice);
  }

  /*=Render the differend Colors of Products=*/
  if (product instanceof MoreColors) {
    const colorsContainer = product.showColors();
    qunantityColors.appendChild(colorsContainer);
  }
  // Render the Best Sellers Products
  if (product instanceof BestSeller) {
    const BestSeller = document.createElement("div");
    BestSeller.innerHTML = product.showBestSeller();
    BestSeller.classList.add("BestSeller");
    favoriteDiv.appendChild(BestSeller);
  }

  if (favorite.find((fav) => fav.name === product.name)) {
    favoriteButton.classList.add("isFavorite");
    favoriteButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
  }

  Plus(quantityPlus, quantityNum);
  Minus(quantityMinus, quantityNum);
  addButton(productAdd, product, productAdded, quantityNum);
  addButtonHover(productAdd);
  removeButtonHover(productAdd);
  addFavorite(favoriteButton, product);
}

// Favotire button event listener
function addFavorite(favoriteButton, product) {
  favoriteButton.addEventListener("click", (e) => {
    if (favoriteButton.classList.contains("isFavorite")) {
      favoriteButton.classList.remove("isFavorite");
      favoriteButton.innerHTML = '<i class="fa-regular fa-heart"></i>';

      const index = favorite.findIndex((item) => item.name === product.name);
      if (index !== -1) {
        favorite.splice(index, 1);
      }

      saveFavorite();
    } else {
      favoriteButton.classList.add("isFavorite");
      favoriteButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
      favorite.push({ ...product });
      saveFavorite();
    }
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
