const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const SizesController = require('../controllers/sizes');

router.get("/", SizesController.sizes_get_all);

router.post("/", SizesController.sizes_create_size);

router.get("/:sizeId", SizesController.sizes_get_size);

router.get("/product/:productDetailId", SizesController.sizes_get_size_byIdProduct);

router.post("/updateSize", SizesController.sizes_update_size);

router.delete("/:sizeId", SizesController.sizes_delete);

module.exports = router;