const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CartsController = require('../controllers/carts');

// Handle incoming GET requests to /carts
router.get("/",  CartsController.carts_get_all);

router.post("/",  CartsController.carts_create_cart);

router.get("/:cartId", checkAuth, CartsController.carts_get_cart);

router.delete("/:cartId", checkAuth, CartsController.carts_delete_cart);

module.exports = router;