const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { urlAvatar } = require('../utils/constant');

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  provider: {
    type: String,
    enum: ['nature', 'google', 'facebook'],
    default: 'nature',
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(value) {
        // Kiểm tra nếu provider là "facebook" thì không cần thiết email
        if (this.provider === 'facebook') {
          return true;
        }
        // Kiểm tra nếu provider là "nature" hoặc "google" thì email là bắt buộc
        if (this.provider === 'nature' || this.provider === 'google') {
          return validator.isEmail(value);
        }
        return false;
      },
      message: 'Please provide a valid email',
    },
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'reject'],
    default: 'active',
  },
  photo: {
    type: mongoose.Schema.Types.Mixed,
    url: {
      type: String,
      default: urlAvatar,
    },
    name: {
      type: String,
      default: 'avatar.jpg',
    },
  },
  role: {
    type: String,
    enum: ['user', 'editor', 'seller', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    // required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  phoneNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
  addressDetail: {
    type: String,
  },
  id: {
    type: String,
    unique: true,
  },
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
      required: true,
      select: false,
    },
  ],
});

accountSchema.pre('save', function(next) {
  if (!this.photo) {
    this.photo = {
      url: urlAvatar,
      name: 'avatar.jpg',
    };
  }
  next();
});
accountSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

accountSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

accountSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

accountSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

accountSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};
accountSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
