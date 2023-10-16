// productController.js
const Product = require("../models/product.model.js");

class ProductController {
  getAllProducts(req, res) {
    try {
      const products = Product.getAllProducts();
      return res.json({ product_list: products });
    } catch (error) {
      console.log(error);
      res.status(400).json({ err: "something went wrong" });
    }
  }

  addProduct(req, res) {
    try {
      const product = req.body;

      if (!product.product_id || !product.name || !product.price || !product.quantity)
        res.status(406).json({ err: "product_id/name/price/quantity cannot be empty" });

      product.product_id = Math.abs(parseInt(product.product_id));
      product.price = Math.abs(parseInt(product.price));
      product.quantity = Math.abs(parseInt(product.quantity));

      const productList = Product.getAllProducts();

      if (productList.some((p) => p.product_id == product.product_id))
        return res.status(406).json({ err: "invalid product_id" });

      const newProduct = Product.addProduct(product);
      return res.json({ product: newProduct });
    } catch (error) {
      console.log(error);
      res.status(400).json({ err: "something went wrong" });
    }
  }
}

module.exports = new ProductController();
