const Product = require("../models/Product");
const multer = require('multer');
const fs = require('fs');
const path = require("path");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create the uploads directory if it doesn't exist
const uploadDirectory = 'uploads/car';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);  // Specify the directory where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Use unique filenames
  }
});

const upload = multer({ storage: storage });


const addProducts = async (req, res) => {
  const { name, description, price, countInStock } = req.body;
  const imageUrl = req.file.path;
 
  try {

    if (!(name && imageUrl && description && price && countInStock)) {
      res.status(400).send("All input is required");
    }
    const product = await Product.create({
      name,
      description,
      price,
      countInStock,
      imageUrl
    });

    res.status(201).json(product);
  } catch (err) {
    console.log('EROR', err)
    res.status(500 || 400).send(!!err ? err : 'Invalid input !!')
  }
}

const delProducts = async (req, res) => {
  try {
    // Find the product by id
    const product = await Product.findById(req.params.id);

    // If the product has an associated image, delete it from the filesystem
    if (product.imageUrl) {
      // Construct the path to the image file 
      const imagePath = path.join(process.cwd(), product.imageUrl);

      // Check if the image file exists
      if (fs.existsSync(imagePath)) {
        // Delete the image file
        fs.unlinkSync(imagePath);
      }
    }

    // Remove the product from the database
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
  delProducts,
  upload
};
