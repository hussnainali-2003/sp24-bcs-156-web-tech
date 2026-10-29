// N is 56, so each product can be added (56 mod 4) + 2 = 2 times.
const maxPerProduct = 2;
let cartItems = [];
let nextItemId = 1;

const cartToggle = document.querySelector("#cart-toggle");
const cartPanel = document.querySelector("#mini-cart");
const cartCount = document.querySelector("#cart-count");
const cartList = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartTotal = document.querySelector("#cart-total");

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price);
}

function updateProductButtons() {
  document.querySelectorAll(".product-card").forEach(function (card) {
    const name = card.querySelector(".product-name").textContent.trim();
    const button = card.querySelector("button");
    const itemCount = cartItems.filter(function (item) {
      return item.name === name;
    }).length;

    if (!button.dataset.defaultText) {
      button.dataset.defaultText = button.textContent.trim();
    }

    button.disabled = itemCount >= maxPerProduct;
    button.textContent = button.disabled
      ? "Limit reached"
      : button.dataset.defaultText;
  });
}

function renderCart() {
  cartList.replaceChildren();
  cartCount.textContent = cartItems.length;
  cartEmpty.hidden = cartItems.length > 0;

  cartItems.forEach(function (item) {
    const row = document.createElement("li");
    row.className = "mini-cart-item";

    const itemText = document.createElement("span");
    itemText.textContent = item.name + " — " + formatPrice(item.price);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", "Remove " + item.name);
    removeButton.addEventListener("click", function () {
      cartItems = cartItems.filter(function (cartItem) {
        return cartItem.id !== item.id;
      });
      updateProductButtons();
      renderCart();
    });

    row.append(itemText, removeButton);
    cartList.append(row);
  });

  const total = cartItems.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);
  cartTotal.textContent = formatPrice(total);
}

document.querySelectorAll(".product-card").forEach(function (card) {
  const button = card.querySelector("button");
  button.dataset.defaultText = button.textContent.trim();

  button.addEventListener("click", function () {
    const name = card.querySelector(".product-name").textContent.trim();
    const priceText = card.querySelector(".product-price").textContent;
    const price = Number(priceText.replace(/[^0-9.]/g, ""));
    const itemCount = cartItems.filter(function (item) {
      return item.name === name;
    }).length;

    if (itemCount >= maxPerProduct) {
      return;
    }

    cartItems.push({
      id: nextItemId,
      name: name,
      price: price
    });
    nextItemId += 1;

    updateProductButtons();
    renderCart();
  });
});

cartToggle.addEventListener("click", function (event) {
  event.preventDefault();
  cartPanel.hidden = !cartPanel.hidden;
  cartToggle.setAttribute("aria-expanded", String(!cartPanel.hidden));
});

renderCart();
