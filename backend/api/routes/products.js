const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/product');



router.get("/", ProductsController.products_get_all);

router.post("/", ProductsController.products_create_product);

router.get("/:productId", ProductsController.products_get_product);

router.get("/search/:name", ProductsController.products_search);

router.post("/updateProduct", ProductsController.products_update_product);

router.delete("/:productId", ProductsController.products_delete);

module.exports = router;