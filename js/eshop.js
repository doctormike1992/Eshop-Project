import {
  products,
  MoreColors,
  OnSale,
  loadFromBackend,
} from "../data/products.js";
import { cart, saveStorage } from "./cartStorage.js";

/*===========================Calling the Functions===========================*/
const productsContainer = document.querySelector(".products");
loadFromBackend();
showCategories();
categorySearch();
searchBar();
cartIcon();

/*===========================Categories Button===========================*/
function showCategories() {
  const menuBar = document.querySelector(".barMenu");
  const hiddenMenu = document.querySelector(".dropdown");

  menuBar.addEventListener("click", () => {
    if (hiddenMenu.classList.contains("show")) {
      hiddenMenu.classList.remove("show");
      setTimeout(() => {
        hiddenMenu.style.display = "none";
      }, 200);
    } else {
      hiddenMenu.style.display = "flex";
      setTimeout(() => {
        hiddenMenu.classList.add("show");
      }, 10);
    }
  });

  document.body.addEventListener("click", () => {
    hiddenMenu.classList.remove("show");
  });
}

/*===========================Display all products when page loads===========================*/

export function displayAll() {
  const alphaBet = [...products].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  alphaBet.forEach((product) => {
    renderProducts(product);
  });
};

let selectedCategory = null;
/*===========================Display products based on category-subcategory it was chosen===========================*/
function categorySearch() {
  const categoryContainer = document.querySelector(".semiclass");

  categoryContainer.addEventListener("click", (event) => {
    const clickedA = event.target;
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
  const search = document.getElementById("search");

  search.addEventListener("input", (e) => {
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

/*===========================Render the Array of Products===========================*/
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

  productImage.src = product.image;
  productImage.style.backgroundSize = "cover";
  productImage.style.backgroundPosition = "center";
  productImage.style.height = "280px";
  productImage.style.width = "280px";

  productName.textContent = product.name;
  productPrice.textContent = `$${product.price.toFixed(2)}`;
  productAdd.textContent = "Buy";
  productAdded.textContent = "✔ Added";
  quantityMinus.textContent = "-";
  quantityNum.textContent = "1";
  quantityPlus.textContent = "+";

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

  productsContainer.appendChild(productsDiv);
  productsDiv.appendChild(productImage);
  productsDiv.appendChild(productName);
  productsDiv.appendChild(productPrice);
  productsDiv.appendChild(productAdd);
  quantitySelector.appendChild(quantityMinus);
  quantitySelector.appendChild(quantityNum);
  quantitySelector.appendChild(quantityPlus);
  productsDiv.appendChild(quantitySelector);
  productsDiv.appendChild(productAdded);

  /*=Render the On Sales Products=*/
  if (product instanceof OnSale) {
    const salesDiv = document.createElement("div");
    salesDiv.innerHTML = product.showOnSale();
    salesDiv.classList.add("salesDiv");
    productsDiv.appendChild(salesDiv);
  }

  /*=Render the differend Colors of Products=*/
  if (product instanceof MoreColors) {
    const colorsContainer = product.showColors();
    productsDiv.appendChild(colorsContainer);
  }

  Plus(quantityPlus, quantityNum);
  Minus(quantityMinus, quantityNum);
  addButton(productAdd, product, productAdded, quantityNum);
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
