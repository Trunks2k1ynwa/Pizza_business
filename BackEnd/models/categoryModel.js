const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'A tour must have description'],
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'reject'],
      required: [true, 'A category must have a status'],
      default: 'active',
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    images: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
categorySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
