// Product.js
let products = [
  {
    product_id: 1,
    name: "Product A",
    price: 100,
    quantity: 50,
  },
  {
    product_id: 2,
    name: "Product b",
    price: 100,
    quantity: 50,
  },
];

class Product {
  static getAllProducts() {
    return products;
  }

  static addProduct(product) {
    products.push(product);
    return product;
  }
}

module.exports = Product;
