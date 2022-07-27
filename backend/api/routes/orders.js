const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get("/",  OrdersController.orders_get_all);

router.post("/",  OrdersController.orders_create_order);

router.get("/:userId", OrdersController.orders_get_orderbyUserId);

router.delete("/:orderId", OrdersController.orders_delete_order);

module.exports = router;