const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/productDetail");
require("dotenv").config();

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .populate("user")
    .populate("products.productDetail")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,

        orders: docs.map((doc) => {
          const {password, ...other} = doc.user._doc;

          return {
            _id: doc._id,
            products: doc.products,
            amount: doc.amount,
            address: doc.address,
            status: doc.status,
            user: {...other},
            paymentMethod: doc.paymentMethod,
            paymentStatus: doc.paymentStatus,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_create_order = async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.orders_get_orderbyUserId = (req, res, next) => {
  order
    .findById(req.params.userId)
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "order not found",
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: process.env.NODEJS_APP_URL + "/api/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_delete_order = (req, res, next) => {
  order
    .remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "order deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
