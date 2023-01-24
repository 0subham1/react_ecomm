const express = require("express");
const app = express();
require("./Config");
const products = require("./products");

app.use(express.json());

app.get("/list", async (req, res) => {
  let data = await products.find();
  res.send(data);
});

app.post("/create", async (req, res) => {
  let data = new products(req.body);
  let result = await data.save();
  res.send(result);
});

app.delete("/:_id", async (req, res) => {
  let data = await products.deleteOne(req.params);
  res.send(data);
});

//req.params gives {_id:t372136713138}
app.put("/update/:_id", async (req, res) => {
  let data = await products.updateOne(req.params, { $set: req.body });
  res.send(data);
});

app.get("/search/:key", async (req, res) => {
  let data = await products.find({
    $or: [
      { name: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  });
  res.send(data);
});

app.listen(5000);
