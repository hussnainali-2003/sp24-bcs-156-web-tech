const MAX_PER_PRODUCT = 2;
const cart = [];

const cartToggle = document.querySelector("#cart-toggle");
const cartBadge = document.querySelector("#cart-badge");
const miniCart = document.querySelector("#mini-cart");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

function updateCart() {
  cartBadge.textContent = cart.length;
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
  }

  cart.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "mini-cart-item";
    item.innerHTML = `<p>${product.name}<br><strong>${product.price}</strong></p><button class="remove-item" type="button" data-index="${index}">Remove</button>`;
    cartItems.appendChild(item);
  });

  const total = cart.reduce((sum, product) => sum + product.value, 0);
  cartTotal.textContent = `$${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  document.querySelectorAll(".add-to-cart").forEach(updateButtonState);
}

function updateButtonState(button) {
  const name = button.closest(".product-card").querySelector("h3").textContent;
  const count = cart.filter((product) => product.name === name).length;
  button.disabled = count >= MAX_PER_PRODUCT;
  button.textContent = count >= MAX_PER_PRODUCT ? "Limit reached" : "Add to Cart";
}

document.querySelectorAll(".product-card button").forEach((button) => {
  button.classList.add("add-to-cart");
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const name = card.querySelector("h3").textContent;
    const priceText = card.querySelector("p").textContent;
    const value = Number(priceText.replace(/[$,]/g, ""));
    if (cart.filter((product) => product.name === name).length < MAX_PER_PRODUCT) {
      cart.push({ name, price: priceText, value });
      updateCart();
    }
  });
});

cartToggle.addEventListener("click", () => {
  const isOpen = miniCart.classList.toggle("is-open");
  cartToggle.setAttribute("aria-expanded", isOpen);
});

cartItems.addEventListener("click", (event) => {
  if (!event.target.matches(".remove-item")) return;
  cart.splice(Number(event.target.dataset.index), 1);
  updateCart();
});

updateCart();
