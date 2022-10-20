const { request } = require("express");
const express = require("express");
const { randomUUID } = require("crypto");

const app = express();

app.use(express.json());

const products = [];

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  const product = {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);

  return res.json(product);
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item.id === id);

  res.json(product);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = products.findIndex((product) => product.id === id);

  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  return res.json({
    message: "produto alterado com sucesso",
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const indexOfDeletedProduct = products.findIndex(
    (product) => product.id === id
  );

  products.splice(indexOfDeletedProduct, 1);

  return res.json({
    message: "Produto deletado com sucesso",
  });
});

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));
