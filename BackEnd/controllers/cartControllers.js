/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('./handlerFactory');

const { ObjectId } = mongoose.Types;

exports.getMyCart = catchAsync(async (req, res, next) => {
  const myCart = await Cart.findOne({ account: req.params.id });
  if (!myCart) {
    return next(new AppError('No Cart found with that ID account', 404));
  }

  res.status(200).json({
    status: 'success',
    data: myCart,
  });
});
exports.updateMyCart = catchAsync(async (req, res, next) => {
  const { productId, amount } = req.body;
  const accountId = req.params.id;
  const { type } = req.body;

  let cart = await Cart.findOne({ account: accountId });
  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError('No document found with that ID product', 404));
  }
  // Cart don't exits
  if (!cart) {
    const newCart = await Cart.create({
      account: accountId,
      products: [{ product: productId, amount: amount }],
    });
    return res.status(200).json({
      status: 'success',
      data: newCart,
    });
  }
  //Cart exist
  const existingProduct = cart.products.findIndex((p) => {
    return p.product._id.equals(new ObjectId(productId));
  });
  if (type === 'increase') {
    cart = await Cart.findOneAndUpdate(
      { account: accountId, 'products.product': productId },
      {
        $set: {
          'products.$.amount': cart.products[existingProduct].amount + 1,
        },
      },
      { new: true },
    );
  } else if (type === 'decrease') {
    if (cart.products[existingProduct].amount === 1) {
      cart = await Cart.findOneAndUpdate(
        { account: accountId },
        { $pull: { products: { product: productId } } },
        { new: true },
      );
    } else {
      cart = await Cart.findOneAndUpdate(
        { account: accountId, 'products.product': productId },
        {
          $set: {
            'products.$.amount': cart.products[existingProduct].amount - 1,
          },
        },
        { new: true },
      );
    }
  }
  // Product exist in cart , plus amount
  else if (existingProduct !== -1 && amount > 0) {
    cart = await Cart.findOneAndUpdate(
      { account: accountId, 'products.product': productId },
      {
        $set: {
          'products.$.amount': amount + cart.products[existingProduct].amount,
        },
      },
      { new: true },
    );
  }
  // Product  not exist in cart , add product in cart
  else {
    cart.products.push({ product: productId, amount: amount });
    await cart.save();
  }
  await cart.populate({
    path: 'products.product',
    select: ['title', 'overview', 'price', 'images'],
  });
  return res.status(200).json({
    status: 'success',
    data: cart,
  });
});

exports.deleteProductCart = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const accountId = req.params.id;
  const cart = await Cart.findOneAndUpdate(
    { account: accountId },
    { $pull: { products: { product: productId } } },
    { new: true },
  );
  return res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.deleteMyCart = async (req, res, next) => {
  const accountId = req.params.id;
  const cart = await Cart.findOne({ account: accountId });
  if (!cart) {
    return res.status(404).json({
      status: 'fail',
      message: 'Không tìm thấy giỏ hàng của người dùng',
    });
  }
  // Xóa giỏ hàng
  await Cart.deleteOne({ account: accountId });
  return res.status(200).json({
    status: 'success',
    message: 'Xóa giỏ hàng thành công',
  });
};

exports.getCart = getOne(Cart);
exports.getAllCart = getAll(Cart);
exports.updateCart = updateOne(Cart);
exports.deleteCart = deleteOne(Cart);
exports.createCart = createOne(Cart);
