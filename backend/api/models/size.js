const mongoose = require("mongoose");

const sizeSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    productDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDetail",
      required: true,
    },
    size: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Size", sizeSchema);
