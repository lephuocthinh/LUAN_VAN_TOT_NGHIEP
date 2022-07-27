const express = require("express");
const router = express.Router();


const defaultController = require('../controllers/default');

//product
router.get("/list-product",  defaultController.list_product);
router.get("/list-product-detail",  defaultController.list_product_detail);
router.get("/add-product",  defaultController.add_product);
router.get("/update-product",  defaultController.update_product);
router.get("/add-product-detail",  defaultController.add_product_detail);
router.get("/update-product-detail",  defaultController.update_product_detail);
//category
router.get("/list-category",  defaultController.list_category);
router.get("/add-category",  defaultController.add_category);
router.get("/update-category",  defaultController.update_category);
//size
router.get("/list-size",  defaultController.list_size);
router.get("/add-size",  defaultController.add_size);
router.get("/update-size",  defaultController.update_size);
//sale
router.get("/list-sale",  defaultController.list_sale);
router.get("/add-sale",  defaultController.add_sale);
router.get("/update-sale",  defaultController.update_sale);

//order
router.get("/list-order",  defaultController.list_order);

//trang chu
router.get("/",  defaultController.home);





module.exports = router;