const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const CategoriesController = require('../controllers/categories');

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

router.get("/", CategoriesController.categories_get_all);

router.post("/", upload.single('categoryImage'), CategoriesController.categories_create_category);

router.get("/:categoryId", CategoriesController.categories_get_category);

router.post("/updateCategory", upload.single('categoryImage'), CategoriesController.categories_update_category);

router.delete("/:categoryId", CategoriesController.categories_delete);

module.exports = router;