const mongoose = require("mongoose");

const saleSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    percent: { type: Number, required: true },
    starttime : { type: Date, required: true},
    endtime : { type: Date, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
