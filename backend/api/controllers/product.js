const mongoose = require("mongoose");
const ProductDetail = require("../models/productDetail");
const Product = require("../models/product");
require("dotenv").config();

exports.products_get_all = (req, res, next) => {
  Product.find()
    .select("name description _id category")
    .populate("category", "name")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            description: doc.description,
            category: doc.category,
            _id: doc._id,
            request: {
              type: "GET",
              url: process.env.NODEJS_APP_URL + "/api/products/" + doc._id,
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

exports.products_search = (req, res, next) => {

  Product.find({
    "$or":[
        {name:{$regex: req.params.name}},
  
    ]
})
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            description: doc.description,
            category: doc.category,
            _id: doc._id,
            request: {
              type: "GET",
              url: process.env.NODEJS_APP_URL + "/api/products/" + doc._id,
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

exports.products_create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    category: req.body.categoryId,
  });

  product
    .save()
    .then((result) => {
      res.redirect("../list-product");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .populate("category")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: process.env.NODEJS_APP_URL + "/api/products",
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

exports.products_update_product = (req, res, next) => {
  var dataRecords = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.categoryId,
  };

  Product.findByIdAndUpdate(req.body.productId, dataRecords)
    .exec()
    .then((result) => {
      res.redirect("../../list-product");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.products_delete = (req, res, next) => {
  const id = req.params.productId;
  ProductDetail.find({ product: id })
  .then(product => {
    if (product.length!==0) {
      return res.status(404).json({
        message: "product have ProductDetail"
      });
    }
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: process.env.NODEJS_APP_URL + "/api/products",
          body: { name: "String", description: "String", categoryId: "ID" },
        },
      });
    })
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
