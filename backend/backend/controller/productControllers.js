const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const sendResponseError = (statusCode, msg, res) => {
  res.status(statusCode || 400).send(!!msg ? msg : 'Invalid input !!')
}

const addProducts = async (req, res) => {
  const { name, imageUrl, description, price, countInStock } = req.body
  console.log(req.body)
  try {

    if (!(name && imageUrl && description && price && countInStock)) {
      res.status(400).send("All input is required");
    }
    const product = await Product.create({
      name: name,
      imageUrl: imageUrl,
      description: description,
      price: price,
      countInStock: countInStock
    });
    res.status(201).json(product);
  } catch (err) {
    console.log('EROR', err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const delProducts = async (req, res) => {
  try {
    // const product = await Product.findById(req.params.id);
    const result = await Product.findOneAndRemove(req.params.id);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProducts,
  delProducts
};
