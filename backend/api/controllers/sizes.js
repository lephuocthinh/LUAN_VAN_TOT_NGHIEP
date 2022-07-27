const mongoose = require("mongoose");
const ProductDt = require("../models/productDetail");
const Size = require("../models/size");
require("dotenv").config();

exports.sizes_get_all = (req, res, next) => {
  Size.find()
    .select("size _id productDetail")
    .populate({
      path: "productDetail",
      populate: { path: "product" },
    })
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        sizes: docs.map((doc) => {
          return {
            size: doc.size,
            productDetail: doc.productDetail,
            _id: doc._id,
            request: {
              type: "GET",
              url: process.env.NODEJS_APP_URL + "/api/sizes/" + doc._id,
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

exports.sizes_create_size = (req, res, next) => {
  const size = new Size({
    _id: new mongoose.Types.ObjectId(),
    size: req.body.size,
    productDetail: req.body.productDetailId,
  });

  size
    .save()
    .then((result) => {
      res.redirect("../list-size");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.sizes_get_size = (req, res, next) => {
  const id = req.params.sizeId;
  Size.findById(id)
  .populate({
    path: "productDetail",
    populate: { path: "product" },
  })
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          size: doc,
          request: {
            type: "GET",
            url: process.env.NODEJS_APP_URL + "/api/sizes",
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

exports.sizes_get_size_byIdProduct = (req, res, next) => {
  const id = req.params.productDetailId;
  Size.find({ productDetail: id })
  .exec()
  .then((docs) => {
    const response = {
      count: docs.length,
      sizes: docs.map((doc) => {
        return {
          size: doc.size,
          productDetail: doc.productDetail,
          _id: doc._id,
          request: {
            type: "GET",
            url: process.env.NODEJS_APP_URL + "/api/sizes/" + doc._id,
          },
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

exports.sizes_update_size = (req, res, next) => {
  var dataRecords = {
    size: req.body.size,
    productDetail: req.body.productDetailId,
  };

  Size.findByIdAndUpdate(req.body.sizeId, dataRecords)
    .exec()
    .then((result) => {
      res.redirect("../../list-size");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.sizes_delete = (req, res, next) => {
  const id = req.params.sizeId;
  Size.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "size deleted",
        request: {
          type: "POST",
          url: process.env.NODEJS_APP_URL + "/api/sizes",
          body: { size: "String", productDetailId: "ID" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
