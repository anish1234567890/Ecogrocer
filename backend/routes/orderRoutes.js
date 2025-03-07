// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Endpoint to add a new order
router.post('/add', orderController.addOrder);

// Endpoint to get orders for a specific user
router.get('/user/:userId', orderController.getUserOrders);

// Endpoint to get all orders (admin dashboard)
router.get('/admin', orderController.getAllOrders);

//for getting the order details
router.get('/ordersdetails/:orderId', orderController.getOrderDetails);

// routes/orderRoutes.js
router.put('/update-status/:orderId', orderController.updateOrderStatus);


module.exports = router;
