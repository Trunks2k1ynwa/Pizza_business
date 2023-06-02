const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A product must have a name'],
      maxLength: [40, 'A product must have less or equal then 40 characters'],
    },
    overview: {
      type: String,
      required: [true, 'A product must have description'],
    },
    price: { type: Number, required: [true, 'A product must have price'] },
    description: String,
    instruction: String,
    features: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must have a Category.'],
    },
    discount: { type: mongoose.Schema.ObjectId, ref: 'Discount' },
    slug: String,
    sold: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Sold must be above 0'],
    },
    number: { type: Number, min: [0, 'Number must be above 0'], default: 30 },
    status: {
      type: String,
      enum: ['inactive', 'active'],
      default: 'active',
    },
    quantity: { type: Number },
    reviewsCount: { type: Number, default: 0 },
    averageRating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7},
    },
    images: [
      {
        type: mongoose.Schema.Types.Mixed,
        url: {
          type: String,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
productSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'discount',
    select: 'code value minimumPurchase',
  });
  next();
});
productSchema.pre('save', function(next) {
  if (this.number === 0) {
    this.status = 'inactive';
  }
  next();
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
