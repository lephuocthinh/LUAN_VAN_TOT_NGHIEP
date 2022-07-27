const mongoose = require("mongoose");

const productDetailSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    price: { type: Number, required: true },
    color: { type: String, required: true },
    material: { type: String, required: true },
    gender: { type: Number, required: true },
    productImage: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductDetail", productDetailSchema);
