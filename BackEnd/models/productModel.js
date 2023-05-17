import mongoose from 'mongoose';

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
    description: { type: String },
    category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
    slug: { type: String },
    discount: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    number: { type: Number, default: 30 },
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
    path: 'category',
    select: ['name', 'status', 'id'],
  });
  next();
});
productSchema.pre('save', function(next) {
  if (this.number === this.sold) {
    this.status = 'inactive';
  }
  next();
});
const Product = mongoose.model('Product', productSchema);
export default Product;
