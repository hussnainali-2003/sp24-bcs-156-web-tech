async function loadProducts() {
  const list = document.querySelector("#product-list");
  const status = document.querySelector("#status");
  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    const products = await response.json();
    status.textContent = `${products.length} products loaded with HTTP ${response.status}`;
    list.innerHTML = products.map((product) => `
      <article class="product-card">
        <h2>${product.name}</h2>
        <p>Product ID: ${product.id}</p>
        <strong>$${product.price.toLocaleString("en-US")}</strong>
      </article>
    `).join("");
  } catch (error) {
    status.textContent = error.message;
    status.className = "status error";
  }
}

loadProducts();
