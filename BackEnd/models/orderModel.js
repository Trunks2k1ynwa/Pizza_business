const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cart',
      required: true,
    },
    account: {
      type: mongoose.Schema.ObjectId,
      ref: 'Account',
      required: true,
    },
    payment: {
      type: String,
      required: true,
      enum: ['shipping', 'online'],
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'shipping', 'cancelled', 'completed'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    discount: { type: mongoose.Schema.ObjectId, ref: 'Discount' },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'account',
    select: 'username photo',
  })
    .populate({
      path: 'discount',
      select: 'value discountType',
    })
    .populate({
      path: 'cart',
      select: 'products totalPrice',
    });
  next();
});

orderSchema.virtual('totalMoney').get(function() {
  let totalMoney;
  if (this.discount.discountType === 'fixed') {
    totalMoney = this.cart.totalPrice - this.discount.value;
  } else if (this.discount.discountType === 'percent') {
    totalMoney = (this.cart.totalPrice * (100 - this.discount.value)) / 100;
  } else {
    totalMoney = this.cart.totalPrice;
  }
  totalMoney = this.payment === 'online' ? totalMoney : totalMoney + 30000;
  return totalMoney;
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
