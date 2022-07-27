const mongoose = require("mongoose");
const Sale = require("../models/sale");

exports.sales_get_all = (req, res, next) => {
  Sale.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        sales: docs.map((doc) => {
          return {
            name: doc.name,
            percent: doc.percent,
            starttime: doc.starttime,
            endtime: doc.endtime,
            _id: doc._id,
            request: {
              type: "GET",
              url: process.env.NODEJS_APP_URL + "/api/sales/" + doc._id,
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

exports.sales_create_sale = (req, res, next) => {
  const sale = new Sale({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    percent: req.body.percent,
    starttime: req.body.starttime,
    endtime: req.body.endtime,
  });
  sale
    .save()
    .then((result) => {
      res.redirect("../list-sale");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.sales_get_sale = (req, res, next) => {
  const id = req.params.saleId;
  Sale.findById(id)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          sale: doc,
          request: {
            type: "GET",
            url: process.env.NODEJS_APP_URL + "/api/sales",
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

exports.sales_update_sale = (req, res, next) => {

  var dataRecords = {
    name: req.body.name,
    percent: req.body.percent,
    starttime: req.body.starttime,
    endtime: req.body.endtime,
  };

  Sale.findByIdAndUpdate(req.body.saleId, dataRecords)
    .exec()
    .then((result) => {
      res.redirect("../../list-sale");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.sales_delete = (req, res, next) => {
  const id = req.params.saleId;
  Sale.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "sale deleted",
        request: {
          type: "POST",
          url: process.env.NODEJS_APP_URL + "/api/sales",
          body: { name: "String" },
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
