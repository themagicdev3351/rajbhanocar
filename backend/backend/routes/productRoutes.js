const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProducts,
  delProducts
} = require("../controller/productControllers");

router.get("/", getProducts);
router.post("/add", addProducts);
router.delete("/del/:id", delProducts);
router.get("/:id", getProductById);

module.exports = router;
