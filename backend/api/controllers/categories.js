const mongoose = require("mongoose");
const Category = require("../models/category");
const Product = require("../models/product");

exports.categories_get_all = (req, res, next) => {
  Category.find()
    .select("name _id categoryImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        categories: docs.map((doc) => {
          return {
            name: doc.name,
            categoryImage: doc.categoryImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: process.env.NODEJS_APP_URL + "/api/categories/" + doc._id,
            },
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.categories_create_category = (req, res, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    categoryImage: req.file.path,
  });
  category
    .save()
    .then((result) => {
      res.redirect("../list-category");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.categories_get_category = (req, res, next) => {
  const id = req.params.categoryId;
  Category.findById(id)
    .select("name _id categoryImage")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          category: doc,
          request: {
            type: "GET",
            url: process.env.NODEJS_APP_URL + "/api/categories",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.categories_update_category = (req, res, next) => {

  var dataRecords = {
    name: req.body.name,
  };

  if (req.file) {
    dataRecords.categoryImage = req.file.path;
  } 
  Category.findByIdAndUpdate(req.body.categoryId, dataRecords)
    .exec()
    .then((result) => {
      res.redirect("../../list-category");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.categories_delete = (req, res, next) => {
  const id = req.params.categoryId;
  Product.find({ category: id })
  .then(category => {
    if (category.length!==0) {
      return res.status(404).json({
        message: "category have product"
      });
    }
    Category.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "category deleted",
        request: {
          type: "POST",
          url: process.env.NODEJS_APP_URL + "/api/categories",
          body: { name: "String" },
        },
      });
    })
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
  
};
