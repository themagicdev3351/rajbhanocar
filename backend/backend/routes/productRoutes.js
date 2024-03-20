const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProducts,
  delProducts,
  upload
} = require("../controller/productControllers");

router.get("/", getProducts);
router.post("/add", upload.single('imageUrl'), addProducts);
router.delete("/del/:id", delProducts);
router.get("/:id", getProductById);

module.exports = router;
