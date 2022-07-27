const mongoose = require("mongoose");

const Cart = require("../models/cart");
const Product = require("../models/productDetail");
require("dotenv").config();


exports.carts_get_all = (req, res, next) => {
  Cart.find()
  
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        carts: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            user: doc.user,
            request: {
              type: "GET",
              url: process.env.NODEJS_APP_URL +"/api/carts/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.carts_create_cart = async (req, res, next) => {
  const { productId, quantity, name, price } = req.body;

  const userId = "5de7ffa74fff640a0491bc4f";

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, name, price }]
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.carts_get_cart = (req, res, next) => {
  Cart.findById(req.params.cartId)
    .populate("product")
    .exec()
    .then(cart => {
      if (!cart) {
        return res.status(404).json({
          message: "Cart not found"
        });
      }
      res.status(200).json({
        cart: cart,
        request: {
          type: "GET",
          url: process.env.NODEJS_APP_URL +"/api/carts"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.carts_delete_cart = (req, res, next) => {
  Cart.remove({ _id: req.params.cartId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Cart deleted",
        request: {
          type: "POST",
          url: process.env.NODEJS_APP_URL +"/api/carts",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};