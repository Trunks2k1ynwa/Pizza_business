const { Schema, model } = require('mongoose');

const discountSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ['percent', 'fixed'],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    minimumPurchase: {
      type: Number,
      required: true,
    },
    maximumUses: {
      type: Number,
      default: null,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Discount = model('Discount', discountSchema);

module.exports = Discount;
