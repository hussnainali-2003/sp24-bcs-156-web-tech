let quantity = 1;
const quantityNumber = document.querySelector("#quantity");
const message = document.querySelector("#stepper-message");

function updateQuantity() {
  quantityNumber.textContent = quantity;
  message.textContent = `Current quantity: ${quantity}`;
}

document.querySelector("#increase").addEventListener("click", () => {
  quantity += 1;
  updateQuantity();
});

document.querySelector("#decrease").addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  updateQuantity();
});
