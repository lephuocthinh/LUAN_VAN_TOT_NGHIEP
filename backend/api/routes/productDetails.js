const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductDetailsController = require('../controllers/productDetails');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", ProductDetailsController.productDetails_get_all);

router.post("/", upload.array('productImage[]'), ProductDetailsController.productDetails_create_productDetail);

router.get("/:productDetailId", ProductDetailsController.productDetails_get_productDetail);

router.get("/color/:color", ProductDetailsController.productDetails_get_productDetail_byColor);

router.get("/gender/:gender", ProductDetailsController.productDetails_get_productDetail_byGender);

router.get("/sort/:sort", ProductDetailsController.productDetails_get_productDetail_bySort);

router.get("/product/:productId", ProductDetailsController.productDetails_get_productDetail_byProduct);

router.post("/updateProductDetail", upload.array('productImage[]'), ProductDetailsController.productDetails_update_productDetail);

router.delete("/:productDetailId", ProductDetailsController.productDetails_delete);

module.exports = router;