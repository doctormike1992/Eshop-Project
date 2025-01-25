import { orders, saveOrders } from "./ordersStorage.js";

const ordersContainer = document.querySelector(".products");
displayOrders();
saveOrders();

function displayOrders() {
  orders.forEach((order) => {
    renderOrders(order);
  });
}

/*===========================Render the Orders===========================*/
function renderOrders(order) {
  const container = document.createElement("div");
  const ordersDiv = document.createElement("div");
  const orderImage = document.createElement("img");
  const orderName = document.createElement("h3");
  const priceDiv = document.createElement("div");
  const price = document.createElement("p");
  const quantityDiv = document.createElement("div");
  const orderQuantity = document.createElement("p");
  const DeliveryDiv = document.createElement("div");
  const deliveryDate = document.createElement("p");
  const arrivalDiv = document.createElement("div");
  const orderArrival = document.createElement("p");

  orderImage.src = order.image;
  orderName.textContent = order.name;
  orderQuantity.textContent = `${order.quantity}`;
  price.textContent = `$${(order.price * order.quantity * 1.1).toFixed(2)}`;
  orderArrival.textContent = `${delivery()}`;
  deliveryDate.textContent = `${orderDate()}`;

  ordersDiv.classList.add("ordersDiv");
  orderImage.classList.add("image");
  orderName.classList.add("orderName");
  quantityDiv.classList.add("quantityDiv");
  orderQuantity.classList.add("orderQuantity");
  priceDiv.classList.add("priceDiv");
  price.classList.add("price");
  orderArrival.classList.add("orderArrival");
  arrivalDiv.classList.add("arrivalDiv");
  deliveryDate.classList.add("deliveryDate");
  DeliveryDiv.classList.add("DeliveryDiv");
  container.classList.add("productContainer");

  container.appendChild(ordersDiv);
  container.appendChild(priceDiv);
  container.appendChild(quantityDiv);
  container.appendChild(DeliveryDiv);
  container.appendChild(arrivalDiv);
  ordersDiv.appendChild(orderImage);
  ordersDiv.appendChild(orderName);
  priceDiv.appendChild(price);
  quantityDiv.appendChild(orderQuantity);
  DeliveryDiv.appendChild(deliveryDate);
  arrivalDiv.appendChild(orderArrival);
  ordersContainer.appendChild(container);
}
/*===========================Date Funtion===========================*/
function orderDate() {
  const currentDate = new Date();
  return currentDate.toLocaleDateString();
}
function delivery() {
  const day = Math.floor(Math.random() * 10);
  const currentDate = new Date();
  const dateArrival = currentDate.setDate(currentDate.getDate() + day);
  return new Date(dateArrival).toLocaleDateString();
}
