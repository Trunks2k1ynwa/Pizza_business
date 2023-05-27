const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        number: {
          type: Number,
          default: 1,
        },
        _id: false,
      },
    ],
    account: {
      type: mongoose.Schema.ObjectId,
      ref: 'Account',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

cartSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'products.product',
    select: ['title', 'overview', 'price', 'images'],
  });
  next();
});
// Tạo trường virtuals "totalPrice"
cartSchema.virtual('totalPrice').get(function() {
  return this.products.reduce(
    (total, item) => total + item.product.price * item.number,
    0,
  );
});

// cartSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'account',
//   });
//   next();
// });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
