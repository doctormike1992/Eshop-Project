import { displayAll } from "../js/eshop.js";

/*===========================Creating the Classes===========================*/
export class Products {
  image;
  name;
  price;
  category;
  subcategory;

  constructor(productDetails) {
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.price = productDetails.price;
    this.category = productDetails.category;
    this.subcategory = productDetails.subcategory;
  }
}

export class MoreColors extends Products {
  color;
  differentColor;
  colorImage;
  colorName;
  secondColor;

  constructor(productDetails) {
    super(productDetails);
    this.color = productDetails.color;
    this.differentColor = productDetails.differentColor;
    this.colorImage = productDetails.colorImage;
    this.colorName = productDetails.colorName;
    this.secondColor = productDetails.secondColor;
  }
  /*=Create the color buttons and give them functionality Function=*/
  showColors() {
    const colorsContainer = document.createElement("div");
    const color1 = document.createElement("button");
    const color2 = document.createElement("button");

    color1.style.backgroundColor = this.color;
    color2.style.backgroundColor = this.differentColor.secondColor;

    colorsContainer.classList.add("colorsContainer");

    colorsContainer.appendChild(color1);
    colorsContainer.appendChild(color2);
    /*=make the color buttons work Function=*/
    const updateColors = () => {
      const tempImage = this.image;
      this.image = this.differentColor.colorImage;
      this.differentColor.colorImage = tempImage;

      const tempName = this.name;
      this.name = this.differentColor.colorName;
      this.differentColor.colorName = tempName;

      const productsDiv = colorsContainer.closest(".productsDiv");
      const productImage = productsDiv.querySelector(".image");
      const productName = productsDiv.querySelector(".name");

      productImage.src = this.image;
      productName.textContent = this.name;
    };

    let isChangend = false;

    color1.addEventListener("click", () => {
      if (isChangend) {
        updateColors();
        isChangend = false;
      }
    });

    color2.addEventListener("click", () => {
      if (!isChangend) {
        updateColors();
        isChangend = true;
      }
    });

    return colorsContainer;
  }
};

export class OnSale extends Products {
  type;
  previusPrice;

  constructor(productDetails) {
    super(productDetails);
    this.type = productDetails.type;
    this.previusPrice = productDetails.previusPrice;
  }

  showOnSale() {
    return `<p class="saleMessage">On Sale</p>
           <p class="previusPrice">$${this.previusPrice.toFixed(2)}</p>`;
  }
}
/*===========================Fetching the data from the Backend===========================*/
export let products = [];
export function loadFromBackend() {
  try {
    fetch("../backend/products.json")
      .then((response) => {
        return response.json();
      })
      .then((productInfo) => {
        products = productInfo.map((productDetails) => {
          if (productDetails.type === "On-Sale") {
            return new OnSale(productDetails);
          }
          const hasColors = "color" in productDetails;
          if (hasColors) {
            return new MoreColors(productDetails);
          } else {
            return new Products(productDetails);
          }
        });
      })
      .then(() => {
        displayAll();
      });
  } catch (error) {
    console.log(error);
  }
}
