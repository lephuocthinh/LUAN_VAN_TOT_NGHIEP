const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productDetail: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductDetail",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
        },
        price: {
          type: Number,
        },
        total: {
          type: Number,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    paymentMethod: { type: Object, required: true },
    paymentStatus: { type: String, default: "unpaid" },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
