const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model("promotions", promotionSchema, "promotions");
