const products = [
  "Model S", "Model 3", "Model X", "Model Y", "Cybertruck",
  "Roadster", "Tesla Semi", "Wall Connector", "Mobile Connector", "Powerwall"
];
const list = document.querySelector("#product-list");
const count = document.querySelector("#search-count");

function showProducts(searchText = "") {
  const matches = products.filter((product) =>
    product.toLowerCase().includes(searchText.toLowerCase())
  );
  list.innerHTML = matches.map((product) => `<li>${product}</li>`).join("");
  count.textContent = `${matches.length} product${matches.length === 1 ? "" : "s"} found`;
}

document.querySelector("#search").addEventListener("input", (event) => {
  showProducts(event.target.value);
});

showProducts();
