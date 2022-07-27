const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    categoryImage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
