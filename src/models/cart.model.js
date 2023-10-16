// CartItem.js
let cartItems = [];

class CartItem {
  static getCartItems(userId) {
    return cartItems.filter((item) => item.user_id === userId);
  }

  static addToCart(userId, item) {
    item.user_id = userId;
    cartItems.push(item);
    return item;
  }

  static removeFromCart(userId, productId) {
    cartItems = cartItems.filter(
      (item) => item.user_id === userId && item.product_id !== productId
    );
  }


}

module.exports = CartItem;
