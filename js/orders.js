import { orders, saveOrders } from "./ordersStorage.js";

const ordersContainer = document.querySelector(".orders");
displayOrders();
saveOrders();

function displayOrders() {
  orders.forEach((order) => {
    renderOrders(order);
  });
}

/*===========================Render the Orders===========================*/
function renderOrders(order) {
  const ordersDiv = document.createElement("div");
  const orderInfo = document.createElement("div");
  const orderImage = document.createElement("img");
  const orderProgress = document.createElement("div");
  const orderBar = document.createElement("div");
  const orderQuantity = document.createElement("p");
  const orderPrice = document.createElement("p");
  const orderArrival = document.createElement("p");

  orderImage.src = order.image;
  orderQuantity.textContent = `X${order.quantity}`;
  orderPrice.textContent = `$${order.price * order.quantity}`;
  orderArrival.textContent = `Arrival: ${date()}`;

  ordersDiv.classList.add("ordersDiv");
  orderImage.classList.add("image");
  orderProgress.classList.add("progress");
  orderBar.classList.add("bar");
  orderQuantity.classList.add("quantity");
  orderPrice.classList.add("price");
  orderInfo.classList.add("orderInfo");
  orderArrival.classList.add("arrival");

  ordersContainer.appendChild(ordersDiv);
  orderInfo.appendChild(orderImage);
  orderInfo.appendChild(orderQuantity);
  orderInfo.appendChild(orderPrice);
  orderInfo.appendChild(orderArrival);
  ordersDiv.appendChild(orderInfo);
  orderProgress.appendChild(orderBar);
  ordersDiv.appendChild(orderProgress);
}
/*===========================Date Funtion===========================*/
function date() {
  const day = Math.floor(Math.random() * 10);
  const currentDate = new Date();
  const dateArrival = currentDate.setDate(currentDate.getDate() + day);
  return new Date(dateArrival).toLocaleDateString();
}
