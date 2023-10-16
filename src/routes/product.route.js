// products.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// Product Routes
router.get("/product/list", productController.getAllProducts);
router.post("/product/add", productController.addProduct);

module.exports = router;
