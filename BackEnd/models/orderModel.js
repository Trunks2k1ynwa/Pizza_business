const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    products: [Object],
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
    totalMoney: {
      type: Number,
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
// orderSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'cart',
//   });
//   next();
// });
orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'account',
  });
  next();
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
