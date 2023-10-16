const CartItem = require("../models/cart.model.js");
const Product = require("../models/product.model.js");

class CartController {
  viewCart(req, res) {
    try {
      let userId = req.params.user_id;

      if (!userId) return res.status(403).json({ err: "user_id cannot be empty" });
      userId = parseInt(userId);

      const cartItems = CartItem.getCartItems(userId);

      if (!cartItems.length) return res.status(404).json({ err: "cart is empty" });

      const productList = Product.getAllProducts()

      //format response structure and find total price of each item
      const finalList = cartItems.map((data) => {
        const productDetail = productList.find((product) => product.product_id == data.product_id);
        return {
          product_name: productDetail.name,
          quantity:data.quantity,
          price: productDetail.price,
          total_price: productDetail.price * data.quantity,
        };
      });

      res.json({ cart_items: finalList });
    } catch (error) {
      console.log(error);
      res.status(400).json({ err: "something went wrong" });
    }
  }

  addToCart(req, res) {
    try {
      let userId = req.body.user_id;
      const item = req.body;

      if (!userId) return res.status(403).json({ err: "user_id cannot be empty" });
      userId = parseInt(userId);

      if (!item.product_id || !item.quantity)
        return res.status(406).json({ err: "product_id/quantity cannot be empty" });

      //parsing string value to number
      item.product_id = parseInt(item.product_id);
      item.quantity = parseInt(item.quantity);

      const productList = Product.getAllProducts();

      const productDetail = productList.find((product) => product.product_id == item.product_id);
      if (!productDetail) return res.status(404).json({ err: "invalid product_id" });

      if (item.quantity > productDetail.quantity)
        return res.status(404).json({ err: "invalid product_id" });

      const addedItem = CartItem.addToCart(userId, item);

      res.json({ item: addedItem });
    } catch (error) {
      console.log(error);
      res.status(400).json({ err: "something went wrong" });
    }
  }

  removeFromCart(req, res) {
    try {
      let userId = req.body.user_id;
      const productId = req.params.product_id;

      if (!userId) return res.status(403).json({ err: "user_id cannot be empty" });
      userId = parseInt(userId);

      if (!productId) res.status(406).json({ err: "product_id cannot be empty" });

      const product = CartItem.find((product) => product.product_id == productId);

      if (!product) res.status(404).json({ err: "invalid product_id" });

      CartItem.removeFromCart(userId, productId);
      res.json({});
    } catch (error) {
      console.log(error);
      res.status(400).json({ err: "something went wrong" });
    }
  }

  totalPrice(req, res) {
    try {
      const userId = req.user_id;
      if (!userId) return res.status(403).json({ err: "user_id cannot be empty" });

      const cartItems = CartItem.getCartItems(userId);
      const totalPrice = cartItems.reduce((total, product) => {
        const productPrice = product.quantity * price;
        return total + productPrice;
      }, 0);
      return res.json({ total_price: totalPrice });
    } catch (error) {
      console.log(error);
      res.status(400).json({ err: "something went wrong" });
    }
  }
}

module.exports = new CartController();
