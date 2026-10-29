const CART_KEY = "assignment3-cart";
let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

const money = (value) => `$${value.toLocaleString("en-US")}`;
const saveCart = () => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  document.querySelectorAll("[data-cart-count]").forEach((item) => {
    item.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  });
};

function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  saveCart();
}

function renderProducts(products) {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;
  document.querySelector("#product-count").textContent = `${products.length} vehicles`;
  grid.innerHTML = products.map((product) => `<article class="col-12 col-sm-6 col-lg-3"><div class="product-card h-100"><img src="images/${product.image}" alt="${product.name}" class="product-image"><div class="p-3"><h3 class="h5">${product.name}</h3><p class="text-secondary">${money(product.price)}</p><p class="small text-secondary">${product.description}</p><button class="btn btn-dark w-100 add-button" data-product-id="${product.id}">Add to Cart</button></div></div></article>`).join("");
  grid.querySelectorAll(".add-button").forEach((button) => button.addEventListener("click", () => {
    addToCart(products.find((product) => product.id === button.dataset.productId));
    button.textContent = "Added to Cart";
    setTimeout(() => { button.textContent = "Add to Cart"; }, 900);
  }));
}

function renderCart() {
  const list = document.querySelector("#cart-list");
  if (!list) return;
  if (!cart.length) {
    list.innerHTML = `<div class="empty-state">Your cart is empty. <a href="index.html">Browse vehicles</a>.</div>`;
    document.querySelector("#cart-total").textContent = "$0.00";
    return;
  }
  list.innerHTML = cart.map((item) => `<article class="cart-row"><img src="images/${item.image}" alt="${item.name}"><div class="flex-grow-1"><h2>${item.name}</h2><p>${money(item.price)} each</p></div><label>Qty <input class="quantity-input" type="number" min="1" value="${item.quantity}" data-cart-id="${item.id}"></label><strong>${money(item.price * item.quantity)}</strong><button class="btn btn-sm btn-outline-danger remove-button" data-remove-id="${item.id}">Remove</button></article>`).join("");
  document.querySelector("#cart-total").textContent = money(cart.reduce((total, item) => total + item.price * item.quantity, 0));
  list.querySelectorAll(".quantity-input").forEach((input) => input.addEventListener("change", () => {
    const item = cart.find((product) => product.id === input.dataset.cartId);
    item.quantity = Math.max(1, Number(input.value) || 1); saveCart(); renderCart();
  }));
  list.querySelectorAll(".remove-button").forEach((button) => button.addEventListener("click", () => {
    cart = cart.filter((item) => item.id !== button.dataset.removeId); saveCart(); renderCart();
  }));
}

function setupValidation() {
  const form = document.querySelector("#checkout-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const rules = { name: [/^[A-Za-z][A-Za-z ]{2,49}$/, "Enter your full name."], email: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."], phone: [/^03\d{2}-\d{7}$/, "Use the format 03XX-XXXXXXX."], address: [/^.{8,100}$/, "Enter an address of at least 8 characters."] };
    const successMessage = document.querySelector("#success-message");
    let valid = true;
    Object.entries(rules).forEach(([id, [pattern, message]]) => {
      const input = document.querySelector(`#${id}`); const error = input.nextElementSibling;
      const fieldIsValid = pattern.test(input.value.trim());
      error.textContent = fieldIsValid ? "" : message;
      input.classList.toggle("is-invalid", !fieldIsValid);
      valid = valid && fieldIsValid;
    });
    successMessage.textContent = valid ? "Order details validated successfully." : "";
  });
}

async function loadProducts() {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;
  try { const response = await fetch("products.json"); if (!response.ok) throw new Error(`Products request failed: ${response.status}`); renderProducts(await response.json()); }
  catch (error) { grid.innerHTML = `<p class="text-danger">Unable to load products. ${error.message}</p>`; console.error(error); }
}

document.addEventListener("DOMContentLoaded", () => { saveCart(); loadProducts(); renderCart(); setupValidation(); });
