const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const SalesController = require('../controllers/sales');


router.get("/", SalesController.sales_get_all);

router.post("/", SalesController.sales_create_sale);

router.get("/:saleId", SalesController.sales_get_sale);

router.post("/updateSale", SalesController.sales_update_sale);

router.delete("/:saleId", SalesController.sales_delete);

module.exports = router;