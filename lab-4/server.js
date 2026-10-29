const express = require("express");

const app = express();
const port = 4000;
const products = [
  { id: 1, name: "Model S", price: 89990 },
  { id: 2, name: "Model 3", price: 42490 },
  { id: 3, name: "Model X", price: 99990 },
  { id: 4, name: "Model Y", price: 44990 },
  { id: 5, name: "Cybertruck", price: 79990 }
];

app.use(express.static(__dirname));

app.get("/api/products", (request, response) => {
  response.status(200).json(products);
});

app.listen(port, () => {
  console.log(`Lab 4 API running at http://localhost:${port}`);
});
