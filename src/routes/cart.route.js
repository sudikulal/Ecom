const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/cart/view/:user_id', cartController.viewCart);
router.post('/cart/add', cartController.addToCart);
router.get('/cart/total-price',cartController.totalPrice)
router.delete('/cart/:productId', cartController.removeFromCart);

module.exports = router;