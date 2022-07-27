const mongoose = require("mongoose");
const Size = require("../models/size");
const ProductDetail = require("../models/productDetail");
require("dotenv").config();

exports.productDetails_get_all = (req, res, next) => {
  ProductDetail.find()
    .select("price color size material gender _id productImage product")
    .populate({
      path: "product",
      populate: { path: "category" },
    })
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        productDetails: docs.map((doc) => {
          return {
            price: doc.price,
            color: doc.color,

            material: doc.material,
            gender: doc.gender,
            productImage: doc.productImage,
            product: doc.product,
            _id: doc._id,
            request: {
              type: "GET",
              url:
                process.env.NODEJS_APP_URL + "/api/productDetails/" + doc._id,
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

exports.productDetails_create_productDetail = (req, res, next) => {
  const productDetail = new ProductDetail({
    _id: new mongoose.Types.ObjectId(),
    price: req.body.price,
    color: req.body.color,

    material: req.body.material,
    gender: req.body.gender,
    product: req.body.productId,
  });
  if (req.files) {
    let path = "";
    req.files.forEach((files) => {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
    productDetail.productImage = path;
  }
  productDetail
    .save()
    .then((result) => {
      res.redirect("../list-product-detail");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.productDetails_get_productDetail = (req, res, next) => {
  const id = req.params.productDetailId;
  ProductDetail.findById(id)
    .populate({
      path: "product",
      populate: { path: "category" },
    })
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          productDetail: doc,
          request: {
            type: "GET",
            url: process.env.NODEJS_APP_URL + "/api/productDetails",
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

exports.productDetails_update_productDetail = (req, res, next) => {
  var dataRecords = {
    price: req.body.price,
    color: req.body.color,

    material: req.body.material,
    gender: req.body.gender,
    product: req.body.productId,
  };

  if (req.files) {
    let path = "";
    req.files.forEach((files) => {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
    if (path.length > 0) dataRecords.productImage = path;
  }
  ProductDetail.findByIdAndUpdate(req.body.productDetailId, dataRecords)
    .exec()
    .then((result) => {
      res.redirect("../../list-product-detail");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.productDetails_get_productDetail_bySort = (req, res, next) => {
  const sort = req.params.sort;
  ProductDetail.find()
    .sort({price: sort})
    .populate({
      path: "product",
      populate: { path: "category" },
    })
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        productDetails: docs.map((doc) => {
          return {
            price: doc.price,
            color: doc.color,

            material: doc.material,
            gender: doc.gender,
            productImage: doc.productImage,
            product: doc.product,
            _id: doc._id,
            request: {
              type: "GET",
              url:
                process.env.NODEJS_APP_URL + "/api/productDetails/" + doc._id,
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

exports.productDetails_get_productDetail_byColor = (req, res, next) => {
  const color = req.params.color;
  ProductDetail.find({ color: color })
  .populate({
    path: "product",
    populate: { path: "category" },
  })
  .exec()
  .then((docs) => {
    const response = {
      count: docs.length,
      productDetails: docs.map((doc) => {
        return {
          price: doc.price,
          color: doc.color,
          material: doc.material,
          gender: doc.gender,
          productImage: doc.productImage,
          product: doc.product,
          _id: doc._id,
        };
      }),
    };
    res.status(200).json(response);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.productDetails_get_productDetail_byGender = (req, res, next) => {
  const gender = req.params.gender;
  ProductDetail.find({ gender: gender })
  .populate({
    path: "product",
    populate: { path: "category" },
  })
  .exec()
  .then((docs) => {
    const response = {
      count: docs.length,
      productDetails: docs.map((doc) => {
        return {
          price: doc.price,
          color: doc.color,
          material: doc.material,
          gender: doc.gender,
          productImage: doc.productImage,
          product: doc.product,
          _id: doc._id,
        };
      }),
    };

    res.status(200).json(response);
  
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.productDetails_get_productDetail_byProduct = (req, res, next) => {
  const id = req.params.productId;
  ProductDetail.find({ product: id })
  .populate({
    path: "product",
    populate: { path: "category" },
  })
  .exec()
  .then((docs) => {
    const response = {
      count: docs.length,
      productDetails: docs.map((doc) => {
        return {
          price: doc.price,
          color: doc.color,
          material: doc.material,
          gender: doc.gender,
          productImage: doc.productImage,
          product: doc.product,
          _id: doc._id,
        };
      }),
    };

    res.status(200).json(response);
  
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.productDetails_delete = (req, res, next) => {
  const id = req.params.productDetailId;
  Size.find({ productDetail: id })
  .then(productDetail => {
    if (productDetail.length!==0) {
      return res.status(404).json({
        message: "size have ProductDetail"
      });
    }
  ProductDetail.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: process.env.NODEJS_APP_URL + "/api/productDetails",
          body: {
            price: "Number",
            color: "String",

            material: "String",
            gender: "Number",
            productImage: "String",
            productId: "ID",
          },
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
