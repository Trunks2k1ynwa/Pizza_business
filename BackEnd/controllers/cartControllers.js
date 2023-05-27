/* eslint-disable no-unused-vars */
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

exports.getMyCart = catchAsync(async (req, res, next) => {
  const myCart = await Cart.findOne({ account: req.params.id });
  if (!myCart) {
    // return next(new AppError('No document found with that ID account', 404));
    res.status(200).json({
      status: 'success',
      message: 'Looklike your cart is empty',
    });
  }

  res.status(200).json({
    status: 'success',
    data: myCart,
  });
});
exports.updateMyCart = catchAsync(async (req, res, next) => {
  const { productId, number } = req.body;
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
      products: [{ product: productId, number: number }],
    });
    return res.status(200).json({
      status: 'success',
      data: newCart,
    });
  }

  const existingProduct = cart.products.findIndex((p) => {
    return p.product._id === productId;
  });
  if (type === 'increase') {
    cart = await Cart.findOneAndUpdate(
      { account: accountId, 'products.product': productId },
      {
        $set: {
          'products.$.number': cart.products[existingProduct].number + 1,
        },
      },
      { new: true },
    ).populate({
      path: 'products.product',
      select: ['title', 'overview', 'price', 'images'],
    });
  } else if (type === 'decrease') {
    if (cart.products[existingProduct].number === 1) {
      cart = await Cart.findOneAndUpdate(
        { account: accountId },
        { $pull: { products: { product: productId } } },
        { new: true },
      ).populate({
        path: 'products.product',
        select: ['title', 'overview', 'price', 'images'],
      });
    } else {
      cart = await Cart.findOneAndUpdate(
        { account: accountId, 'products.product': productId },
        {
          $set: {
            'products.$.number': cart.products[existingProduct].number - 1,
          },
        },
        { new: true },
      ).populate({
        path: 'products.product',
        select: ['title', 'overview', 'price', 'images'],
      });
    }
  } else if (existingProduct !== -1 && number > 0) {
    cart = await Cart.findOneAndUpdate(
      { account: accountId, 'products.product': productId },
      {
        $set: {
          'products.$.number': number + cart.products[existingProduct].number,
        },
      },
      { new: true },
    ).populate({
      path: 'products.product',
      select: ['title', 'overview', 'price', 'images'],
    });
  } else {
    cart.products.push({ product: productId, number: number });
    await cart.save();
    await cart.populate({
      path: 'products.product',
      select: ['title', 'overview', 'price', 'images'],
    });
  }
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
    data: cart,
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
